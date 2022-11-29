using System;
using confinder.application.Context;
using confinder.application.Models;
using Microsoft.EntityFrameworkCore;

namespace confinder.application.Interactors
{
    public class GetConferenceDetailsInteractor
    {
        private readonly ConfinderContext db;

        public GetConferenceDetailsInteractor(ConfinderContext db)
        {
            this.db = db;
        }

        public async Task<ConferenceDetailsResponse?> Execute(int id)
        {
            return await db.ConferenceEditions
                .Join(
                    db.Conferences,
                    ce => ce.ConferenceId,
                    c => c.Id,
                    (ce, c) => new ConferenceDetailsResponse
                    {
                        Id = ce.Id,
                        Name = ce.Name,
                        QualisIndex = c.QualisIndex,
                        Location = ce.Location,
                        OfficialConferenceUri = ce.OfficialConferenceUri,
                        StartDate = ce.StartDate,
                        EndDate = ce.EndDate,
                        AbstractRegistrationDue = ce.AbstractRegistrationDue,
                        SubmissionDeadline = ce.SubmissionDeadline,
                        NotificationDue = ce.NotificationDue,
                        FinalVersionDue = ce.FinalVersionDue,
                    })
                .FirstOrDefaultAsync((c) => c.Id == id);
        }
    }
}
