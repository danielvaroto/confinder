using System;

namespace confinder.domain.Models
{
    public class ConferenceEdition : Entity
    {
        //protected ConferenceEdition() { }

        public int ConferenceId { get; set; }

        public string Source { get; set; }

        public string Name { get; set; }
        public string Location { get; set; }
        public string OfficialConferenceUri { get; set; }
        public int LevenshteinDistance { get; set; }

        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public DateTime? AbstractRegistrationDue { get; set; }
        public DateTime? SubmissionDeadline { get; set; }
        public DateTime? NotificationDue { get; set; }
        public DateTime? FinalVersionDue { get; set; }

        public Conference Conference { get; set; }
    }
}
