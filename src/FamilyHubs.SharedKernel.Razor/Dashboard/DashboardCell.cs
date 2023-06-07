
namespace FamilyHubs.SharedKernel.Razor.Dashboard;

internal record DashboardCell(string? ContentAsHtml, string? PartialName = null) : IDashboardCell;