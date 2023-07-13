using System.ComponentModel.DataAnnotations;

namespace FamilyHubs.SharedKernel.Razor.FamilyHubsUi.Options;

public class FamilyHubsUiOptions
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

    //todo: validate urls
    //todo: if urls section is missing in consumser settings, get null reference exception thrown from layout model
    // need to handle this better, especially as consumers updating to the latest version won't have this section
    public Dictionary<string, string> Urls { get; set; } = new();

    public AnalyticsOptions? Analytics { get; set; }

    public HeaderOptions Header { get; set; } = new();
    public FooterOptions Footer { get; set; } = new();
}
