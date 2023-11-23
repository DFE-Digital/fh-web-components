namespace FamilyHubs.SharedKernel.Razor.ErrorNext;

//todo: name
/// <summary>
/// Represents an error that is displayed in the error summary and next to the input control.
/// </summary>
/// <param name="Id">The error id (usually an enum of error types.)</param>
/// <param name="ErrorMessage">The error message that is displayed in the error summary and next to the input control.</param>
public record Error(int Id, string ErrorMessage)
{
    //todo: tag helpers to add extra classes/aria-describedby to input element

    /// <summary>
    /// The id of the error message element that is displayed next to the input control.
    /// Will be used as the aria-describedby attribute value, when the input is in an error state.
    /// </summary>
    public string InputErrorMessageParaId(string htmlElementId) => $"{htmlElementId}-error-message";

    public string FormGroupClass => "govuk-form-group--error";

    public string InputClass => "govuk-input--error";
    public string TextAreaClass => "govuk-textarea--error";
}