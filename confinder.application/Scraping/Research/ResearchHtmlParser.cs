using confinder.application.Utils;

namespace confinder.application.Scraping.Research
{
	public class ResearchHtmlParser
    {
        public static async IAsyncEnumerable<ResearchConferenceListItem> ParseListPage(string url)
        {
            var htmlDocument = await ScrapingFramework.GetHtmlDocument(url);
            var list = htmlDocument.DocumentNode.SelectSingleNode("//div[@id=\"rankingItems\"]");
            var childDivs = list.SelectNodes("./div");
            foreach (var node in childDivs)
            {
                var title = node.SelectSingleNode("./div/h4/a");
                yield return new ResearchConferenceListItem
                {
                    Name = title.InnerText.Trim(),
                    DetailsLink = title.Attributes["href"].Value.Trim(),
                };
            }
        }

        public static async Task<ResearchConferenceDetails> ParseDetailsPage(string url)
        {
            var htmlDocument = await ScrapingFramework.GetHtmlDocument(url);
            var name = htmlDocument.DocumentNode.SelectSingleNode("/html/body/div[1]/div[2]/div[1]/h1");
            var officialLink = htmlDocument.DocumentNode.SelectSingleNode("//a[contains(@title, 'Official website')]");
            var details = htmlDocument.DocumentNode.SelectNodes("//div[contains(@class, 'conference-details')]/p");
            if (name == null || officialLink == null || details.Count != 3)
                throw new Exception("Não foi possível encontrar dados na página.");

            var submissionDeadline = StringUtils.ParseDate(details[1].InnerText.Trim().Substring("Submission Deadline:".Length).Trim());
            var dates = details[2].InnerText.Trim().Substring("Conference Dates:".Length).Trim();
            var splitedDates = dates.Split("-");
            var startDate = StringUtils.ParseDate(splitedDates[0]);
            var endDate = StringUtils.ParseDate(splitedDates[1]);
            if (submissionDeadline == null || startDate == null || endDate == null)
                throw new Exception("Não foi possível parsear as datas.");

            return new ResearchConferenceDetails
            {
                Name = name.InnerText.Trim(),
                OfficialConferenceLink = officialLink.Attributes["href"].Value.Trim(),
                Location = details[0].InnerText.Trim(),
                SubmissionDeadline = (DateOnly)submissionDeadline,
                StartDate = (DateOnly)startDate,
                EndDate = (DateOnly)endDate,
            };
        }

        
    }
}

