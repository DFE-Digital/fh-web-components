
namespace FamilyHubs.SharedKernel.Razor.Dashboard;

internal class ColumnHeader : IColumnHeader
{
    private readonly ColumnImmutable _columnImmutable;
    private readonly string _pagePath;

    public ColumnHeader(ColumnImmutable columnImmutable, SortOrder? sort, string pagePath)
    {
        Sort = sort;
        _columnImmutable = columnImmutable;
        _pagePath = pagePath;
    }

    public string ContentAsHtml
    {
        get
        {
            if (Sort == null)
            {
                return _columnImmutable.DisplayName;
            }

            SortOrder clickSort = Sort switch
            {
                SortOrder.ascending => SortOrder.descending,
                _ => SortOrder.ascending
            };

            return $"<a href = \"{_pagePath}?columnName={_columnImmutable.SortName}&sort={clickSort}\">{_columnImmutable.DisplayName}</a>";
        }
    }

    public SortOrder? Sort { get; }
}