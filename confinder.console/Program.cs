using Autofac;
using confinder.application.Interactors;
using confinder.ui.console;

namespace confinder.console;

class Program
{
    private static IContainer Container { get; set; }

    static async Task Main(string[] args)
    {
        Container = IoC.BuildContainer();
        using var scope = Container.BeginLifetimeScope();
        var scrapper = scope.Resolve<ScrapAllSourcesInteractor>();
        await scrapper.Execute();
    }
}
