﻿using FamilyHubs.SharedKernel.Razor.FamilyHubsUi.Options.Configure;
using FamilyHubs.SharedKernel.Razor.UnitTests.FamilyHubsUi.Configure.Helpers;
using FluentAssertions;
using Microsoft.Extensions.Options;

namespace FamilyHubs.SharedKernel.Razor.UnitTests.FamilyHubsUi.Configure;

public class FamilyHubsUiOptionsValidationTests : FamilyHubsUiOptionsTestBase
{
    public FamilyHubsUiOptionsValidation FamilyHubsUiOptionsValidation { get; set; }

    public FamilyHubsUiOptionsValidationTests()
    {
        FamilyHubsUiOptionsValidation = new FamilyHubsUiOptionsValidation();
    }

    [Fact]
    public void Validate_NoValidationErrorsTest()
    {
        // act
        var result = FamilyHubsUiOptionsValidation.Validate(null, FamilyHubsUiOptions);

        Assert.Equal(ValidateOptionsResult.Success, result);
    }

    [Theory]
    [InlineData(null)]
    [InlineData("h ttp://example.com")]
    [InlineData("http://example.com:x")]
    public void Validate_ValidationErrorsTest(string? url)
    {
        var link = FamilyHubsUiOptions.Footer.Links[0];
        link.Url = url;

        var expectedResult =
            ValidateOptionsResult.Fail($"Footer link for \"{link.Text}\" has invalid Url \"{url}\"");

        // act
        var result = FamilyHubsUiOptionsValidation.Validate(null, FamilyHubsUiOptions);

        result.Should().BeEquivalentTo(expectedResult);
    }

    [Theory]
    [InlineData("")]
    [InlineData("/")]
    [InlineData("path")]
    [InlineData("/path")]
    [InlineData("/longer/path")]
    [InlineData("http://example.com")]
    [InlineData("http://example.com:123")]
    [InlineData("http://example.com:123/long/path")]
    [InlineData("http://example.com:123/long/path?param=value")]
    [InlineData("http://example.com:123/long/path?param=value#fragment")]
    public void Validate_ValidUrlsValidateOkTest(string? url)
    {
        var link = FamilyHubsUiOptions.Footer.Links[0];
        link.Url = url;

        // act
        var result = FamilyHubsUiOptionsValidation.Validate(null, FamilyHubsUiOptions);

        Assert.Equal(ValidateOptionsResult.Success, result);
    }
}