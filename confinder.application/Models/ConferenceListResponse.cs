using System;
namespace confinder.application.Models
{
	public class ConferenceListResponse
	{
        public int PerPage { get; set; }
        public int PageCount { get; set; }
        public int TotalCount { get; set; }
        public IEnumerable<ConferenceListItemResponse> Records { get; set; }
    }
}

