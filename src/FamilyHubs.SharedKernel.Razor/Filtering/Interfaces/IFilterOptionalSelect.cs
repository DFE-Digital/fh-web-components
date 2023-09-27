
namespace FamilyHubs.SharedKernel.Razor.Filtering.Interfaces;

public interface IFilterOptionalSelect<in TFilteringResults> : IFilter<TFilteringResults>
{
    const string OptionSelectedPostfix = "-option-selected";

    bool IsOptionSelected { get; }
    string OptionDescription { get; }
    string SelectDescription { get; }
    string OptionSelectedName { get; }
}
