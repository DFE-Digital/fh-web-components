
namespace FamilyHubs.SharedKernel.Razor.Dashboard;

public interface IColumnHeader
{
    SortOrder? Sort { get; }
    string ContentAsHtml { get; }
}