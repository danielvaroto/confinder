using System;
using confinder.application.Context;
using confinder.application.Models;
using Microsoft.EntityFrameworkCore;

namespace confinder.application.Interactors
{
	public class ConferenceMapInteractor
	{
        private readonly ConfinderContext db;

        public ConferenceMapInteractor(ConfinderContext db)
		{
            this.db = db;
        }

        public async Task<ConferenceMapResponse> Execute()
        {
            var conferencesJoin = db.ConferenceEditions
                .Join(
                    db.Conferences,
                    (ce) => ce.ConferenceId,
                    (c) => c.Id,
                    (ce, c) => new
                    {
                        ConferenceEdition = ce,
                        Conference = c,
                    });
            var records = await db.Locations
                .GroupJoin(
                    conferencesJoin,
                    (l) => l.Id,
                    (c) => c.ConferenceEdition.LocationId,
                    (l, cj) => new ConferenceMapItemResponse
                    {
                        Name = l.Name,
                        Latitude = l.Latitude,
                        Longitude = l.Longitude,
                        Conferences = cj.Select((c) => new ConferenceListItemResponse
                        {
                            Id = c.ConferenceEdition.Id,
                            Name = c.ConferenceEdition.Name,
                            Location = l.Name,
                            QualisIndex = c.Conference.QualisIndex,
                            StartDate = c.ConferenceEdition.StartDate,
                            EndDate = c.ConferenceEdition.EndDate,
                            SubmissionDeadline = c.ConferenceEdition.SubmissionDeadline,
                        }),
                    })
                .ToListAsync();
            return new ConferenceMapResponse
            {
                ConferencesCount = conferencesJoin.Count(),
                LocationsCount = records.Count,
                Records = records
            };
        }
    }
}

