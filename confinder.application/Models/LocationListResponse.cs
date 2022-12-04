using System;
namespace confinder.application.Models
{
	public class LocationListResponse
	{
        public int TotalCount { get; set; }
        public IEnumerable<string> Records { get; set; }
    }
}

