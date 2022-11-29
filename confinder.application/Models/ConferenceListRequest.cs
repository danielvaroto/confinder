using System;

namespace confinder.application.Models
{
	public class ConferenceListRequest
	{
        public int? Page { get; set; }

		public string? Name { get; set; }
		public string? Location { get; set; }
        public string? MinQualisIndex { get; set; }
        public string? MaxQualisIndex { get; set; }
        public DateOnly? MinEventDate { get; set; }
        public DateOnly? MaxEventDate { get; set; }
        public DateOnly? MinSubmissionDeadline { get; set; }
        public DateOnly? MaxSubmissionDeadline { get; set; }
    }
}
