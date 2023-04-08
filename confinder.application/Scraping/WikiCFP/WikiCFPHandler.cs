using System;
using System.Linq;
using System.Threading.Tasks;
using confinder.application.Context;
using confinder.application.Interfaces;
using confinder.application.Models;
using confinder.application.Utils;
using Fastenshtein;

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
            var conferences = db.Conferences.OrderBy((c) => c.Id).ToList();
            foreach (var conference in conferences)
            {
                string? searchResponse = null;
                try
                {
                    searchResponse = await ScrapingFramework.CallUrl($"http://wikicfp.com/cfp/servlet/tool.search?q={conference.Name}&year=f");
                }
                catch (Exception e)
                {
                    Console.WriteLine(e.ToString());
                    continue;
                }
                foreach (var wikiCfpListItem in WikiCFPFHtmlParser.ParseSearchResultPage(searchResponse))
                {
                    var (minEditDistanceConference, minEditDistance) = ConferenceUtils.GetMinEditDistance(conferences, wikiCfpListItem.Name);
                    if (minEditDistanceConference == null || minEditDistance == null || minEditDistance > (minEditDistanceConference.Name.Length * 0.2))
                    {
                        continue;
                    }
                    string? detailsResponse = null;
                    try
                    {
                        detailsResponse = await ScrapingFramework.CallUrl($"http://wikicfp.com{wikiCfpListItem.DetailsLink}");
                    }
                    catch (Exception e)
                    {
                        Console.WriteLine(e.ToString());
                        continue;
                    }
                    var wikiCfpDetails = WikiCFPFHtmlParser.ParseDetailsPage(detailsResponse);
                    yield return new ConferenceEdition
                    {
                        ConferenceId = minEditDistanceConference.Id,
                        Source = "WikiCFP",
                        UnformattedLocation = wikiCfpDetails.Location ?? wikiCfpListItem.Location,
                        Name = wikiCfpListItem.Name,
                        OfficialConferenceUri = wikiCfpDetails.OfficialConferenceLink,
                        LevenshteinDistance = (int)minEditDistance,
                        StartDate = wikiCfpDetails.StartDate ?? wikiCfpListItem.StartDate,
                        EndDate = wikiCfpDetails.EndDate ?? wikiCfpListItem.EndDate,
                        SubmissionDeadline = wikiCfpDetails.SubmissionDeadline ?? wikiCfpListItem.Deadline,
                        AbstractRegistrationDue = wikiCfpDetails.AbstractRegistrationDue,
                        NotificationDue = wikiCfpDetails.NotificationDue,
                        FinalVersionDue = wikiCfpDetails.FinalVersionDue
                    };
                }
            }
        }
    }
}
