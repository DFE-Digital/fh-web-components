using System.ComponentModel.DataAnnotations;

namespace FamilyHubs.SharedKernel.Razor.FamilyHubsUi.Options;

public class FamilyHubsUiOptions : IFamilyHubsUiOptions
{
    public const string FamilyHubsUi = "FamilyHubsUi";

    [Required]
    public string ServiceName { get; set; } = "";

    public Phase Phase { get; set; }
    public string FeedbackUrl { get; set; } = "";

    /// <summary>
    /// The support email address for the service, as displayed on error pages.
    /// </summary>
    public string SupportEmail { get; set; } = "";

    //todo: if urls section is missing in consumer settings, get null reference exception thrown from layout model <- still the case?
    // need to handle this better, especially as consumers updating to the latest version won't have this section
    public Dictionary<string, string> Urls { get; set; } = new();

    public AnalyticsOptions? Analytics { get; set; }

    public HeaderOptions Header { get; set; } = new();
    public FooterOptions Footer { get; set; } = new();

    public Dictionary<string, FamilyHubsUiOptions> AlternativeFamilyHubsUi { get; set; } = new();

    /// <summary>
    /// Only relevant for alternative FamilyHubsUi options. If false, the alternative FamilyHubsUi options will not be used
    /// (even when specified through IAlternativeService).
    /// </summary>
    public bool Enabled { get; set; } = true;

    public FamilyHubsUiOptions GetAlternative(string serviceName)
    {
        if (!AlternativeFamilyHubsUi.TryGetValue(serviceName, out var alternativeFamilyHubsUi))
        {
            throw new ArgumentException($"No alternative FamilyHubsUi options found for service \"{serviceName}\"", nameof(serviceName));
        }

        return alternativeFamilyHubsUi;
    }

    public Uri Url<TUrlKeyEnum>(TUrlKeyEnum baseUrl, string? url = "")
        where TUrlKeyEnum : struct, Enum
    {
        //todo: possibly cache from config as Uri's?
        var baseUrlString = baseUrl.ToString();
        if (!Urls.TryGetValue(baseUrlString, out var baseUrlValue))
        {
            throw new ArgumentException($"No url found in FamilyHubsUi:Urls for key \"{baseUrlString}\"", nameof(baseUrl));
        }

        var uriBuilder = new UriBuilder(baseUrlValue);
        uriBuilder.Path = $"{uriBuilder.Path.TrimEnd('/')}/{url?.TrimStart('/')}";

        return uriBuilder.Uri;
    }
}
