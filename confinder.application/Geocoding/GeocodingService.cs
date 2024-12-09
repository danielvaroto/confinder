using System;
using System.Text.Json;
using confinder.application.Models;
using confinder.application.Utils;
using Newtonsoft.Json;

namespace confinder.application.Geocoding
{
	public class GeocodingService
	{
		private static readonly HttpClient client = new HttpClient();
		private readonly string URL = "https://maps.googleapis.com/maps/api/geocode/json";
		private readonly string API_KEY;

		public GeocodingService()
		{
			API_KEY = Environment.GetEnvironmentVariable("GEOCODING_API_KEY")
				?? throw new ArgumentNullException("Could not find GEOCODING_API_KEY");
		}

		public async Task<Location> GetLocation(string unformattedLocation)
		{
			var uri = new Uri($"{URL}?address={StringUtils.Normalize(unformattedLocation)}&key={API_KEY}&language=pt");
			var response = await client.GetAsync(uri);
			response.EnsureSuccessStatusCode();
			var responseString = await response.Content.ReadAsStringAsync();
			var geocoding = JsonConvert.DeserializeObject<GeocodingResponse>(responseString);
			if (geocoding?.status != "OK" || geocoding.results.Count == 0)
			{
				throw new ApplicationException($"Could not find location for: '{unformattedLocation}'");
			}
			return new Location
			{
				Name = geocoding.results[0].formatted_address,
				Latitude = geocoding.results[0].geometry.location.lat,
				Longitude = geocoding.results[0].geometry.location.lng,
			};
		}
	}
}

