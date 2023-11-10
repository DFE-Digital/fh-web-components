using FamilyHubs.SharedKernel.Razor.Dashboard;
using FamilyHubs.SharedKernel.Razor.Pagination;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace FamilyHubs.Example.Pages.Examples.Dashboard;

public class PaginatedDashboardModel : PageModel, IDashboard<RowData>
{
    private enum Column
    {
        SortableColumn1,
        NoSort,
        SortableColumn2
    }

    private static ColumnImmutable[] _columnImmutables =
    {
        new("Sortable column 1", Column.SortableColumn1.ToString()),
        new("No sort"),
        new("Sortable column 2", Column.SortableColumn2.ToString(), Align.Right)
    };

    private IEnumerable<IColumnHeader> _columnHeaders = Enumerable.Empty<IColumnHeader>();
    private IEnumerable<IRow<RowData>> _rows = Enumerable.Empty<IRow<RowData>>();

    IEnumerable<IColumnHeader> IDashboard<RowData>.ColumnHeaders => _columnHeaders;
    IEnumerable<IRow<RowData>> IDashboard<RowData>.Rows => _rows;

    public IPagination Pagination { get; set; } = ILinkPagination.DontShow;

    public void OnGet(string? columnName, SortOrder sort, int currentPage = 1)
    {
        if (columnName == null || !Enum.TryParse(columnName, true, out Column column))
        {
            // default when first load the page, or user has manually changed the url
            column = Column.SortableColumn1;
            sort = SortOrder.ascending;
        }

        // only needed if e.g. the dashboard is showing content as decided by filters
        const string extraSearchTerms = "filter1=xyz&filter2=123";

        _columnHeaders = new ColumnHeaderFactory(_columnImmutables, "/Examples/Dashboard/PaginatedDashboard", column.ToString(), sort, extraSearchTerms)
            .CreateAll();

        const int pageSize = 10;
        _rows = GetSortedRows(column, sort, currentPage, pageSize);

        Pagination = new LargeSetLinkPagination<Column>(
            "/Examples/Dashboard/PaginatedDashboard",
            10, currentPage, column, sort, extraSearchTerms);
    }

    string? IDashboard<RowData>.TableClass => "app-dashboard-class";

    private IEnumerable<Row> GetSortedRows(Column column, SortOrder sort, int page, int pageSize)
    {
        if (sort == SortOrder.ascending)
        {
            return GetExampleData(page, pageSize).OrderBy(r => GetValue(column, r));
        }

        return GetExampleData(page, pageSize).OrderByDescending(r => GetValue(column, r));
    }

    private static string GetValue(Column column, Row r)
    {
        return column switch
        {
            Column.SortableColumn1 => r.Item.Foo,
            Column.SortableColumn2 => r.Item.Bar,
            _ => throw new InvalidOperationException($"Unknown column: {column}")
        };
    }

    private Row[] GetExampleData(int page, int pageSize)
    {
        return Enumerable.Range(1,100).Skip((page-1) * pageSize).Take(pageSize)
            .Select(i => new Row(new RowData($"foo {i:D3}", $"bar {i:D3}"))).ToArray();
    }
}