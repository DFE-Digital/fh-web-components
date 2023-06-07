
namespace FamilyHubs.SharedKernel.Razor.Dashboard;

public class DashboardColumnHeaderFactory
{
    private readonly IEnumerable<ColumnImmutable> _columnsImmutable;
    private readonly string _sortedColumnName;
    private readonly SortOrder _sort;
    private readonly string _pagePath;

    public DashboardColumnHeaderFactory(
        IEnumerable<ColumnImmutable> columnsImmutable,
        string pagePath,
        string sortedColumnName,
        SortOrder sort)
    {
        _columnsImmutable = columnsImmutable;
        _sortedColumnName = sortedColumnName;
        _sort = sort;
        _pagePath = pagePath;
    }

    private IDashboardColumnHeader Create(ColumnImmutable columnImmutable)
    {
        //todo: here, or in ctor?

        SortOrder? sort = null;
        if (columnImmutable.SortName != null)
        {
            sort = columnImmutable.SortName == _sortedColumnName ? _sort : SortOrder.none;
        }

        return new DashboardColumnHeader(columnImmutable, sort, _pagePath);
    }

    public IDashboardColumnHeader[] CreateAll()
    {
        return _columnsImmutable.Select(Create).ToArray();
    }
}