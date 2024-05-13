using FamilyHubs.SharedKernel.Razor.ErrorNext;
using FamilyHubs.SharedKernel.Razor.FullPages.SingleAutocomplete;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Collections.Immutable;

namespace FamilyHubs.Example.Pages.Examples.FullPages.SingleAutocomplete;

public record Dto(long Id, string Name);

public class SingleAutocompleteOption : ISingleAutocompleteOption
{
    public SingleAutocompleteOption(string value, string label)
    {
        Value = value;
        Label = label;
    }

    public string Value { get; }
    public string Label { get; }
}

// better to just Select(x => new SingleAutocompleteOption(x.Id.ToString(), x.Name)) in the constructor?

//public class ExampleOptions : IEnumerable<ISingleAutocompleteOption>
//{
//    private readonly IEnumerable<Dto> _dtos;

//    public ExampleOptions(IEnumerable<Dto> dtos)
//    {
//        _dtos = dtos;
//    }

//    public IEnumerator<ISingleAutocompleteOption> GetEnumerator()
//    {
//        foreach (var dto in _dtos)
//        {
//            yield return new SingleAutocompleteOption(dto.Id.ToString(), dto.Name);
//        }
//    }
//}

public class SingleAutocompleteModel : PageModel, ISingleAutocompletePageModel
{
    //todo: can a concrete inherit an attribute from the interface?
    [BindProperty]
    public string? SelectedValue { get; }
    public string Label => "Search and select the local authority area this service is in";
    public string? DisabledOptionValue => (-1).ToString();
    public IEnumerable<ISingleAutocompleteOption> Options { get; private set; } = Enumerable.Empty<ISingleAutocompleteOption>();
    public IErrorState Errors { get; private set; } = ErrorState.Empty;

    private static readonly IEnumerable<Dto> Dtos = new Dto[]
    {
        new(1, "First"),
        new(2, "Second"),
        new(3, "Third"),
    };

    public void OnGet()
    {
        Options = Dtos.Select(x => new SingleAutocompleteOption(x.Id.ToString(), x.Name));
    }

    public void OnPost()
    {
        if (SelectedValue == null)
        {
            Errors = ErrorState.Create(PossibleErrors, ErrorId.NothingSelected);
            return;
        }
    }

    public enum ErrorId
    {
        NothingSelected
    }

    public static readonly ImmutableDictionary<int, PossibleError> PossibleErrors =
        ImmutableDictionary.Create<int, PossibleError>()
            .Add(ErrorId.NothingSelected, "Nothing selected");
}