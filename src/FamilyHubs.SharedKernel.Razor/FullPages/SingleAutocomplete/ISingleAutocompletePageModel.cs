using FamilyHubs.SharedKernel.Razor.ErrorNext;
using Microsoft.AspNetCore.Html;

namespace FamilyHubs.SharedKernel.Razor.FullPages.SingleAutocomplete;

//public enum AutocompleteMode
//{
//    Alphabetical,
//    MatchStart
//}

public interface ISingleAutocompletePageModel
{
    //todo: default to a built in content that uses label?
    // label then wouldn't have to exist on ISingleAutocompletePageModel
    // would be need a new interface for the content, IContent
    //todo: could we handle elements that wrap the control? e.g. a div up top and /div down bottom
    string? ContentTop => null;
    //use something like object for complete control, a new interface or something like IDicationary<string,HtmlString>?
    // can you have an interface for a dictionary where certain values are required
    //todo: if our default ContentTop, create one of these with the label and it's value
    IReadOnlyDictionary<string, HtmlString>? ContentSubstitutions => null;

    /// <summary>
    /// During GET, if not null, the option with this value will be selected by default.
    /// During POST, if the concrete's implementation of this property has the [BindProperty] attribute,
    /// it'll be populated with the value of the option selected by the user.
    /// </summary>
    string? SelectedValue { get; set; }

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