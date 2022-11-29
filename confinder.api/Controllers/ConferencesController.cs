using System;
using System.Collections.Generic;
using System.Linq;
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

        public ConferencesController(ListConferencesInteractor listConferencesInteractor)
        {
            this.listConferencesInteractor = listConferencesInteractor;
        }

        // GET: api/conferences
        [HttpGet]
        public async Task<ConferenceListResponse> Get([FromQuery] ConferenceListRequest filter)
        {
            return await listConferencesInteractor.Execute(filter);
        }

        // GET api/conferences/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }
    }
}

