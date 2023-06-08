using FamilyHubs.SharedKernel.Razor.Pagination;

namespace FamilyHubs.SharedKernel.Razor.Dashboard
{
    public interface IDashboard<out T>
    {
        string? TableClass { get; }
        IEnumerable<IColumnHeader> ColumnHeaders => Enumerable.Empty<IColumnHeader>();
        IEnumerable<IRow<T>> Rows => Enumerable.Empty<IRow<T>>();
        IPagination Pagination { get; set; }
    }
}
