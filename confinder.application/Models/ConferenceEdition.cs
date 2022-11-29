using System;

namespace confinder.application.Models
{
    public class ConferenceEdition : Entity
    {
        public int ConferenceId { get; set; }

        public string Source { get; set; }

        public string Name { get; set; }
        public string? Location { get; set; }
        public string? OfficialConferenceUri { get; set; }
        public int LevenshteinDistance { get; set; }

        public DateOnly StartDate { get; set; }
        public DateOnly EndDate { get; set; }
        public DateOnly? AbstractRegistrationDue { get; set; }
        public DateOnly SubmissionDeadline { get; set; }
        public DateOnly? NotificationDue { get; set; }
        public DateOnly? FinalVersionDue { get; set; }

        public Conference Conference { get; set; }
    }
}
