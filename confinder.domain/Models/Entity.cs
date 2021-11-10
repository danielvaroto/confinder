using System;

namespace confinder.domain.Models
{
    public abstract class Entity
    {
        public int Id { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }
}
