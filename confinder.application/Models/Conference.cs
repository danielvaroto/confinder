﻿using System.Collections.Generic;

namespace confinder.application.Models
{
    public class Conference : Entity
    {
        public string Initials { get; set; }
        public string Name { get; set; }
        public string QualisIndex { get; set; }

        public List<ConferenceEdition> ConferenceEditions { get; } = new List<ConferenceEdition>();
    }
}
