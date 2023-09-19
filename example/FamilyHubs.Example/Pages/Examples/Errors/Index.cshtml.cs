using FamilyHubs.SharedKernel.Razor.Errors;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Collections.Immutable;

namespace FamilyHubs.Example.Pages.Examples.Errors;

public class IndexModel : PageModel
{
    private enum ExampleErrors
    {
        Error1,
        Error2,
        Error3
    }

    public static readonly ImmutableDictionary<int, Error> PossibleErrors =
        ImmutableDictionary.Create<int, Error>()
        .Add(ExampleErrors.Error1, "field1", "Error 1 message")
        .Add(ExampleErrors.Error2, "field2", "Error 2 message")
        .Add(ExampleErrors.Error3, "field3", "Error 3 message");

    public IErrorState Errors { get; set; } = ErrorState.Empty;

    public string? Field1 { get; set; }
    public string? Field2 { get; set; }
    public string? Field3 { get; set; }

    public void OnGet()
    {
        Errors = ErrorState.Create(PossibleErrors, new[] { ExampleErrors.Error2, ExampleErrors.Error3 });
    }
}