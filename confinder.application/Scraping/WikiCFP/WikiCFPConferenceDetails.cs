using System;

namespace confinder.application.Scraping.WikiCFP
{
    public class WikiCFPConferenceDetails
    {
        public string OfficialConferenceLink { get; set; }
        public string ConferenceSeriesLink { get; set; }

        public string Location { get; set; }

        public DateOnly? StartDate { get; set; }
        public DateOnly? EndDate { get; set; }
        public DateOnly? AbstractRegistrationDue { get; set; }
        public DateOnly? SubmissionDeadline { get; set; }
        public DateOnly? NotificationDue { get; set; }
        public DateOnly? FinalVersionDue { get; set; }
    }
}
