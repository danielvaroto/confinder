using HtmlAgilityPack;
using System.Net;
using System.Net.Http;

namespace confinder.application.Scraping
{
    public class ScrapingFramework
    {
        private static DateTime? lastCall = null;
        private static readonly int delayInMs = 100;

        public static async Task<HtmlDocument> GetHtmlDocument(string url)
        {
            await Throttle();
            Console.WriteLine($"{DateTime.UtcNow} - Calling {url}");

            var web = new HtmlWeb();
            web.PreRequest = request =>
            {
                request.Headers.Add("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36");
                request.Headers.Add("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8");
                request.Headers.Add("Accept-Language", "en-US,en;q=0.5");
                request.AutomaticDecompression = DecompressionMethods.GZip | DecompressionMethods.Deflate | DecompressionMethods.Brotli;
                request.Headers.Add("DNT", "1");
                request.Headers.Add("Connection", "keep-alive");
                request.Headers.Add("Upgrade-Insecure-Requests", "1");
                return true;
            };

            return web.Load(url);
        }

        private static async Task Throttle()
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
        }
    }
}
