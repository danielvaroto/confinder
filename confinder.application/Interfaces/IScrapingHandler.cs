using System.Threading.Tasks;
using confinder.application.Models;

namespace confinder.application.Interfaces
{
    public interface IScrapingHandler
    {
        IAsyncEnumerable<ConferenceEdition> Execute();
    }
}
