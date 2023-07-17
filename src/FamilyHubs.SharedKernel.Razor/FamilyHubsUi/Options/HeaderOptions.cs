
namespace FamilyHubs.SharedKernel.Razor.FamilyHubsUi.Options;

public class HeaderOptions
{
    public FhLinkOptions[] NavigationLinks { get; set; } = Array.Empty<FhLinkOptions>();
    public FhLinkOptions[] ActionLinks { get; set; } = Array.Empty<FhLinkOptions>();
}