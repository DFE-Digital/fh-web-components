using FamilyHubs.SharedKernel.Razor.Pagination;

namespace FamilyHubs.SharedKernel.Razor.Dashboard
{
    public interface IDashboard<out T>
    {
        string? TableClass { get; }
        IEnumerable<IDashboardColumnHeader> ColumnHeaders => Enumerable.Empty<IDashboardColumnHeader>();
        IEnumerable<IDashboardRow<T>> Rows => Enumerable.Empty<IDashboardRow<T>>();
        IPagination Pagination { get; set; }
    }
}
