using Autofac;
using confinder.application.Context;
using confinder.application.Interactors;
using confinder.application.Interfaces;
using confinder.application.Repositories;
using confinder.application.Scraping.WikiCFP;

namespace confinder.ui.console
{
    public static class IoC
    {
        public static IContainer BuildContainer()
        {
            var builder = new ContainerBuilder();

            builder.RegisterType<ConfinderContext>().AsSelf();
            builder.RegisterGeneric(typeof(Repository<>)).As(typeof(IRepository<>));
            builder.RegisterType<WikiCFPHandler>().As<IScrapingHandler>();
            builder.RegisterType<ScrapAllSourcesInteractor>().AsSelf();

            return builder.Build();
        }
    }
}
