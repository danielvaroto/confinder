using System;
namespace confinder.application.Models
{
	public class ConferenceDetailsResponse
    {
        public int Id { get; set; }

        public string Name { get; set; }
        public string QualisIndex { get; set; }
        public string? Location { get; set; }
        public string? OfficialConferenceUri { get; set; }

        public DateOnly StartDate { get; set; }
        public DateOnly EndDate { get; set; }
        public DateOnly? AbstractRegistrationDue { get; set; }
        public DateOnly SubmissionDeadline { get; set; }
        public DateOnly? NotificationDue { get; set; }
        public DateOnly? FinalVersionDue { get; set; }
    }
}

