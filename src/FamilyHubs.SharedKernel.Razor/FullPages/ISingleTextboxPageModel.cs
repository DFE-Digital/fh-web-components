using FamilyHubs.SharedKernel.Razor.Errors;

namespace FamilyHubs.SharedKernel.Razor.FullPages;

//todo: composable concrete?

public interface ISingleTextboxPageModel
{
    /// <summary>
    /// Optional separate heading. If not supplied, the heading will be the same as the <see cref="TextBoxLabel"/>.
    /// </summary>
    string? HeadingText { get; set; }
    string? HintText { get; set; }
    string TextBoxLabel { get; set; }
    string? TextBoxValue { get; set; }

    IErrorState Errors { get; set; }
}