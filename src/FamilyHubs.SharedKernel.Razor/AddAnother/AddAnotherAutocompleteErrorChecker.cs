using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace FamilyHubs.SharedKernel.Razor.AddAnother;

// need some good unit tests for this
public class AddAnotherAutocompleteErrorChecker
{
    public int? FirstEmptyIndex { get; }
    public int? FirstInvalidNameIndex { get; }
    public int? FirstDuplicateLanguageIndex { get; }

    public AddAnotherAutocompleteErrorChecker(
        IFormCollection form,
        string valuesFieldName,
        string textFieldName,
        IEnumerable<SelectListItem> validItems)
    {
        var values = form[valuesFieldName];
        var texts = form[textFieldName];

        var nameAndIndex = texts
            .Select((item, index) => new { Item = item, Index = index });

        if (texts.Count > values.Count)
        {
            FirstEmptyIndex = nameAndIndex.FirstOrDefault(element => element.Item == "")?.Index;

            var validNames = validItems.Select(o => o.Text);

            //todo: validNames contains "", so do we need to special case that?

            FirstInvalidNameIndex =
                nameAndIndex.FirstOrDefault(x => x.Item != "" && !validNames.Contains(x.Item))?.Index;
        }

        if (values.Count > values.Distinct().Count())
        {
            //todo: check codes, rather than names??
            FirstDuplicateLanguageIndex =
                nameAndIndex
                    .GroupBy(x => x.Item)
                    .FirstOrDefault(g => g.Key != "" && g.Count() > 1)
                    ?.Skip(1).First().Index;
        }
    }
}