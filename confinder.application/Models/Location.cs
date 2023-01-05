using System;
namespace confinder.application.Models
{
	public class Location : Entity
    {
        public string Name { get; set; }
		public double Latitude { get; set; }
		public double Longitude { get; set; }

        public List<ConferenceEdition> ConferenceEditions { get; } = new List<ConferenceEdition>();
    }
}

