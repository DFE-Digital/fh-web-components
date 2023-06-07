
namespace FamilyHubs.SharedKernel.Razor.Dashboard;

public interface IDashboardCell
{
    string? PartialName { get; }
    string? ContentAsHtml { get; }
}