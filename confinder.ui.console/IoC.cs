using Autofac;
using confinder.domain.Interfaces;
using confinder.infra.data.Context;
using confinder.infra.data.Repositories;
using confinder.scraping;
using confinder.scraping.Interfaces;
using confinder.scraping.WikiCFP;

namespace confinder.ui.console
{
    public static class IoC
    {
        public static IContainer BuildContainer()
        {
            var builder = new ContainerBuilder();

            builder.RegisterType<Scrapper>().AsSelf();
            builder.RegisterType<ConfinderContext>().AsSelf();
            builder.RegisterGeneric(typeof(Repository<>)).As(typeof(IRepository<>));
            builder.RegisterType<WikiCFPHandler>().As<IScrapingHandler>();
            builder.RegisterType<ScrappingService>().AsSelf();

            return builder.Build();
        }
    }
}
