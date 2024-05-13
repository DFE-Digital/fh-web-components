using FamilyHubs.SharedKernel.Razor.ErrorNext;

namespace FamilyHubs.SharedKernel.Razor.FullPages.SingleAutocomplete;

public interface ISingleAutocompleteOption
{
    string Value { get; }
    string Label { get; }
}

public interface ISingleAutocompletePageModel
{
    /// <summary>
    /// Optional separate heading. If not supplied, the heading will be the same as the <see cref="TextBoxLabel"/>.
    /// </summary>
    string? HeadingText { get; }
    string? HintText { get; }
    string TextBoxLabel { get; }
    string? TextBoxValue { get; }

    /// <summary>
    /// if not null, a blank disabled option will be shown in the dropdown with this value
    /// </summary>
    public string? DisabledOptionValue { get; }
    IEnumerable<ISingleAutocompleteOption> Options { get; }

    int? MaxLength { get; }

    IErrorState Errors { get; }
}