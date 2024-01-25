using FamilyHubs.SharedKernel.Razor.ErrorNext;
using FamilyHubs.SharedKernel.Razor.FullPages.SingleTextArea;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Collections.Immutable;

namespace FamilyHubs.Example.Pages.Examples.FullPages;

public class SingleTextAreaModel : PageModel, ISingleTextAreaPageModel
{
    public string DescriptionPartial => "/Pages/Examples/FullPages/SingleTextAreaContent.cshtml";
    public string? Label => null;

    public int TextAreaMaxLength => 500;
    public int TextAreaNumberOfRows => 10;
    public IErrorState Errors { get; set; } = ErrorState.Empty;

    [BindProperty]
    public string? TextAreaValue { get; set; }

    public void OnGet()
    {
        TextAreaValue = "Kākāpōs";
    }

    public void OnPost()
    {
        var errorId = this.CheckForErrors(ErrorId.NoAnimal, ErrorId.AnimalTooLong);
        if (errorId != null)
        {
            Errors = ErrorState.Create(PossibleErrors, errorId.Value);
        }
    }

    public enum ErrorId
    {
        NoAnimal,
        AnimalTooLong
    }

    public static readonly ImmutableDictionary<int, PossibleError> PossibleErrors =
        ImmutableDictionary.Create<int, PossibleError>()
            .Add(ErrorId.NoAnimal, "Please enter an animal")
            .Add(ErrorId.AnimalTooLong, "Animal is too long");
}
