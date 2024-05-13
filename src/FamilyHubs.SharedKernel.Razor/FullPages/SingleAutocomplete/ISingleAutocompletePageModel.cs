using FamilyHubs.SharedKernel.Razor.ErrorNext;

namespace FamilyHubs.SharedKernel.Razor.FullPages.SingleAutocomplete;

public interface ISingleAutocompleteOption
{
    string Value { get; }
    string Label { get; }
}

public interface ISingleAutocompletePageModel
{
    string? SelectedValue { get; }

    string? DescriptionPartial => null;

    string? Legend { get; }

    string? Hint => null;
    string TextBoxLabel { get; }

    string? ButtonText => "Continue";

    /// <summary>
    /// if not null, a blank disabled option will be shown in the dropdown with this value
    /// </summary>
    public string? DisabledOptionValue { get; }
    IEnumerable<ISingleAutocompleteOption> Options { get; }

    int? MaxLength { get; }

    IErrorState Errors { get; }
}