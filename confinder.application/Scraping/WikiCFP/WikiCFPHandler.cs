using confinder.application.Context;
using confinder.application.Interfaces;
using confinder.application.Models;
using confinder.application.Utils;

namespace confinder.application.Scraping.WikiCFP
{
    public class WikiCFPHandler : IScrapingHandler
    {
        private readonly ConfinderContext db;

        public WikiCFPHandler(ConfinderContext db)
        {
            this.db = db;
        }

        public async IAsyncEnumerable<ConferenceEdition> Execute()
        {
            var conferences = db.Conferences.OrderBy((c) => Guid.NewGuid()).ToList();
            foreach (var conference in conferences)
            {
                IAsyncEnumerable<WikiCFPConferenceListItem>? wikiCfpListItems = null;
                try
                {
                    wikiCfpListItems = WikiCFPFHtmlParser.ParseSearchResultPage($"http://wikicfp.com/cfp/servlet/tool.search?q={conference.Name}&year=f");
                }
                catch (Exception e)
                {
                    Console.WriteLine(e.ToString());
                    continue;
                }
                await foreach (var wikiCfpListItem in wikiCfpListItems)
                {
                    var (minEditDistanceConference, minEditDistance) = ConferenceUtils.GetMinEditDistance(conferences, wikiCfpListItem.Name);
                    if (minEditDistanceConference == null || minEditDistance == null || minEditDistance > (minEditDistanceConference.Name.Length * 0.2))
                    {
                        continue;
                    }
                    WikiCFPConferenceDetails? wikiCfpDetails = null;
                    try
                    {
                        wikiCfpDetails = await WikiCFPFHtmlParser.ParseDetailsPage($"http://wikicfp.com{wikiCfpListItem.DetailsLink}");
                    }
                    catch (Exception e)
                    {
                        Console.WriteLine(e.ToString());
                        continue;
                    }
                    if ((wikiCfpDetails.StartDate ?? wikiCfpListItem.StartDate) == null
                        || (wikiCfpDetails.EndDate ?? wikiCfpListItem.EndDate) == null
                        || (wikiCfpDetails.SubmissionDeadline ?? wikiCfpListItem.Deadline) == null
                    )
                    {
                        continue;
                    }

                    yield return new ConferenceEdition
                    {
                        ConferenceId = minEditDistanceConference.Id,
                        Source = "WikiCFP",
                        UnformattedLocation = wikiCfpDetails.Location ?? wikiCfpListItem.Location,
                        Name = wikiCfpListItem.Name,
                        OfficialConferenceUri = wikiCfpDetails.OfficialConferenceLink,
                        LevenshteinDistance = (int)minEditDistance,
                        StartDate = (DateOnly)(wikiCfpDetails.StartDate ?? wikiCfpListItem.StartDate),
                        EndDate = (DateOnly)(wikiCfpDetails.EndDate ?? wikiCfpListItem.EndDate),
                        SubmissionDeadline = (DateOnly)(wikiCfpDetails.SubmissionDeadline ?? wikiCfpListItem.Deadline),
                        AbstractRegistrationDue = wikiCfpDetails.AbstractRegistrationDue,
                        NotificationDue = wikiCfpDetails.NotificationDue,
                        FinalVersionDue = wikiCfpDetails.FinalVersionDue
                    };
                }
            }
        }
    }
}
