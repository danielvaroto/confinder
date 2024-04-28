using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using confinder.application.Utils;
using HtmlAgilityPack;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace confinder.application.Scraping.WikiCFP
{
    public class WikiCFPFHtmlParser
    {
        public static async IAsyncEnumerable<WikiCFPConferenceListItem> ParseSearchResultPage(string url)
        {
            var htmlDocument = await ScrapingFramework.GetHtmlDocument(url);
            var headerBeforeDataTable = htmlDocument.DocumentNode.SelectSingleNode("//*[contains(text(),'Matched Call For Papers for \"')]");
            var dataTableTrs = headerBeforeDataTable.SelectNodes("../../../following-sibling::tr[1]/td/table//tr");

            if (dataTableTrs == null)
            {
                yield break;
            }

            var conferences = new List<WikiCFPConferenceListItem>();

            // i = 1 to ignore header
            // i += 2 because every conference is set in 2 trs
            for (var i = 1; i < dataTableTrs.Count; i += 2)
            {
                var firstTrTds = dataTableTrs[i].SelectNodes(".//td");
                var secondTrTds = dataTableTrs[i + 1].SelectNodes(".//td");

                var detailsLink = firstTrTds[0].SelectSingleNode(".//a").Attributes["href"].Value;
                var (startDate, endDate) = ParseDateRange(secondTrTds[0].InnerText.Trim());
                var deadline = StringUtils.ParseDate(secondTrTds[2].InnerText.Trim());

                if (startDate != null && endDate != null && deadline != null)
                {
                    yield return new WikiCFPConferenceListItem
                    {
                        DetailsLink = detailsLink,
                        Initials = firstTrTds[0].InnerText.Trim(),
                        Name = firstTrTds[1].InnerText.Trim(),
                        Location = secondTrTds[1].InnerText.Trim(),
                        StartDate = startDate,
                        EndDate = endDate,
                        Deadline = deadline,
                    };
                }
            }
        }

        public static async Task<WikiCFPConferenceDetails> ParseDetailsPage(string url)
        {
            var htmlDocument = await ScrapingFramework.GetHtmlDocument(url);
            var conferenceDetails = new WikiCFPConferenceDetails();

            var contentSection = htmlDocument.DocumentNode.SelectSingleNode("//div[contains(@class, 'contsec')]");
            var infoTrIndex = 4;

            var linkTr = contentSection.SelectSingleNode("./center/table/tr[3]");
            var linkTrTextSplited = linkTr.InnerText.Trim().Split("Link:");
            if (linkTrTextSplited.Length == 2)
            {
                conferenceDetails.OfficialConferenceLink = linkTrTextSplited[1].Trim();
                infoTrIndex = 5;
            }

            var infoTrs = contentSection.SelectNodes($"./center/table/tr[{infoTrIndex}]/td/table/tr/td/table/tr[1]/td/table/tr");
            foreach (var infoTr in infoTrs)
            {
                var infoHeader = infoTr.SelectSingleNode("./th").InnerText.Trim();
                var infoText = infoTr.SelectSingleNode("./td").InnerText.Trim();
                switch (infoHeader)
                {
                    case "When":
                        var (startDate, endDate) = ParseDateRange(infoText);
                        conferenceDetails.StartDate = startDate;
                        conferenceDetails.EndDate = endDate;
                        break;
                    case "Where":
                        conferenceDetails.Location = infoText;
                        break;
                    case "Submission Deadline":
                        conferenceDetails.SubmissionDeadline = StringUtils.ParseDate(infoText);
                        break;
                    case "Notification Due":
                        conferenceDetails.NotificationDue = StringUtils.ParseDate(infoText);
                        break;
                    case "Final Version Due":
                        conferenceDetails.FinalVersionDue = StringUtils.ParseDate(infoText);
                        break;
                    case "Abstract Registration Due":
                        conferenceDetails.AbstractRegistrationDue = StringUtils.ParseDate(infoText);
                        break;
                    default:
                        throw new Exception($"Cannot resolve info with header '{infoHeader}'");
                }
            }
            

            return conferenceDetails;
        }

        private static (DateOnly?, DateOnly?) ParseDateRange(string dateRange)
        {
            var splitedDateRange = dateRange.Split(" - ");
            if (splitedDateRange.Length == 2)
            {
                return (StringUtils.ParseDate(splitedDateRange[0]), StringUtils.ParseDate(splitedDateRange[1]));
            }

            return (null, null);
        }
    }
}
