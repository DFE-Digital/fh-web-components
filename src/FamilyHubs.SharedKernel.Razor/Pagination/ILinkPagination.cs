
namespace FamilyHubs.SharedKernel.Razor.Pagination;

public interface ILinkPagination : IPagination
{
    string GetUrl(int page);
}