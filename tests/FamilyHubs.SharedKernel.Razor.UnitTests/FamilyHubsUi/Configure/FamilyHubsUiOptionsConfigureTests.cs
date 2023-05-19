﻿using Microsoft.Extensions.Configuration;
using Moq;
using System.Text.Json;
using FamilyHubs.SharedKernel.Razor.FamilyHubsUi.Options.Configure;
using FamilyHubs.SharedKernel.Razor.UnitTests.FamilyHubsUi.Configure.Helpers;
using FluentAssertions;

namespace FamilyHubs.SharedKernel.Razor.UnitTests.FamilyHubsUi.Configure;

public class FamilyHubsUiOptionsConfigureTests : FamilyHubsUiOptionsTestBase
{
    public FamilyHubsUiOptionsConfigure FamilyHubsUiOptionsConfigure { get; set; }
    public Mock<IConfiguration> Configuration { get; set; }

    public FamilyHubsUiOptionsConfigureTests()
    {
        Configuration = new Mock<IConfiguration>();
        FamilyHubsUiOptionsConfigure = new FamilyHubsUiOptionsConfigure(Configuration.Object);
    }

    [Fact]
    public void Configure_NoMutationTest()
    {
        var expectedFamilyHubsUiOptions = DeepClone(FamilyHubsUiOptions);

        // act
        FamilyHubsUiOptionsConfigure.Configure(FamilyHubsUiOptions);

        FamilyHubsUiOptions.Should().BeEquivalentTo(expectedFamilyHubsUiOptions);
    }

    [Theory]
    [InlineData("/lower", "lower")]
    [InlineData("/mix", "MiX")]
    [InlineData("/upper", "UPPER")]
    [InlineData("/multi-word", "Multi word")]
    [InlineData("/-x--y-z", " X  y z")]
    public void Configure_GeneratedHeaderUrlTests(string expectedUrl, string text)
    {
        var link = FamilyHubsUiOptions.Header.Links.First();
        link.Url = null;
        link.Text = text;

        // act
        FamilyHubsUiOptionsConfigure.Configure(FamilyHubsUiOptions);

        var actualLink = FamilyHubsUiOptions.Header.Links.FirstOrDefault();
        Assert.NotNull(actualLink);
        Assert.Equal(expectedUrl, actualLink.Url);
    }

    [Theory]
    [InlineData("/lower", "lower")]
    [InlineData("/mix", "MiX")]
    [InlineData("/upper", "UPPER")]
    [InlineData("/multi-word", "Multi word")]
    [InlineData("/-x--y-z", " X  y z")]
    public void Configure_GeneratedFooterUrlTests(string expectedUrl, string text)
    {
        var link = FamilyHubsUiOptions.Footer.Links.First();
        link.Url = null;
        link.Text = text;

        // act
        FamilyHubsUiOptionsConfigure.Configure(FamilyHubsUiOptions);

        var actualLink = FamilyHubsUiOptions.Footer.Links.FirstOrDefault();
        Assert.NotNull(actualLink);
        Assert.Equal(expectedUrl, actualLink.Url);
    }

    [Fact]
    public void Configure_HeaderConfigUrlTest()
    {
        const string configKey = "A:B";
        const string configValue = "configValue";
        Configuration.Setup(c => c[configKey]).Returns(configValue);

        var link = FamilyHubsUiOptions.Header.Links.First();
        link.Url = null;
        link.ConfigUrl = configKey;

        // act
        FamilyHubsUiOptionsConfigure.Configure(FamilyHubsUiOptions);

        var actualLink = FamilyHubsUiOptions.Header.Links.FirstOrDefault();
        Assert.NotNull(actualLink);
        Assert.Equal(configValue, actualLink.Url);
    }

    [Fact]
    public void Configure_FooterConfigUrlTest()
    {
        const string configKey = "A:B";
        const string configValue = "configValue";
        Configuration.Setup(c => c[configKey]).Returns(configValue);

        var link = FamilyHubsUiOptions.Footer.Links.First();
        link.Url = null;
        link.ConfigUrl = configKey;

        // act
        FamilyHubsUiOptionsConfigure.Configure(FamilyHubsUiOptions);

        var actualLink = FamilyHubsUiOptions.Footer.Links.FirstOrDefault();
        Assert.NotNull(actualLink);
        Assert.Equal(configValue, actualLink.Url);
    }

    protected static T DeepClone<T>(T obj)
    {
        string json = JsonSerializer.Serialize(obj);
        return JsonSerializer.Deserialize<T>(json)!;
    }
}