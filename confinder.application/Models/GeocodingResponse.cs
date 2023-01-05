using System;

namespace confinder.application.Models
{
	public class GeocodingResponse
	{
        public List<GeocodingResult> results { get; set; }
        public string status { get; set; }
    }

    public class GeocodingResult
    {
        public string formatted_address { get; set; }
        public GeocodingGeometry geometry { get; set; }
    }

    public class GeocodingGeometry
    {
        public GeocodingLocation location { get; set; }
    }

    public class GeocodingLocation
    {
        public double lat { get; set; }
        public double lng { get; set; }
    }
}

