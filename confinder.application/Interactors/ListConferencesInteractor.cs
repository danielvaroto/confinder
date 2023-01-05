using System;
using System.Xml.Linq;
using confinder.application.Context;
using confinder.application.Models;
using confinder.application.Utils;
using Microsoft.EntityFrameworkCore;

namespace confinder.application.Interactors
{
	public class ListConferencesInteractor
	{
        private readonly ConfinderContext db;

        public ListConferencesInteractor(ConfinderContext db)
		{
            this.db = db;
        }

		public async Task<ConferenceListResponse> Execute(ConferenceListRequest request)
		{
            var itemsPerPage = 12;

			var query = db.ConferenceEditions.Join(
                db.Conferences,
                ce => ce.ConferenceId,
                c => c.Id,
                (ce, c) => new ConferenceListItemResponse
                {
                    Id = ce.Id,
                    Name = ce.Name,
                    Location = ce.UnformattedLocation,
                    QualisIndex = c.QualisIndex,
                    StartDate = ce.StartDate,
                    EndDate = ce.EndDate,
                    SubmissionDeadline = ce.SubmissionDeadline
                });

            query = ApplyFilters(query, request);

            var records = await query
                .Skip(((request.Page ?? 1) - 1) * itemsPerPage)
                .Take(itemsPerPage)
                .ToListAsync();

            var totalCount = await query.CountAsync();

            return new ConferenceListResponse
            {
                PerPage = itemsPerPage,
                PageCount = records.Count,
                TotalCount = totalCount,
                Records = records,
            };
        }

        private IQueryable<ConferenceListItemResponse> ApplyFilters(IQueryable<ConferenceListItemResponse> query, ConferenceListRequest request)
        {
            if (request.Name != null)
                query = query.Where((c) => c.Name.ToLower().Contains(request.Name.ToLower()));
            if (request.Location != null)
                query = query.Where((c) => c.Location == request.Location);
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
                query = query.Where((c) => filtredQualisIndex.Contains(c.QualisIndex));
            }
            return query;
        }
    }
}

