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
    public class LocationsController : Controller
    {
        private readonly ListLocationsInteractor listLocationsInteractor;

        public LocationsController(ListLocationsInteractor listLocationsInteractor)
        {
            this.listLocationsInteractor = listLocationsInteractor;
        }

        // GET: api/locations
        [HttpGet]
        public async Task<LocationListResponse> Get()
        {
            return await listLocationsInteractor.Execute();
        }
    }
}

