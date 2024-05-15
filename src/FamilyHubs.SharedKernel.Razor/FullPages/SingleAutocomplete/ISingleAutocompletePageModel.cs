using FamilyHubs.SharedKernel.Razor.ErrorNext;

namespace FamilyHubs.SharedKernel.Razor.FullPages.SingleAutocomplete;

//public enum AutocompleteMode
//{
//    Alphabetical,
//    MatchStart
//}

public interface ISingleAutocompletePageModel
{
    /// <summary>
    /// During GET, if not null, the option with this value will be selected by default.
    /// During POST, if the concrete's implementation of this property has the [BindProperty] attribute,
    /// it'll be populated with the value of the option selected by the user.
    /// </summary>
    string? SelectedValue { get; set; }

    //todo: for differing content, do we force the user to have separate partials, or should we support token substitution?
    // if there are a few different subs needed, then this will get combinatory quickly
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
    /// The options to display in the dropdown
    /// </summary>
    IEnumerable<ISingleAutocompleteOption> Options { get; }

    IErrorState Errors { get; }
}