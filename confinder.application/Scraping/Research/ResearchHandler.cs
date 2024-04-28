using confinder.application.Context;
using confinder.application.Interfaces;
using confinder.application.Models;
using confinder.application.Utils;

namespace confinder.application.Scraping.Research
{
	public class ResearchHandler : IScrapingHandler
    {
        private readonly ConfinderContext db;
        private readonly string baseUri = "https://research.com";

        public ResearchHandler(ConfinderContext db)
		{
            this.db = db;
        }

        public async IAsyncEnumerable<ConferenceEdition> Execute()
        {
            var conferences = db.Conferences.ToList();
            IAsyncEnumerable<ResearchConferenceListItem>? conferenceListItems = null;
            try
            {
                conferenceListItems = ResearchHtmlParser.ParseListPage($"{baseUri}/conference-rankings/computer-science?paperSubmissionOpen=true");
            } catch (Exception e)
            {
                Console.WriteLine(e.ToString());
                yield break;
            }
            await foreach (var conferenceListItem in conferenceListItems)
            {
                var (minEditDistanceConference, minEditDistance) = ConferenceUtils.GetMinEditDistance(conferences, conferenceListItem.Name);
                if (minEditDistanceConference == null || minEditDistance == null || minEditDistance > (minEditDistanceConference.Name.Length * 0.2))
                {
                    continue;
                }
                ResearchConferenceDetails? conferenceDetails = null;
                try
                {
                    conferenceDetails = await ResearchHtmlParser.ParseDetailsPage($"{baseUri}{conferenceListItem.DetailsLink}");
                }
                catch (Exception e)
                {
                    Console.WriteLine(e.ToString());
                    continue;
                }
                yield return new ConferenceEdition
                {
                    ConferenceId = minEditDistanceConference.Id,
                    Source = "Research",
                    UnformattedLocation = conferenceDetails.Location,
                    Name = conferenceDetails.Name,
                    OfficialConferenceUri = conferenceDetails.OfficialConferenceLink,
                    LevenshteinDistance = (int)minEditDistance,
                    StartDate = conferenceDetails.StartDate,
                    EndDate = conferenceDetails.EndDate,
                    SubmissionDeadline = conferenceDetails.SubmissionDeadline,
                };
            }
        }
    }
}

