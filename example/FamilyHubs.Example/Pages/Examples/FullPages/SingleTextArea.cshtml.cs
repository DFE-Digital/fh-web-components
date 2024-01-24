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
        TextAreaValue = "Kākāpōs";
    }

    public void OnPost()
    {
        var errorId = CheckForErrors(ErrorId.NoAnimal, ErrorId.AnimalTooLong);
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
            .Add(ErrorId.AnimalTooLong, "Animal is too long")
        ;

    //todo: package for reuse using composition
    public TErrorId? CheckForErrors<TErrorId>(TErrorId emptyErrorId, TErrorId tooLongErrorId)
        where TErrorId : struct, Enum
    {
        if (string.IsNullOrEmpty(TextAreaValue))
        {
            return emptyErrorId;
        }

        // workaround the front end counting line endings as 1 chars (\n) as per HTML spec,
        // and the http transport/.net/windows using 2 chars for line ends (\r\n)
        if (TextAreaValue.Replace("\r", "").Length > TextAreaMaxLength)
        {
            return tooLongErrorId;
        }

        return default;
    }
}