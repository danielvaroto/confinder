using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using HtmlAgilityPack;

namespace confinder.scraping.WikiCFP
{
    public class WikiCFPFHtmlParser
    {
        public static IEnumerable<WikiCFPConferenceListItem> ParseSearchResultPage(string response)
        {
            var htmlDocument = new HtmlDocument();
            htmlDocument.LoadHtml(response);

            var headerBeforeDataTable = htmlDocument.DocumentNode.SelectSingleNode("//*[contains(text(),'Matched Call For Papers for \"')]");
            var dataTableTrs = headerBeforeDataTable.SelectNodes("../../../following-sibling::tr[1]/td/table//tr");

            if (dataTableTrs == null)
            {
                return Enumerable.Empty<WikiCFPConferenceListItem>();
            }

            var conferences = new List<WikiCFPConferenceListItem>();

            // i = 1 to ignore header
            // i += 2 because every conference is set in 2 trs
            for (var i = 1; i < dataTableTrs.Count; i += 2)
            {
                var firstTrTds = dataTableTrs[i].SelectNodes(".//td");
                var secondTrTds = dataTableTrs[i + 1].SelectNodes(".//td");

                var detailsLink = firstTrTds[0].SelectSingleNode(".//a").Attributes["href"].Value;
                var (startDate, endDate) = ParseDateRange(secondTrTds[0].InnerText);
                var deadline = ParseDate(secondTrTds[2].InnerText);

                var conference = new WikiCFPConferenceListItem
                {
                    DetailsUri = new Uri(detailsLink),
                    Initials = firstTrTds[0].InnerText,
                    Name = firstTrTds[1].InnerText,
                    Location = secondTrTds[1].InnerText,

                    StartDate = startDate,
                    EndDate = endDate,
                    Deadline = deadline,
                };

                conferences.Add(conference);
            }

            return conferences;
        }

        private static (DateTime?, DateTime?) ParseDateRange(string dateRange)
        {
            var splitedDateRange = dateRange.Split(" - ");
            if (splitedDateRange.Length == 2)
            {
                return (ParseDate(splitedDateRange[0]), ParseDate(splitedDateRange[1]));
            }

            Console.WriteLine($"Invalid date range format: {dateRange}.");
            return (null, null);
        }

        private static DateTime? ParseDate(string date)
        {
            if (DateTime.TryParse(date, new CultureInfo("en-US"), DateTimeStyles.None, out DateTime parsedDate))
            {
                return parsedDate;
            }

            Console.WriteLine($"Invalid date format: {date}.");
            return null;
        }
    }
}
