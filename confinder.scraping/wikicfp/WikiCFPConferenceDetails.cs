using System;

namespace confinder.scraping.wikicfp
{
    public class WikiCFPConferenceDetails
    {
        public Uri OfficialConferenceUri { get; set; }
        public Uri ConferenceSeriesUri { get; set; }

        public string Name { get; set; }
        public string Location { get; set; }

        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public DateTime AbstractRegistrationDue { get; set; }
        public DateTime SubmissionDeadline { get; set; }
        public DateTime NotificationDue { get; set; }
        public DateTime FinalVersionDue { get; set; }
    }
}
