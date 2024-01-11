using System.Text.Json;
using FamilyHubs.SharedKernel.Razor.AddAnother;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.Extensions.Primitives;

namespace FamilyHubs.SharedKernel.Razor.UnitTests.AddAnother;

public class AddAnotherAutocompleteErrorCheckerTests
{
    [Fact]
    public void ShouldBeRoundTripSerializableTest()
    {
        // Arrange
        var original = new AddAnotherAutocompleteErrorChecker(
            Enumerable.Range(1, 3),
            Enumerable.Range(10, 2),
            Enumerable.Repeat(Enumerable.Range(1, 3), 2));

        // Act
        string serialized = JsonSerializer.Serialize(original);
        var deserialized = JsonSerializer.Deserialize<AddAnotherAutocompleteErrorChecker>(serialized);

        // Assert
        Assert.NotNull(deserialized);
        Assert.Equal(original.EmptyIndexes, deserialized.EmptyIndexes);
        Assert.Equal(original.EmptyIndexes, deserialized.EmptyIndexes);
        //todo: compare the inner lists
        Assert.Equal(original.DuplicateIndexes, deserialized.DuplicateIndexes);
    }

    //[Fact]
    //public void ShouldBeRoundTripSerializableTestWithNulls()
    //{
    //    // Arrange
    //    var original = new AddAnotherAutocompleteErrorChecker(null, null, null);

    //    // Act
    //    string serialized = JsonSerializer.Serialize(original);
    //    var deserialized = JsonSerializer.Deserialize<AddAnotherAutocompleteErrorChecker>(serialized);

    //    // Assert
    //    Assert.NotNull(deserialized);
    //    Assert.Equal(original.FirstDuplicateLanguageIndex, deserialized.FirstDuplicateLanguageIndex);
    //    Assert.Equal(original.FirstEmptyIndex, deserialized.FirstEmptyIndex);
    //    Assert.Equal(original.FirstInvalidNameIndex, deserialized.FirstInvalidNameIndex);
    //}

    //[Theory]
    //[InlineData(0, null, null)]
    //public void JavascriptDisabled_NoLanguageSelected_ShouldFindFirstEmptyIndex(int? expectedFirstEmptyIndex, int? expectedFirstInvalidNameIndex, int? expectedFirstDuplicateLanguageIndex, params string[] values)
    //{
    //    // Arrange
    //    var form = new FormCollection(new Dictionary<string, StringValues>());

    //    // Act
    //    var result = AddAnotherAutocompleteErrorChecker.Create(form, "values", "texts",
    //        new List<SelectListItem> { new("a", "1"), new("c", "3") });

    //    // Assert
    //    Assert.Equal(expectedFirstEmptyIndex, result.FirstEmptyIndex);
    //    Assert.Equal(expectedFirstInvalidNameIndex, result.FirstInvalidNameIndex);
    //    Assert.Equal(expectedFirstDuplicateLanguageIndex, result.FirstDuplicateLanguageIndex);
    //}

    //[Theory]
    //[InlineData(0, null, null, "")]
    //[InlineData(0, null, null, "", "b", "c")]
    //[InlineData(1, null, null, "a", "", "c")]
    //[InlineData(1, null, null, "a", "", "c", "")]
    //[InlineData(null, 0, null, "smurf")]
    //[InlineData(null, 1, null, "a", "smurf", "c")]
    //[InlineData(null, null, 0, "a", "a")]
    //[InlineData(null, null, 1, "b", "a", "a", "c")]
    //[InlineData(null, null, 0, "a", "b", "c", "a")]
    //[InlineData(1, 3, null, "b", "", "a", "smurf")]
    //[InlineData(1, 2, null, "b", "", "klingon", "a", "", "smurf")]
    //[InlineData(3, null, 1, "b", "a", "a", "")]
    //[InlineData(1, null, 0, "a", "", "a")]
    //[InlineData(null, 2, 0, "a", "b", "womble", "a")]
    //[InlineData(null, 2, 1, "a", "b", "womble", "b")]
    //[InlineData(2, 3, 1, "a", "b", "", "womble", "b")]
    //[InlineData(2, 3, 0, "a", "b", "", "womble", "b", "a")]
    //[InlineData(0, 6, 1, "", "a", "b", "c", "a", "c", "womble", "b", "a")]
    //public void JavascriptEnabled_ShouldReturnCorrectIndexes(int? expectedFirstEmptyIndex, int? expectedFirstInvalidNameIndex, int? expectedFirstDuplicateLanguageIndex, params string[] texts)
    //{
    //    // Arrange
    //    var form = new FormCollection(new Dictionary<string, StringValues>
    //    {
    //        // when javascript is enabled, you get the values, but they don't necessarily match the texts
    //        // when languages are pre-populated when editing, you get the original values, rather than those matching the texts
    //        { "values", new[] { "100", "101", "102" } },
    //        { "texts", texts }
    //    });

    //    // Act
    //    var result = AddAnotherAutocompleteErrorChecker.Create(form, "values", "texts",
    //        new List<SelectListItem>
    //        {
    //            new("a", "1"),
    //            new("b", "2"),
    //            new("c", "3")
    //        });

    //    // Assert
    //    Assert.Equal(expectedFirstEmptyIndex, result.FirstEmptyIndex);
    //    Assert.Equal(expectedFirstInvalidNameIndex, result.FirstInvalidNameIndex);
    //    Assert.Equal(expectedFirstDuplicateLanguageIndex, result.FirstDuplicateLanguageIndex);
    //}
}