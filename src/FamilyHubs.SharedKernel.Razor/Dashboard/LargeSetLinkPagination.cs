using FamilyHubs.SharedKernel.Razor.Pagination;

namespace FamilyHubs.SharedKernel.Razor.Dashboard;

/// <summary>
/// Creates a GDS pagination control for use when:
/// * there are a large number of pages <see href="https://design-system.service.gov.uk/components/pagination#for-larger-numbers-of-pages"/>,
/// * the page links are links (as opposed to submit buttons)
/// * the Pagination control is being used to page through a Dashboard.
/// </summary>
/// <typeparam name="TColumn"></typeparam>
public class LargeSetLinkPagination<TColumn> : LargeSetPagination, ILinkPagination
    where TColumn : struct, Enum
{
    private readonly string _dashboardPath;
    private readonly TColumn _column;
    private readonly SortOrder _sort;

    public LargeSetLinkPagination(string dashboardPath, int totalPages, int currentPage, TColumn column, SortOrder sort)
        : base(totalPages, currentPage)
    {
        _dashboardPath = dashboardPath;
        _column = column;
        _sort = sort;
    }

    public string GetUrl(int page)
    {
        return $"{_dashboardPath}?columnName={_column}&sort={_sort}&currentPage={page}";
    }
}