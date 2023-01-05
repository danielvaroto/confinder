using System;
namespace confinder.application.Models
{
    public class ConferenceMapItemResponse
    {
        public string Name { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public IEnumerable<ConferenceListItemResponse> Conferences { get; set; }
    }
}

