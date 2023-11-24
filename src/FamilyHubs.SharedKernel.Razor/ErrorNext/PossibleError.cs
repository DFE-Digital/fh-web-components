
namespace FamilyHubs.SharedKernel.Razor.ErrorNext;

/// <summary>
/// Represents a possible error that is displayed in the error summary and next to the input control.
/// </summary>
/// <param name="Id">The error id (usually the int representation of an enum of error types.)</param>
/// <param name="ErrorMessage">The error message that is displayed in the error summary and next to the input control.</param>
public record PossibleError(int Id, string ErrorMessage);

//todo: rename to error
public class TriggeredError
{
    private readonly PossibleError _possibleError;
    private readonly ErrorState _errorState;

    public TriggeredError(PossibleError possibleError, ErrorState errorState)
    {
        _possibleError = possibleError;
        _errorState = errorState;
    }

    //todo: does this need to be public?
    public int Id => _possibleError.Id;
    public string Message => _possibleError.ErrorMessage;
    public string HtmlElementId
    {
        get
        {
            if (_errorState.ErrorIdToHtmlElementId == null)
            {
                throw new InvalidOperationException($"ErrorIdToHtmlElementId is null. Set it on {nameof(ErrorState)}.");
            }

            return _errorState.ErrorIdToHtmlElementId(Id);
        }
    }

    //todo: tag helpers to add extra classes/aria-describedby to input element?

    /// <summary>
    /// The id of the error message HTML element that is displayed next to the input control.
    /// Will be used as the aria-describedby attribute value, when the input is in an errored state.
    /// </summary>
    public string InputErrorMessageParaId => $"{HtmlElementId}-error-message";

    public string FormGroupClass => "govuk-form-group--error";

    public string InputClass => "govuk-input--error";
    public string TextAreaClass => "govuk-textarea--error";
}