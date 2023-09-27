
namespace FamilyHubs.SharedKernel.Razor.Filtering.Interfaces;

public interface IFilterSubGroups<TFilteringResults> : IFilter<TFilteringResults>
{
    IEnumerable<IFilter<TFilteringResults>> SubFilters { get; }
}