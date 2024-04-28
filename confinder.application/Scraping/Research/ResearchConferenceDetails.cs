using System;

namespace confinder.application.Scraping.Research
{
    public class ResearchConferenceDetails
    {
        public string OfficialConferenceLink { get; set; }
        public string Name { get; set; }
        public string Location { get; set; }
        public DateOnly StartDate { get; set; }
        public DateOnly EndDate { get; set; }
        public DateOnly SubmissionDeadline { get; set; }
    }
}
