namespace confinder.scraping.WikiCFP
{
    public static class WikiCfpConfig
    {
        private static readonly string BASE_URL = "http://wikicfp.com";

        public static string SearchUrl (string query)
        {
            return $"{BASE_URL}/cfp/servlet/tool.search?q={query}&year=f";
        }
    }
}
