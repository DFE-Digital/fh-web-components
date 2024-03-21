
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using System.Linq.Expressions;

namespace FamilyHubs.SharedKernel.Razor.ErrorNext;

public class Error
{
    private readonly PossibleError _possibleError;
    private readonly ErrorState _errorState;

    //todo: pass something to ErrorIdToHtmlElementId (as well as errorid), so that can use the same expression as 'for' to get the id, to make refactoring better
    // https://github.com/dotnet/aspnetcore/blob/main/src/Mvc/Mvc.ViewFeatures/src/DefaultHtmlGenerator.cs#L360

    //public static string GenerateIdFromExpression<TModel, TProperty>(IModelExpressionProvider modelExpressionProvider, TModel model, Expression<Func<TModel, TProperty>> expression)
    //{
    //    var modelExpression = modelExpressionProvider.CreateModelExpression(new ViewDataDictionary<TModel>(new EmptyModelMetadataProvider(), new ModelStateDictionary()), expression);
    //    var id = TagBuilder.CreateSanitizedId(modelExpression.Name, "_");
    //    return id;
    //}

    //public static string GenerateIdFromExpression<TModel, TProperty>(Expression<Func<TModel, TProperty>> expression)
    //{
    //    var expressionText = Microsoft.AspNetCore.Mvc.ViewFeatures.ExpressionHelper.GetExpressionText(expression);
    //    var id = TagBuilder.CreateSanitizedId(expressionText, "_");
    //    return id;
    //}

    //static Error()
    //{
    //    var viewContext = new Microsoft.AspNetCore.Mvc.Rendering.ViewContext();
    //    var modelExpressionProvider = new Microsoft.AspNetCore.Mvc.ViewFeatures.DefaultModelExpressionProvider(new Microsoft.AspNetCore.Mvc.ModelBinding.EmptyModelMetadataProvider());
    //    var modelExpression = modelExpressionProvider.CreateModelExpression(viewContext, m => m.Person.Name);
    //    var id = HtmlGenerator.GenerateId(viewContext, modelExpression, null);

    //    Microsoft.AspNetCore.Mvc.ViewFeatures.DefaultHtmlGenerator.GenerateId(viewContext, modelExpression, null);
    //}

    public Error(PossibleError possibleError, ErrorState errorState)
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
    public string SelectClass => "govuk-select--error";
}