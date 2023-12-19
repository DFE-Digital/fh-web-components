using System.Text.Json;
using FamilyHubs.SharedKernel.Razor.AddAnother;

namespace FamilyHubs.SharedKernel.Razor.UnitTests.AddAnother
{
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
    }
}
