using System;
using confinder.application.Context;
using confinder.application.Models;
using Microsoft.EntityFrameworkCore;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace confinder.application.Interactors
{
	public class ConferenceMapInteractor
	{
        private readonly ConfinderContext db;

        public ConferenceMapInteractor(ConfinderContext db)
		{
            this.db = db;
        }

        public async Task<ConferenceMapResponse> Execute(ConferenceMapRequest request)
        {
            var conferencesJoin = db.ConferenceEditions.AsQueryable();
            conferencesJoin = ApplyFilters(conferencesJoin, request);
            var records = await db.Locations
                .GroupJoin(
                    conferencesJoin,
                    (l) => l.Id,
                    (c) => c.LocationId,
                    (l, cj) => new ConferenceMapItemResponse
                    {
                        Name = l.Name,
                        Latitude = l.Latitude,
                        Longitude = l.Longitude,
                        Conferences = cj.Select((c) => new ConferenceListItemResponse
                        {
                            Id = c.Id,
                            Name = c.Name,
                            Location = l.Name,
                            QualisIndex = c.Conference.QualisIndex,
                            StartDate = c.StartDate,
                            EndDate = c.EndDate,
                            SubmissionDeadline = c.SubmissionDeadline,
                        }),
                    })
                .ToListAsync();
            records = records.Where(l => l.Conferences.Any()).ToList();
            return new ConferenceMapResponse
            {
                ConferencesCount = conferencesJoin.Count(),
                LocationsCount = records.Count,
                Records = records
            };
        }

        private IQueryable<ConferenceEdition> ApplyFilters(IQueryable<ConferenceEdition> query, ConferenceMapRequest request)
        {
            if (request.Name != null)
                query = query.Where((c) => c.Name.ToLower().Contains(request.Name.ToLower()));
            if (request.MinEventDate != null)
                query = query.Where((c) => c.StartDate >= request.MinEventDate);
            if (request.MaxEventDate != null)
                query = query.Where((c) => c.EndDate <= request.MaxEventDate);
            if (request.MinSubmissionDeadline != null)
                query = query.Where((c) => c.SubmissionDeadline >= request.MinSubmissionDeadline);
            if (request.MaxSubmissionDeadline != null)
                query = query.Where((c) => c.SubmissionDeadline <= request.MaxSubmissionDeadline);
            if (request.MinQualisIndex != null || request.MaxQualisIndex != null)
            {
                var validQualisIndex = new string[] { "C", "B4", "B3", "B2", "B1", "A4", "A3", "A2", "A1" };
                int minQualisIndexPosition = 0;
                int maxQualisIndexPosition = validQualisIndex.Length - 1;
                for (var i = 0; i < validQualisIndex.Length; i++)
                {
                    if (validQualisIndex[i] == request.MinQualisIndex)
                    {
                        minQualisIndexPosition = i;
                    }
                    if (validQualisIndex[i] == request.MaxQualisIndex)
                    {
                        maxQualisIndexPosition = i;
                    }
                }
                var filtredQualisIndex = new List<string>();
                for (var i = 0; i < validQualisIndex.Length; i++)
                {
                    if (i >= minQualisIndexPosition && i <= maxQualisIndexPosition)
                    {
                        filtredQualisIndex.Add(validQualisIndex[i]);
                    }
                }
                query = query.Where((c) => filtredQualisIndex.Contains(c.Conference.QualisIndex));
            }
            return query;
        }
    }
}

