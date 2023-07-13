
namespace FamilyHubs.SharedKernel.Razor.Pagination;

public interface ILinkPagination : IPagination
{
    new static ILinkPagination DontShow => new DontShowLinkPagination();

    string GetUrl(int page);
}