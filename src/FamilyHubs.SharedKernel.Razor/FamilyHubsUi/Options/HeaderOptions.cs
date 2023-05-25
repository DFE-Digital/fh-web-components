
namespace FamilyHubs.SharedKernel.Razor.FamilyHubsUi.Options;

public class HeaderOptions
{
    public LinkOptions[] NavigationLinks { get; set; } = Array.Empty<LinkOptions>();
    public LinkOptions[] ActionLinks { get; set; } = Array.Empty<LinkOptions>();
}