using System.Collections.Immutable;
using FamilyHubs.SharedKernel.Razor.Errors;
using FamilyHubs.SharedKernel.Razor.FullPages;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.ComponentModel.DataAnnotations;

namespace FamilyHubs.Example.Pages.Examples.FullPages;

/// <summary>
/// Simple example, not production ready, no P/R/G, loading existing value, retaining value etc.
/// </summary>
public class SingleTextboxModel : PageModel, ISingleTextboxPageModel
{
    public string HeadingText { get; set; } = "What is the answer to life, the universe, and everything?";
    public string? HintText { get; set; } = "It's the ultimate question";
    public string TextBoxLabel { get; set; } = "Answer";
    public IErrorState Errors { get; set; } = ErrorState.Empty;

    [Required]
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

    //todo: helper, so that consumers don't need to fish out the textbox id
    //todo: combine with passing the field in the view, so view details don't leak into the model
    public static readonly ImmutableDictionary<int, Error> PossibleErrors =
        ImmutableDictionary.Create<int, Error>()
            .Add(ErrorId.AnswerMissing, "textbox", "Guru meditation required")
            .Add(ErrorId.AnswerTooLong, "textbox", "The answer is too long");
}