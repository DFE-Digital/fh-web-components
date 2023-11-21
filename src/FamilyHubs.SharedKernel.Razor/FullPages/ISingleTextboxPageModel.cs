using FamilyHubs.SharedKernel.Razor.Errors;

namespace FamilyHubs.SharedKernel.Razor.FullPages;

//todo: composable concrete?

public interface ISingleTextboxPageModel
{
    string HeadingText { get; set; }
    string? HintText { get; set; }
    string TextBoxLabel { get; set; }
    //string ErrorText { get; set; }
    string? TextBoxValue { get; set; }
    //bool HasErrors { get; }

    IErrorState Errors { get; set; }
}