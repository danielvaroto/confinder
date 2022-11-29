using System;
using System.Linq;
using System.Threading.Tasks;
using confinder.application.Interfaces;
using confinder.application.Models;
using Fastenshtein;

namespace confinder.application.Scraping.WikiCFP
{
    public class WikiCFPHandler : IScrapingHandler
    {
        private readonly IRepository<Conference> conferenceRepository;
        private readonly IRepository<ConferenceEdition> conferenceEditionRepository;

        public WikiCFPHandler(IRepository<Conference> conferenceRepository, IRepository<ConferenceEdition> conferenceEditionRepository)
        {
            this.conferenceRepository = conferenceRepository;
            this.conferenceEditionRepository = conferenceEditionRepository;
        }

        public async IAsyncEnumerable<ConferenceEdition> Execute()
        {
            var conferences = conferenceRepository.GetAll();
            foreach (var conference in conferences)
            {
                var searchUrl = $"http://wikicfp.com/cfp/servlet/tool.search?q={conference.Name}&year=f";
                var searchResponse = await ScrapingFramework.CallUrl(searchUrl);
                foreach (var wikiCfpListItem in WikiCFPFHtmlParser.ParseSearchResultPage(searchResponse))
                {
                    if (Levenshtein.Distance(wikiCfpListItem.Name, conference.Name) > (conference.Name.Length * 0.2))
                    {
                        continue;
                    }
                    var detailsResponse = await ScrapingFramework.CallUrl($"http://wikicfp.com{wikiCfpListItem.DetailsLink}");
                    var wikiCfpDetails = WikiCFPFHtmlParser.ParseDetailsPage(detailsResponse);

                    yield return new ConferenceEdition
                    {
                        ConferenceId = conference.Id,
                        Source = "WikiCFP",
                        Location = wikiCfpDetails.Location ?? wikiCfpListItem.Location,
                        Name = wikiCfpListItem.Name,
                        LevenshteinDistance = Levenshtein.Distance(wikiCfpListItem.Name, conference.Name),
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
