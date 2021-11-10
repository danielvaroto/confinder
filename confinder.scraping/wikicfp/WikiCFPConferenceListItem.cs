using System;

namespace confinder.scraping.WikiCFP
{
    public class WikiCFPConferenceListItem
    {
        public Uri DetailsUri { get; set; }

        public string Initials { get; set; }
        public string Name { get; set; }
        public string Location { get; set; }

        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public DateTime? Deadline { get; set; }
    }
}
