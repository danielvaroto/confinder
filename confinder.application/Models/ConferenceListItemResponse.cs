using System;
namespace confinder.application.Models
{
	public class ConferenceListItemResponse
	{
        public int Id { get; set; }
        public string Name { get; set; }
        public string Location { get; set; }
        public string QualisIndex { get; set; }
        public DateOnly StartDate { get; set; }
        public DateOnly EndDate { get; set; }
        public DateOnly SubmissionDeadline { get; set; }
    }
}

