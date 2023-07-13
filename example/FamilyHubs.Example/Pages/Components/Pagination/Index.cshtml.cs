using FamilyHubs.SharedKernel.Razor.Pagination;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace FamilyHubs.Example.Pages.Components.Pagination;

public class LargeSetLinkPagination : LargeSetPagination, ILinkPagination
{
    public LargeSetLinkPagination(int totalPages, int currentPage)
        : base(totalPages, currentPage)
    {
    }

    public string GetUrl(int page)
    {
        return $"/Components/Pagination?page={page}";
    }
}

public class IndexModel : PageModel
{
    public IPagination Pagination { get; set; } = IPagination.DontShow;
    public ILinkPagination LinkPagination { get; set; } = ILinkPagination.DontShow;

    public void OnGet(int page = 1)
    {
        Pagination = new LargeSetPagination(20, 1);
        LinkPagination = new LargeSetLinkPagination(20, page);
    }

    public void OnPost(int page)
    {
        Pagination = new LargeSetPagination(20, page);
        LinkPagination = new LargeSetLinkPagination(20, 1);
    }
}