﻿
namespace FamilyHubs.SharedKernel.Razor.Pagination;

//todo: IPaginationItem?

public class PaginationItem
{
    public int? Page { get; }
    public bool IsCurrentPage { get; }

    // skip (ellipses)
    public PaginationItem()
    {
    }

    public PaginationItem(int page, bool isCurrentPage)
    {
        Page = page;
        IsCurrentPage = isCurrentPage;
    }

    public bool ShowSkippedPages => Page == null;
}