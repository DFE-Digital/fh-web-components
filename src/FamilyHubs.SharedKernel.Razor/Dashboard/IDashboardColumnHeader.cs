
namespace FamilyHubs.SharedKernel.Razor.Dashboard;

public interface IDashboardColumnHeader
{
    SortOrder? Sort { get; }
    string ContentAsHtml { get; }
}