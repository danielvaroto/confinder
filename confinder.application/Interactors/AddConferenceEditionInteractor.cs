using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using confinder.domain.Interfaces;
using confinder.domain.Models;

namespace confinder.application.Interactors
{
    public class AddConferenceEditionInteractor
    {
        private readonly IRepository<ConferenceEdition> conferenceEditionRepository;

        public AddConferenceEditionInteractor(IRepository<ConferenceEdition> conferenceEditionRepository)
        {
            this.conferenceEditionRepository = conferenceEditionRepository;
        }

        public async Task AddMany(IEnumerable<ConferenceEdition> conferenceEditions)
        {
            
        }
    }
}
