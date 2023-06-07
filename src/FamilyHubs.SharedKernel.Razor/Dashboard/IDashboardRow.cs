
namespace FamilyHubs.SharedKernel.Razor.Dashboard;

public interface IDashboardRow<out T>
{
    IEnumerable<IDashboardCell> Cells { get; }
    T Item { get; }
}