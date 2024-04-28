using Autofac;
using confinder.application.Interactors;
using confinder.ui.console;

namespace confinder.console;

class Program
{
    static async Task Main(string[] args)
    {
        var container = IoC.BuildContainer();
        using var scope = container.BeginLifetimeScope();
        var scrapper = scope.Resolve<ScrapAllSourcesInteractor>();
        await scrapper.Execute();
    }
}
