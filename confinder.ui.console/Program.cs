using Autofac;

namespace confinder.ui.console
{
    public class Program
    {
        private static IContainer Container { get; set; }

        static void Main(string[] args)
        {
            Container = IoC.BuildContainer();
            StartScrapper();
        }

        private static void StartScrapper()
        {
            using var scope = Container.BeginLifetimeScope();
            var scrapper = scope.Resolve<Scrapper>();
            scrapper.Start();
        }
    }
}