using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using HtmlAgilityPack;

namespace confinder.scraping.wikicfp
{
    public class WikiCFPFHtmlParser
    {
        public IEnumerable<WikiCFPConferenceListItem> ParseSearchResultPage(string response)
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

            // i = 1 to header
            // i += 2 because every conference is set in 2 trs
            for (var i = 1; i < dataTableTrs.Count; i += 2)
            {
                var firstTrTds = dataTableTrs[i].SelectNodes(".//td");
                var secondTrTds = dataTableTrs[i + 1].SelectNodes(".//td");

                var (startDate, endDate) = ParseDateRange(secondTrTds[0].InnerText);
                var deadline = ParseDate(secondTrTds[2].InnerText);

                var conference = new WikiCFPConferenceListItem
                {
                    // TODO: DetailsUri
                    DetailsUri = new Uri(string.Empty),
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

        private (DateTime, DateTime) ParseDateRange(string dateRange)
        {
            var splitedDateRange = dateRange.Split(" - ");
            return (ParseDate(splitedDateRange[0]), ParseDate(splitedDateRange[1]));
        }

        private DateTime ParseDate(string date)
        {
            return DateTime.Parse(date, new CultureInfo("en-US"));
        }
    }
}
