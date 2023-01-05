using System;
namespace confinder.application.Models
{
	public class LocationLog : Entity
    {
        public int ConferenceEditionId { get; set; }
        public int LocationId { get; set; }

        public string UnformattedLocation { get; set; }

        public ConferenceEdition ConferenceEdition { get; set; }
        public Location Location { get; set; }
    }
}

