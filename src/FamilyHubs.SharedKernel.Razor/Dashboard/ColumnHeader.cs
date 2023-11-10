
namespace FamilyHubs.SharedKernel.Razor.Dashboard;

internal class ColumnHeader : IColumnHeader
{
    private readonly ColumnImmutable _columnImmutable;
    private readonly string _pagePath;
    private readonly string? _extraQueryParams;

    public ColumnHeader(
        ColumnImmutable columnImmutable,
        SortOrder? sort,
        string pagePath,
        IReadOnlyDictionary<string, string> extraQueryParams)
    : this(columnImmutable, sort, pagePath,
        string.Join('&', extraQueryParams.Select(kvp => $"{kvp.Key}={kvp.Value}")))
    {
    }

    public ColumnHeader(
        ColumnImmutable columnImmutable,
        SortOrder? sort,
        string pagePath,
        string? extraQueryParams = null)
    {
        Sort = sort;
        _columnImmutable = columnImmutable;
        _pagePath = pagePath;
        Classes = _columnImmutable.Align switch
        {
            //todo: mix in numeric into new class
            Align.Right => "govuk-table__header--numeric",
            _ => null
        };
        _extraQueryParams = extraQueryParams;
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

            string url = $"<a href = \"{_pagePath}?columnName={_columnImmutable.SortName}&sort={clickSort}\">{_columnImmutable.DisplayName}</a>";

            return _extraQueryParams != null ? $"{url}&{_extraQueryParams}" : url;
        }
    }

    public SortOrder? Sort { get; }

    public string? Classes { get; }
}
