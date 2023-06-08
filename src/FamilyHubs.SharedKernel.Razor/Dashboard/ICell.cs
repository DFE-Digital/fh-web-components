
namespace FamilyHubs.SharedKernel.Razor.Dashboard;

public interface ICell
{
    string? PartialName { get; }
    string? ContentAsHtml { get; }
}