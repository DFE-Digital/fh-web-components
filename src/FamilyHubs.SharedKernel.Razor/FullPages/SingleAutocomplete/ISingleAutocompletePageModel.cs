using FamilyHubs.SharedKernel.Razor.ErrorNext;

namespace FamilyHubs.SharedKernel.Razor.FullPages.SingleAutocomplete;

//public enum AutocompleteMode
//{
//    Alphabetical,
//    MatchStart
//}

public interface ISingleAutocompletePageModel
{
    string? SelectedValue { get; set; }

    // haven't a need for this yet
    //string? DescriptionPartial => null;

    string Label { get; }

    // haven't a need for this yet
    //string? Hint => null;

    string? ButtonText => "Continue";

    /// <summary>
    /// if not null, a blank disabled option will be shown in the dropdown with this value
    /// </summary>
    public string? DisabledOptionValue { get; }
    IEnumerable<ISingleAutocompleteOption> Options { get; }

    IErrorState Errors { get; }
}