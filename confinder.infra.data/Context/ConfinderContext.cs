using System;
using System.Linq;
using confinder.domain.Models;
using Microsoft.EntityFrameworkCore;

namespace confinder.infra.data.Context
{
    public class ConfinderContext : DbContext
    {
        public DbSet<Conference> Conferences { get; set; }
        public DbSet<ConferenceEdition> ConferenceEditions { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseNpgsql("User ID=user;Password=password;Host=localhost;Port=5432;Database=confinder;Pooling=true;");

            base.OnConfiguring(optionsBuilder);
        }

        public override int SaveChanges()
        {
            var entries = ChangeTracker
                .Entries()
                .Where(e => e.Entity is Entity && (
                    e.State == EntityState.Added
                    || e.State == EntityState.Modified));

            foreach (var entityEntry in entries)
            {
                var now = DateTime.Now;

                ((Entity)entityEntry.Entity).UpdatedAt = now;

                if (entityEntry.State == EntityState.Added)
                {
                    ((Entity)entityEntry.Entity).CreatedAt = now;
                }
            }

            return base.SaveChanges();
        }
    }
}
