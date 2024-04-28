using HtmlAgilityPack;

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
