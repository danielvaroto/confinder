using System;
using System.Linq;
using System.Threading.Tasks;
using confinder.domain.Interfaces;
using confinder.domain.Models;
using confinder.scraping.Interfaces;
using Fastenshtein;

namespace confinder.scraping.WikiCFP
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

        public async Task Execute()
        {
            var conferences = conferenceRepository.GetAll();

            foreach (var conference in conferences)
            {
                var searchUrl = $"http://wikicfp.com/cfp/servlet/tool.search?q={conference.Name}&year=f";
                var searchResponse = await ScrapingFramework.CallUrl(searchUrl);
                var searchParsedResults = WikiCFPFHtmlParser.ParseSearchResultPage(searchResponse);
                //var filteredResults = searchParsedResults.Where(c => Levenshtein.Distance(c.Name, conference.Name) <= 20);

                var conferenceEditions = searchParsedResults.Select(c => new ConferenceEdition
                {
                    ConferenceId = conference.Id,
                    Source = "WikiCFP",
                    Location = c.Location,
                    Name = c.Name,
                    LevenshteinDistance = Levenshtein.Distance(c.Name, conference.Name),
                    StartDate = c.StartDate,
                    EndDate = c.EndDate,
                    SubmissionDeadline = c.Deadline
                });

                conferenceEditionRepository.AddRange(conferenceEditions);
                conferenceEditionRepository.SaveChanges();
            }
        }
    }
}
