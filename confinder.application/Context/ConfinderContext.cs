using System;
using System.Linq;
using confinder.application.Models;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace confinder.application.Context
{
    public class ConfinderContext : DbContext
    {
        public DbSet<Conference> Conferences { get; set; }
        public DbSet<ConferenceEdition> ConferenceEditions { get; set; }
        public DbSet<Location> Locations { get; set; }
        public DbSet<LocationLog> LocationLogs { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            // optionsBuilder.LogTo(Console.WriteLine);
            optionsBuilder.UseNpgsql(Environment.GetEnvironmentVariable("DB_CONNECTION_STRING"));
            base.OnConfiguring(optionsBuilder);
        }

        public override int SaveChanges()
        {
            AddTimestamps();
            return base.SaveChanges();
        }

        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            AddTimestamps();
            return base.SaveChangesAsync(cancellationToken);
        }

        private void AddTimestamps()
        {
            var entries = ChangeTracker
                            .Entries()
                            .Where(e => e.Entity is Entity && (
                                e.State == EntityState.Added
                                || e.State == EntityState.Modified));
            foreach (var entityEntry in entries)
            {
                var now = DateTime.UtcNow;
                ((Entity)entityEntry.Entity).UpdatedAt = now;
                if (entityEntry.State == EntityState.Added)
                {
                    ((Entity)entityEntry.Entity).CreatedAt = now;
                }
            }
        }
    }
}
