
namespace FamilyHubs.SharedKernel.Razor.Dashboard;

public interface IRow<out T>
{
    IEnumerable<ICell> Cells { get; }
    T Item { get; }
}