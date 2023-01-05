using System;
using System.Net.Http;
using System.Threading.Tasks;
using HtmlAgilityPack;

namespace confinder.application.Scraping
{
    public class ScrapingFramework
    {
        private static readonly HttpClient client = new HttpClient();
        private static DateTime? lastCall = null;
        private static readonly int delayInMs = 1;

        public static async Task<string> CallUrl(string fullUrl)
        {
            if (lastCall != null)
            {
                var diffInMs = (DateTime.UtcNow - (DateTime)lastCall).TotalMilliseconds;
                if (diffInMs < delayInMs)
                {
                    await Task.Delay(delayInMs - (int)diffInMs);
                }
            }
            lastCall = DateTime.UtcNow;
            Console.WriteLine($"{DateTime.UtcNow} - Calling {fullUrl}");
            return await client.GetStringAsync(fullUrl);
        }

        public static HtmlDocument ParseHtml(string html)
        {
            var htmlDocument = new HtmlDocument();
            htmlDocument.LoadHtml(html);
            return htmlDocument;
        }
    }
}
