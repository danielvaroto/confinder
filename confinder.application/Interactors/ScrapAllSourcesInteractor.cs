using System;
using confinder.application.Interfaces;
using confinder.application.Models;
using confinder.application.Context;
using confinder.application.Utils;
using Fastenshtein;
using Microsoft.EntityFrameworkCore;

namespace confinder.application.Interactors
{
    public class ScrapAllSourcesInteractor
    {
        private readonly ConfinderContext db;
        private readonly IEnumerable<IScrapingHandler> scrapingHandlers;
        private static readonly HashSet<string> invalidLocations = new HashSet<string>
        {
            "hybridconference"
        };

        public ScrapAllSourcesInteractor(ConfinderContext db,
            IEnumerable<IScrapingHandler> scrapingHandlers)
        {
            this.db = db;
            this.scrapingHandlers = scrapingHandlers;
        }

        public async Task Execute()
        {
            foreach (var scrapingHandler in scrapingHandlers)
            {
                await foreach (var conferenceEdition in scrapingHandler.Execute())
                {
                    var conflictingConferenceEdition = db.ConferenceEditions
                        .Include(ce => ce.Conference)
                        .FirstOrDefault((ce) =>
                            ce.ConferenceId == conferenceEdition.ConferenceId
                            && ce.StartDate.AddMonths(-3) <= conferenceEdition.StartDate
                            && ce.StartDate.AddMonths(3) >= conferenceEdition.StartDate);
                    if (conflictingConferenceEdition == null)
                    {
                        await db.ConferenceEditions.AddAsync(conferenceEdition);
                    }
                    else
                    {
                        MergeConflictingConferenceEdition(conflictingConferenceEdition, conferenceEdition);
                        db.ConferenceEditions.Update(conflictingConferenceEdition);
                    }
                    Console.WriteLine($"Saving conference edition from conference id '{conferenceEdition.ConferenceId}'");
                    db.SaveChanges();
                }
            }
        }

        private static void MergeConflictingConferenceEdition(ConferenceEdition old, ConferenceEdition @new)
        {
            old.StartDate = @new.StartDate;
            old.EndDate = @new.EndDate;
            old.SubmissionDeadline = @new.SubmissionDeadline;
            if (IsValidLocation(@new.Location))
            {
                old.Location = @new.Location;
            }
            if (Levenshtein.Distance(old.Conference.Name, @new.Name) < Levenshtein.Distance(old.Conference.Name, old.Name))
            {
                old.Name = @new.Name;
            }
            if (@new.AbstractRegistrationDue != null)
            {
                old.AbstractRegistrationDue = @new.AbstractRegistrationDue;
            }
            if (@new.NotificationDue != null)
            {
                old.NotificationDue = @new.NotificationDue;
            }
            if (@new.FinalVersionDue != null)
            {
                old.FinalVersionDue = @new.FinalVersionDue;
            }
        }

        private static bool IsValidLocation(string? location)
        {
            return !invalidLocations.Contains(StringUtils.Normalize(location));
        }
    }
}
