using Autofac;
using confinder.application.Context;
using confinder.application.Geocoding;
using confinder.application.Interactors;
using confinder.application.Interfaces;
using confinder.application.Repositories;
using confinder.application.Scraping.Research;
using confinder.application.Scraping.WikiCFP;

namespace confinder.ui.console
{
    public static class IoC
    {
        public static IContainer BuildContainer()
        {
            var builder = new ContainerBuilder();

            builder.RegisterType<ConfinderContext>().AsSelf();
            builder.RegisterType<GeocodingService>().AsSelf();
            builder.RegisterGeneric(typeof(Repository<>)).As(typeof(IRepository<>));
            builder.RegisterType<ResearchHandler>().As<IScrapingHandler>();
            builder.RegisterType<WikiCFPHandler>().As<IScrapingHandler>();
            builder.RegisterType<ScrapAllSourcesInteractor>().AsSelf();

            return builder.Build();
        }
    }
}
