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

    [Fact]
    public void JavascriptDisabled_NoLanguageSelected_ShouldFindFirstEmptyIndex()
    {
        // Arrange
        var form = new FormCollection(new Dictionary<string, StringValues>());

        // Act
        var result = AddAnotherAutocompleteErrorChecker.Create(form, "values", "texts",
            new List<SelectListItem> { new("a", "1"), new("c", "3") });

        // Assert
        Assert.Equal(new[] {0}, result.EmptyIndexes);
        Assert.Empty(result.InvalidIndexes);
        Assert.Empty(result.InvalidIndexes);
    }

    [Theory]
    [MemberData(nameof(JavascriptEnabled_ShouldReturnCorrectIndexes_TestData))]
    public void JavascriptEnabled_ShouldReturnCorrectIndexes(
        IEnumerable<int> expectedEmptyIndexes,
        IEnumerable<int> expectedInvalidIndexes,
        IEnumerable<IEnumerable<int>> expectedDuplicateIndexes,
        string[] texts)
    {
        // Arrange
        var form = new FormCollection(new Dictionary<string, StringValues>
        {
            // when javascript is enabled, you get the values, but they don't necessarily match the texts
            // when languages are pre-populated when editing, you get the original values, rather than those matching the texts
            { "values", new[] { "100", "101", "102" } },
            { "texts", texts }
        });

        // Act
        var result = AddAnotherAutocompleteErrorChecker.Create(form, "values", "texts",
            new List<SelectListItem>
            {
                new("a", "1"),
                new("b", "2"),
                new("c", "3")
            });

        // Assert
        Assert.Equal(expectedEmptyIndexes.ToArray(), result.EmptyIndexes.ToArray());
        Assert.Equal(expectedInvalidIndexes.ToArray(), result.InvalidIndexes.ToArray());
        //todo: compare the inner lists
        //Assert.Equal(expectedDuplicateIndexes.ToArray(), result.DuplicateIndexes.ToArray());
    }

    public static IEnumerable<object[]> JavascriptEnabled_ShouldReturnCorrectIndexes_TestData()
    {
        yield return new object[] { new[] { 0 }, Array.Empty<int>(), new List<int[]> { Array.Empty<int>() }, new[] {""} };
        yield return new object[] { new[] { 0 }, Array.Empty<int>(), new List<int[]> { Array.Empty<int>() }, new[] { "", "b", "c" } };
        yield return new object[] { new[] { 1 }, Array.Empty<int>(), new List<int[]> { Array.Empty<int>() }, new[] { "a", "", "c" } };
        yield return new object[] { new[] { 1, 3 }, Array.Empty<int>(), new List<int[]> { Array.Empty<int>() }, new[] { "a", "", "c", "" } };
        yield return new object[] { Array.Empty<int>(), new[] { 0 }, new List<int[]> { Array.Empty<int>() }, new[] { "smurf" } };
        yield return new object[] { Array.Empty<int>(), new[] { 1 }, new List<int[]> { Array.Empty<int>() }, new[] { "a", "smurf", "c" } };
        yield return new object[] { Array.Empty<int>(), Array.Empty<int>(), new List<int[]> { new[] { 0, 1 } }, new[] { "a", "a" } };
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
    }
}