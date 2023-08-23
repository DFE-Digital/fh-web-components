using FamilyHubs.SharedKernel.Razor.Pagination;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace FamilyHubs.Example.Pages.Examples.Pagination;

public class LargeSetLinkPagination : LargeSetPagination, ILinkPagination
{
    public LargeSetLinkPagination(int totalPages, int currentPage)
        : base(totalPages, currentPage)
    {
    }

    public string GetUrl(int page)
    {
        // don't use page as the query param name as it's reserved by the framework
        return $"/Examples/Pagination?pageNum={page}";
    }
}

public class IndexModel : PageModel
{
    public IPagination Pagination { get; set; } = IPagination.DontShow;
    public ILinkPagination LinkPagination { get; set; } = ILinkPagination.DontShow;

    public void OnGet(int pageNum = 1)
    {
        Pagination = new LargeSetPagination(20, 1);
        LinkPagination = new LargeSetLinkPagination(20, pageNum);
    }

    public void OnPost(int pageNum)
    {
        Pagination = new LargeSetPagination(20, pageNum);
        LinkPagination = new LargeSetLinkPagination(20, 1);
    }
}