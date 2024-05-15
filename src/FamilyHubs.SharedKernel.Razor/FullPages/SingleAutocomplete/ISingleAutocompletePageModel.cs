using FamilyHubs.SharedKernel.Razor.ErrorNext;

namespace FamilyHubs.SharedKernel.Razor.FullPages.SingleAutocomplete;

//public enum AutocompleteMode
//{
//    Alphabetical,
//    MatchStart
//}

public interface ISingleAutocompletePageModel
{
    //todo: have separate SelectedOptionValue or reuse this??

    /// <summary>
    /// The value of the selected option in the dropdown
    /// </summary>
    string? SelectedValue { get; set; }

    // haven't a need for this yet
    //string? DescriptionPartial => null;

    /// <summary>
    /// The label (and screen title) to display above the dropdown
    /// </summary>
    string Label { get; }

    // haven't a need for this yet
    //string? Hint => null;

    string? ButtonText => "Continue";

    /// <summary>
    /// if not null, a blank disabled option will be shown in the dropdown with this value
    /// </summary>
    public string? DisabledOptionValue { get; }

    /// <summary>
    /// if not null, the option with this value will be selected by default
    /// </summary>
    //public string? SelectedOptionValue { get; }

    /// <summary>
    /// The options to display in the dropdown
    /// </summary>
    IEnumerable<ISingleAutocompleteOption> Options { get; }

    IErrorState Errors { get; }
}