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
    public class ConferencesController : Controller
    {
        private readonly ListConferencesInteractor listConferencesInteractor;
        private readonly GetConferenceDetailsInteractor getConferenceDetailsInteractor;

        public ConferencesController(
            ListConferencesInteractor listConferencesInteractor,
            GetConferenceDetailsInteractor getConferenceDetailsInteractor
        ) {
            this.listConferencesInteractor = listConferencesInteractor;
            this.getConferenceDetailsInteractor = getConferenceDetailsInteractor;
        }

        // GET: api/conferences
        [HttpGet]
        public async Task<ConferenceListResponse> Get([FromQuery] ConferenceListRequest filter)
        {
            return await listConferencesInteractor.Execute(filter);
        }

        // GET api/conferences/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var result = await getConferenceDetailsInteractor.Execute(id);
            if (result == null)
                return NotFound();
            return Ok(result);
        }
    }
}

