using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using confinder.scraping.Interfaces;

namespace confinder.scraping
{
    public class ScrappingService
    {
        private readonly IEnumerable<IScrapingHandler> scrapingHandlers;

        public ScrappingService(IEnumerable<IScrapingHandler> scrapingHandlers)
        {
            this.scrapingHandlers = scrapingHandlers;
        }

        public void ScrapAll()
        {
            Task.WaitAll(scrapingHandlers.Max(h => h.Execute()));
        }
    }
}
