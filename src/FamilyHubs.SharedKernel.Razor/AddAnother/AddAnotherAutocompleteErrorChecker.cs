using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace FamilyHubs.SharedKernel.Razor.AddAnother;

// need some good unit tests for this
public record AddAnotherAutocompleteErrorChecker(int? FirstEmptyIndex, int? FirstInvalidNameIndex, int? FirstDuplicateLanguageIndex)
{
    // this would be better as a constructor, but we can't do that until support is added to c#
    // https://github.com/dotnet/csharplang/issues/7047

    public static AddAnotherAutocompleteErrorChecker Create(
        IFormCollection form,
        string valuesFieldName,
        string textFieldName,
        IEnumerable<SelectListItem> validItems)
    {
        var values = form[valuesFieldName];
        var texts = form[textFieldName];

        var nameAndIndex = texts
            .Select((item, index) => new { Item = item, Index = index });

        int? firstEmptyIndex = null, firstInvalidNameIndex = null, firstDuplicateLanguageIndex = null;
        if (texts.Count > values.Count)
        {
            firstEmptyIndex = nameAndIndex.FirstOrDefault(element => element.Item == "")?.Index;

            var validNames = validItems.Select(o => o.Text);

            firstInvalidNameIndex =
                nameAndIndex.FirstOrDefault(x => x.Item != "" && !validNames.Contains(x.Item))?.Index;
        }

        if (values.Count > values.Distinct().Count())
        {
            firstDuplicateLanguageIndex =
                nameAndIndex
                    .GroupBy(x => x.Item)
                    .FirstOrDefault(g => g.Key != "" && g.Count() > 1)
                    ?.Skip(1).First().Index;
        }

        return new AddAnotherAutocompleteErrorChecker(firstEmptyIndex, firstInvalidNameIndex, firstDuplicateLanguageIndex);
    }
}