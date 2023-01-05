
using confinder.application.Context;
using confinder.application.Interactors;
using confinder.application.Interfaces;
using confinder.application.Repositories;
using confinder.application.Scraping.WikiCFP;
using Microsoft.OpenApi.Models;

namespace confinder.api;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        builder.Services.AddScoped<ConfinderContext>();
        builder.Services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
        builder.Services.AddScoped<ConferenceMapInteractor>();
        builder.Services.AddScoped<GetConferenceDetailsInteractor>();
        builder.Services.AddScoped<ListConferencesInteractor>();
        builder.Services.AddScoped<ListLocationsInteractor>();

        builder.Services.AddControllers();
        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen((c) => c.MapType<DateOnly>(() => new OpenApiSchema
        {
            Type = "string",
            Format = "date"
        }));

        var app = builder.Build();

        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseHttpsRedirection();
        app.UseCors((options) => options.AllowAnyOrigin().AllowAnyMethod());
        app.UseAuthorization();
        app.MapControllers();
        app.Run();
    }
}

