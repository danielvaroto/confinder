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
            var records = await db.Locations
                .Select((l) => l.Name)
                .OrderBy((l) => l)
                .ToListAsync();
            return new LocationListResponse
            {
                TotalCount = records.Count,
                Records = records,
            };
        }
    }
}

