
namespace FamilyHubs.SharedKernel.Razor.FamilyHubsUi.Options;

public interface IFhRenderLink
{
    string Text { get; set; }
    string? Url { get; set; }
    bool OpenInNewTab { get; set; }
}

public class FhLinkOptions : IFhRenderLink
{
    /// <summary>
    /// The (visible) text of the link.
    /// </summary>
    public string Text { get; set; } = "";

    /// <summary>
    /// A key name from the FamilyHubsUi:Url section.
    /// If supplied, the configured value of the given key name,
    /// acts as the base URL for the relative Url supplied through Url or ConfigUrl.
    /// </summary>
    public string? BaseUrlKey { get; set; }

    /// <summary>
    /// The URL for the link. If left blank, defaults to Text in lowercase with spaces converted to hyphens (-).
    /// </summary>
    /// <remarks>
    /// [Url]'s validation isn't fit for our purposes, so we perform custom validation in FamilyHubsUiOptionsValidation instead.
    /// </remarks>
    public string? Url { get; set; }

    /// <summary>
    /// If supplied, the Url is populated from the config value found at the given config key.
    /// </summary>
    /// <example>
    /// "FamilyHubsUi:FeedbackUrl"
    /// </example>
    public string? ConfigUrl { get; set; }

    public bool OpenInNewTab { get; set; } = false;
}