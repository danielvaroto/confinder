using System.Collections.Generic;

namespace confinder.domain.Models
{
    public class Conference : Entity
    {
        //protected Conference() { }

        public string Initials { get; set; }
        public string Name { get; set; }
        public string QualisIndex { get; set; }

        public List<ConferenceEdition> Editions { get; } = new List<ConferenceEdition>();
    }
}
