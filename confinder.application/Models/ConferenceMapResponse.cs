using System;
namespace confinder.application.Models
{
	public class ConferenceMapResponse
	{
        public int ConferencesCount { get; set; }
        public int LocationsCount { get; set; }
        public IEnumerable<ConferenceMapItemResponse> Records { get; set; }
    }
}

