using System;
using System.Xml.Linq;
using confinder.application.Context;
using confinder.application.Models;
using confinder.application.Utils;
using Microsoft.EntityFrameworkCore;

namespace confinder.application.Interactors
{
    public class ListLocationsInteractor
    {
        private readonly ConfinderContext db;

        public ListLocationsInteractor(ConfinderContext db)
        {
            this.db = db;
        }

        public async Task<LocationListResponse> Execute()
        {
            var query = db.ConferenceEditions
                .Select((ce) => ce.Location)
                .Distinct()
                .Where((l) => l != null && l != "")
                .OrderBy((l) => l);

            var records = await query.ToListAsync();

            return new LocationListResponse
            {
                TotalCount = records.Count,
                Records = records,
            };
        }
    }
}

