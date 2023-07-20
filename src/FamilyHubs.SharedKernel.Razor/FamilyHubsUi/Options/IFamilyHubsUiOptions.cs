namespace FamilyHubs.SharedKernel.Razor.FamilyHubsUi.Options;

//todo: any value in this interface? can't easily inject it using IOptions<IFamilyHubsUiOptions>
public interface IFamilyHubsUiOptions
{
    string ServiceName { get; set; }
    Phase Phase { get; set; }
    string FeedbackUrl { get; set; }

    /// <summary>
    /// The support email address for the service, as displayed on error pages.
    /// </summary>
    string SupportEmail { get; set; }

    Dictionary<string, string> Urls { get; set; }
    AnalyticsOptions? Analytics { get; set; }
    HeaderOptions Header { get; set; }
    FooterOptions Footer { get; set; }

    FamilyHubsUiOptions GetAlternative(string serviceName);

    Uri Url<TUrlKeyEnum>(TUrlKeyEnum baseUrl, string? url = "")
        where TUrlKeyEnum : struct, Enum;
}