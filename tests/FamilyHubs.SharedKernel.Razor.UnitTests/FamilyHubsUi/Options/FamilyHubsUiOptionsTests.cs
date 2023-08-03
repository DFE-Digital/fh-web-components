using FamilyHubs.SharedKernel.Razor.FamilyHubsUi.Options;

namespace FamilyHubs.SharedKernel.Razor.UnitTests.FamilyHubsUi.Options;

public enum TestUrlKey
{
    UrlWithoutSlash,
    UrlWithSlash,
    UrlWithPathNoTrailingSlash,
    UrlWithPathTrailingSlash
}

public class FamilyHubsUiOptionsTests
{
    public FamilyHubsUiOptions FamilyHubsUiOptions { get; set; }

    public FamilyHubsUiOptionsTests()
    {
        FamilyHubsUiOptions = new FamilyHubsUiOptions
        {
            Urls = new Dictionary<string, string>
            {
                {TestUrlKey.UrlWithoutSlash.ToString(), "http://example.com:5001"},
                {TestUrlKey.UrlWithSlash.ToString(), "http://example.com:5001/"},
                {TestUrlKey.UrlWithPathNoTrailingSlash.ToString(), "http://example.com:5001/basePath"},
                {TestUrlKey.UrlWithPathTrailingSlash.ToString(), "http://example.com:5001/basePath/"}
            }
        };
    }

    [Theory]
    [InlineData(TestUrlKey.UrlWithoutSlash, "", "http://example.com:5001/")]
    [InlineData(TestUrlKey.UrlWithoutSlash, "/", "http://example.com:5001/")]
    [InlineData(TestUrlKey.UrlWithoutSlash, "path/to/resource", "http://example.com:5001/path/to/resource")]
    [InlineData(TestUrlKey.UrlWithoutSlash, "/path/to/resource", "http://example.com:5001/path/to/resource")]
    [InlineData(TestUrlKey.UrlWithSlash, "", "http://example.com:5001/")]
    [InlineData(TestUrlKey.UrlWithSlash, "/", "http://example.com:5001/")]
    [InlineData(TestUrlKey.UrlWithSlash, "path/to/resource", "http://example.com:5001/path/to/resource")]
    [InlineData(TestUrlKey.UrlWithSlash, "/path/to/resource", "http://example.com:5001/path/to/resource")]
    [InlineData(TestUrlKey.UrlWithPathNoTrailingSlash, "", "http://example.com:5001/basePath/")]
    [InlineData(TestUrlKey.UrlWithPathNoTrailingSlash, "/", "http://example.com:5001/basePath/")]
    [InlineData(TestUrlKey.UrlWithPathNoTrailingSlash, "path/to/resource", "http://example.com:5001/basePath/path/to/resource")]
    [InlineData(TestUrlKey.UrlWithPathNoTrailingSlash, "/path/to/resource", "http://example.com:5001/basePath/path/to/resource")]
    [InlineData(TestUrlKey.UrlWithPathTrailingSlash, "", "http://example.com:5001/basePath/")]
    [InlineData(TestUrlKey.UrlWithPathTrailingSlash, "/", "http://example.com:5001/basePath/")]
    [InlineData(TestUrlKey.UrlWithPathTrailingSlash, "path/to/resource", "http://example.com:5001/basePath/path/to/resource")]
    [InlineData(TestUrlKey.UrlWithPathTrailingSlash, "/path/to/resource", "http://example.com:5001/basePath/path/to/resource")]
    public void Url_Always_ReturnsCorrectUri(TestUrlKey urlKey, string? url, string expectedUrl)
    {
        var actualUrl = FamilyHubsUiOptions.Url(urlKey, url);

        Assert.Equal(expectedUrl, actualUrl.ToString());
    }
}