using System.Collections.Immutable;
using FamilyHubs.SharedKernel.Razor.ErrorNext;
using FamilyHubs.SharedKernel.Razor.FullPages;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace FamilyHubs.Example.Pages.Examples.FullPages;

/// <summary>
/// Simple example, not production ready, no P/R/G, loading existing value, retaining value etc.
/// </summary>
public class SingleTextboxModel : PageModel, ISingleTextboxPageModel
{
    public string? HeadingText => default;
    public string? HintText => default;
    public string TextBoxLabel => "What is the service name?";
    public IErrorState Errors { get; private set; } = ErrorState.Empty;

    [BindProperty]
    public string? TextBoxValue { get; set; }

    public void OnGet()
    {
    }

    public void OnPost()
    {
        if (string.IsNullOrWhiteSpace(TextBoxValue))
        {
            Errors = ErrorState.Create(PossibleErrors, new[] { ErrorId.AnswerMissing });
        }
    }

    public enum ErrorId
    {
        AnswerMissing,
        AnswerTooLong
    }

    public static readonly ImmutableDictionary<int, Error> PossibleErrors =
        ImmutableDictionary.Create<int, Error>()
            .Add(ErrorId.AnswerMissing, "Guru meditation required")
            .Add(ErrorId.AnswerTooLong, "The answer is too long");
}