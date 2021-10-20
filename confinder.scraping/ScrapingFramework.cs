using System.Net.Http;
using System.Threading.Tasks;
using HtmlAgilityPack;

namespace confinder.scraping
{
    public class ScrapingFramework
    {
        public static async Task<string> CallUrl(string fullUrl)
        {
            var client = new HttpClient();
            client.DefaultRequestHeaders.Accept.Clear();
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
