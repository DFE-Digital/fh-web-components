
namespace FamilyHubs.SharedKernel.Razor.Dashboard;

public record DashboardCell(string? ContentAsHtml, string? PartialName = null) : IDashboardCell;