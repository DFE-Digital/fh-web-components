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
        var original = new AddAnotherAutocompleteErrorChecker(1, 2, 3);

        // Act
        string serialized = JsonSerializer.Serialize(original);
        var deserialized = JsonSerializer.Deserialize<AddAnotherAutocompleteErrorChecker>(serialized);

        // Assert
        Assert.NotNull(deserialized);
        Assert.Equal(original.FirstDuplicateLanguageIndex, deserialized.FirstDuplicateLanguageIndex);
        Assert.Equal(original.FirstEmptyIndex, deserialized.FirstEmptyIndex);
        Assert.Equal(original.FirstInvalidNameIndex, deserialized.FirstInvalidNameIndex);
    }

    [Fact]
    public void ShouldBeRoundTripSerializableTestWithNulls()
    {
        // Arrange
        var original = new AddAnotherAutocompleteErrorChecker(null, null, null);

        // Act
        string serialized = JsonSerializer.Serialize(original);
        var deserialized = JsonSerializer.Deserialize<AddAnotherAutocompleteErrorChecker>(serialized);

        // Assert
        Assert.NotNull(deserialized);
        Assert.Equal(original.FirstDuplicateLanguageIndex, deserialized.FirstDuplicateLanguageIndex);
        Assert.Equal(original.FirstEmptyIndex, deserialized.FirstEmptyIndex);
        Assert.Equal(original.FirstInvalidNameIndex, deserialized.FirstInvalidNameIndex);
    }

    [Theory]
    [InlineData("1", "", "3")]
    public void JavascriptDisabled_ShouldFindFirstEmptyIndex(params string[] values)
    {
        // Arrange
        var form = new FormCollection(new Dictionary<string, StringValues>
        {
            { "values", values }
        });

        // Act
        var result = AddAnotherAutocompleteErrorChecker.Create(form, "values", "texts",
                       new List<SelectListItem> { new("a", "1"), new("c", "3") });

        // Assert
        Assert.Equal(1, result.FirstEmptyIndex);
        Assert.Null(result.FirstInvalidNameIndex);
        Assert.Null(result.FirstDuplicateLanguageIndex);
    }

    [Fact]
    public void JavascriptEnabled_ShouldFindFirstEmptyIndex()
    {
        // Arrange
        var form = new FormCollection(new Dictionary<string, StringValues>
        {
            { "values", new[] { "1", "2", "3" } },
            { "texts", new[] { "a", "", "c" } }
        });

        // Act
        var result = AddAnotherAutocompleteErrorChecker.Create(form, "values", "texts",
            new List<SelectListItem> {new("a", "1"), new("c", "3")});

        // Assert
        Assert.Equal(1, result.FirstEmptyIndex);
        Assert.Null(result.FirstInvalidNameIndex);
        Assert.Null(result.FirstDuplicateLanguageIndex);
    }
}