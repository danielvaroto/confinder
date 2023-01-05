using System;
using confinder.application.Models;
using Fastenshtein;

namespace confinder.application.Utils
{
    public static class ConferenceUtils
    {
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
    }
}

