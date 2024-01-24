using FamilyHubs.SharedKernel.Razor.ErrorNext;
using FamilyHubs.SharedKernel.Razor.FullPages;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Collections.Immutable;

namespace FamilyHubs.Example.Pages.Examples.FullPages;

public class SingleTextAreaModel : PageModel, ISingleTextAreaPageModel
{
    public string DescriptionPartial => "/Pages/Examples/FullPages/SingleTextAreaContent.cshtml";
    public int TextAreaMaxLength => 500;
    public int TextAreaNumberOfRows => 10;
    public IErrorState Errors { get; set; } = ErrorState.Empty;

    [BindProperty]
    public string? TextAreaValue { get; set; }

    public void OnGet()
    {
        TextAreaValue = "Original value";
    }

    public void OnPost()
    {
        if (string.IsNullOrWhiteSpace(TextAreaValue))
        {
            Errors = ErrorState.Create(PossibleErrors, ErrorId.AnswerMissing);
        }
    }

    public enum ErrorId
    {
        AnswerMissing
    }

    public static readonly ImmutableDictionary<int, PossibleError> PossibleErrors =
        ImmutableDictionary.Create<int, PossibleError>()
            .Add(ErrorId.AnswerMissing, "Guru meditation required");
}