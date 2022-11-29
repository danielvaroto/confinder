using System;

namespace confinder.application.Scraping.WikiCFP
{
    public class WikiCFPConferenceListItem
    {
        public string DetailsLink { get; set; }

        public string Initials { get; set; }
        public string Name { get; set; }
        public string Location { get; set; }

        public DateOnly StartDate { get; set; }
        public DateOnly EndDate { get; set; }
        public DateOnly Deadline { get; set; }
    }
}
