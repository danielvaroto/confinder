using System;
using confinder.application.Models;
using Fastenshtein;

namespace confinder.application.Utils
{
    public static class ConferenceUtils
    {
        private static readonly HashSet<string> invalidLocations = new HashSet<string>
        {
            "hybridconference",
            "virtualconference",
            "virtualevent",
            "tba"
        };

        public static (Conference?, int?) GetMinEditDistance(IEnumerable<Conference> conferences, string foundConferenceName)
        {
            int? minEditDistance = null;
            Conference? minConference = null;

            foreach (var conference in conferences)
            {
                var editDistance = Levenshtein.Distance(foundConferenceName, conference.Name);
                if (minEditDistance == null || minEditDistance > editDistance)
                {
                    minEditDistance = editDistance;
                    minConference = conference;
                }
            }

            return (minConference, minEditDistance);
        }

        public static bool IsValidLocation(string location)
        {
            return !invalidLocations.Contains(StringUtils.Normalize(location));
        }
    }
}

