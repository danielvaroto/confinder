using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using confinder.application.Interactors;
using confinder.application.Models;
using Microsoft.AspNetCore.Mvc;

namespace confinder.api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class ConferencesController : Controller
    {
        private readonly ConferenceMapInteractor conferenceMapInteractor;
        private readonly ListConferencesInteractor listConferencesInteractor;
        private readonly GetConferenceDetailsInteractor getConferenceDetailsInteractor;

        public ConferencesController(
            ConferenceMapInteractor conferenceMapInteractor,
            ListConferencesInteractor listConferencesInteractor,
            GetConferenceDetailsInteractor getConferenceDetailsInteractor
        )
        {
            this.conferenceMapInteractor = conferenceMapInteractor;
            this.listConferencesInteractor = listConferencesInteractor;
            this.getConferenceDetailsInteractor = getConferenceDetailsInteractor;
        }

        // GET: api/conferences
        [HttpGet]
        public async Task<ConferenceListResponse> Get([FromQuery] ConferenceListRequest filter)
        {
            return await listConferencesInteractor.Execute(filter);
        }

        // GET: api/conferences/map
        [HttpGet("map")]
        public Task<ConferenceMapResponse> GetMap([FromQuery] ConferenceListRequest filter)
        {
            return conferenceMapInteractor.Execute();
        }

        // GET api/conferences/5
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ConferenceDetailsResponse>> Get(int id)
        {
            var result = await getConferenceDetailsInteractor.Execute(id);
            if (result == null)
                return NotFound();
            return Ok(result);
        }
    }
}

