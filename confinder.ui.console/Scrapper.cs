using confinder.scraping;

namespace confinder.ui.console
{
    public class Scrapper
    {
        private readonly ScrappingService scrapingService;

        public Scrapper(ScrappingService scrapingService)
        {
            this.scrapingService = scrapingService;
        }

        public void Start()
        {
            scrapingService.ScrapAll();
        }
    }
}
