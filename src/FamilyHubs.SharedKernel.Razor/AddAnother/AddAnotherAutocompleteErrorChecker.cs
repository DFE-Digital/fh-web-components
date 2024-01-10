using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace FamilyHubs.SharedKernel.Razor.AddAnother;

//todo: better names, i.e. don't assume language (or name) use value instead?
//todo: need to store all empty, invalid and all(?) first(?) duplicate indexes
public record AddAnotherAutocompleteErrorChecker(int? FirstEmptyIndex, int? FirstInvalidNameIndex, int? FirstDuplicateLanguageIndex)
{
    // this would be better as a constructor, but we can't do that until support is added to c#
    // https://github.com/dotnet/csharplang/issues/7047

    public static AddAnotherAutocompleteErrorChecker Create(
        IFormCollection form,
        string valuesFieldName,
        string textFieldName,
        //todo: just pass the valid texts
        //todo: pass the empty value too
        IEnumerable<SelectListItem> validItems)
    {
        // when js is disables, we won't get the texts, just the values
        if (form.ContainsKey(textFieldName))
        {
            // javascript is enabled, we need to work with the texts
            var texts = form[textFieldName];

            var nameAndIndex = texts
                .Select((item, index) => new { Item = item, Index = index });

            int? firstEmptyIndex = nameAndIndex.FirstOrDefault(element => element.Item == "")?.Index;

            var validNames = validItems.Select(o => o.Text);

            int? firstInvalidNameIndex =
                nameAndIndex.FirstOrDefault(x => x.Item != "" && !validNames.Contains(x.Item))?.Index;

            int? firstDuplicateLanguageIndex = nameAndIndex
                .GroupBy(x => x.Item)
                .FirstOrDefault(g => g.Key != "" && validNames.Contains(g.Key) && g.Count() > 1)
                ?.First().Index;

            return new AddAnotherAutocompleteErrorChecker(firstEmptyIndex, firstInvalidNameIndex, firstDuplicateLanguageIndex);
        }
        else
        {
            // javascript is disabled, we need to work with the values
            if (!form.ContainsKey(valuesFieldName))
            {
                // we don't have any values, which means we have a single select with no value selected
                return new AddAnotherAutocompleteErrorChecker(0, null, null);
            }

            var values = form[valuesFieldName];

            var valuesAndIndex = values
                .Select((item, index) => new { Item = item, Index = index });

            int? firstEmptyIndex = valuesAndIndex.FirstOrDefault(element => element.Item == "")?.Index;

            int? firstDuplicateLanguageIndex = null;
            if (values.Count > values.Distinct().Count())
            {
                firstDuplicateLanguageIndex =
                    valuesAndIndex
                        .GroupBy(x => x.Item)
                        .FirstOrDefault(g => g.Key != "" && g.Count() > 1)
                        ?.Skip(1).First().Index;
            }

            return new AddAnotherAutocompleteErrorChecker(firstEmptyIndex, null, firstDuplicateLanguageIndex);
        }
    }
}