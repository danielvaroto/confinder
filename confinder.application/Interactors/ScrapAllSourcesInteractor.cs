using System;
using confinder.application.Interfaces;
using confinder.application.Models;
using confinder.application.Context;
using confinder.application.Utils;
using Fastenshtein;
using Microsoft.EntityFrameworkCore;
using confinder.application.Geocoding;

namespace confinder.application.Interactors
{
    public class ScrapAllSourcesInteractor
    {
        private readonly ConfinderContext db;
        private readonly IEnumerable<IScrapingHandler> scrapingHandlers;
        private readonly GeocodingService geocodingService;

        public ScrapAllSourcesInteractor(ConfinderContext db,
            IEnumerable<IScrapingHandler> scrapingHandlers,
            GeocodingService geocodingService)
        {
            this.db = db;
            this.scrapingHandlers = scrapingHandlers;
            this.geocodingService = geocodingService;
        }

        public async Task Execute()
        {
            foreach (var scrapingHandler in scrapingHandlers)
            {
                await foreach (var conferenceEdition in scrapingHandler.Execute())
                {
                    try
                    {
                        var conflictingConferenceEdition = findConflictingConferenceEdition(conferenceEdition);
                        if (conflictingConferenceEdition == null)
                        {
                            Location? geocodingLocation = null;
                            try
                            {
                                geocodingLocation = await geocodingService.GetLocation(conferenceEdition.UnformattedLocation);
                            }
                            catch (Exception e)
                            {
                                Console.WriteLine($"Could not find geocoding for: '{conferenceEdition.UnformattedLocation}'");
                                Console.WriteLine(e.ToString());
                            }
                            if (geocodingLocation != null)
                            {
                                var storedGeocodingLocation = db.Locations.FirstOrDefault((l) => l.Name == geocodingLocation.Name);
                                conferenceEdition.Location = storedGeocodingLocation ?? geocodingLocation;
                                await db.ConferenceEditions.AddAsync(conferenceEdition);
                                await db.LocationLogs.AddAsync(new LocationLog
                                {
                                    UnformattedLocation = conferenceEdition.UnformattedLocation,
                                    ConferenceEdition = conferenceEdition,
                                    Location = conferenceEdition.Location,
                                });
                            }
                        }
                        else
                        {
                            await MergeConflictingConferenceEdition(conflictingConferenceEdition, conferenceEdition);
                            db.ConferenceEditions.Update(conflictingConferenceEdition);
                        }
                        Console.WriteLine($"Saving conference edition from conference id '{conferenceEdition.ConferenceId}'");
                        db.SaveChanges();
                    }
                    catch (Exception e)
                    {
                        Console.WriteLine(e.ToString());
                    }
                }
            }
        }

        private ConferenceEdition? findConflictingConferenceEdition(ConferenceEdition conferenceEdition)
        {
            return db.ConferenceEditions
                .Include(ce => ce.Conference)
                .FirstOrDefault((ce) =>
                    ce.ConferenceId == conferenceEdition.ConferenceId
                    && ce.StartDate.AddMonths(-3) <= conferenceEdition.StartDate
                    && ce.StartDate.AddMonths(3) >= conferenceEdition.StartDate);
        }

        private async Task MergeConflictingConferenceEdition(ConferenceEdition old, ConferenceEdition @new)
        {
            old.StartDate = @new.StartDate;
            old.EndDate = @new.EndDate;
            old.SubmissionDeadline = @new.SubmissionDeadline;
            if (@new.UnformattedLocation != old.UnformattedLocation && ConferenceUtils.IsValidLocation(@new.UnformattedLocation))
            {
                Location? geocodingLocation = null;
                try
                {
                    geocodingLocation = await geocodingService.GetLocation(@new.UnformattedLocation);
                }
                catch (Exception e)
                {
                    Console.WriteLine($"Could not find geocoding for: '{@new.UnformattedLocation}'");
                    Console.WriteLine(e.ToString());
                }
                if (geocodingLocation != null)
                {
                    var storedGeocodingLocation = db.Locations.FirstOrDefault((l) => l.Name == geocodingLocation.Name);
                    old.Location = storedGeocodingLocation ?? geocodingLocation;
                    old.UnformattedLocation = @new.UnformattedLocation;
                    await db.LocationLogs.AddAsync(new LocationLog
                    {
                        UnformattedLocation = @new.UnformattedLocation,
                        ConferenceEdition = old,
                        Location = old.Location,
                    });
                }
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
            if (@new.OfficialConferenceUri != null)
            {
                old.OfficialConferenceUri = @new.OfficialConferenceUri;
            }
        }
    }
}
