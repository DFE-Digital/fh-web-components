using FamilyHubs.SharedKernel.Razor.FamilyHubsUi.Options;
using FamilyHubs.SharedKernel.Razor.Links;

namespace FamilyHubs.SharedKernel.Razor.Header;

public interface IFamilyHubsHeader
{
    bool ShowNavigationMenu => true;
    bool ShowActionLinks => true;

    LinkStatus GetStatus(IFhRenderLink link) => LinkStatus.Visible;

    IEnumerable<IFhRenderLink> NavigationLinks(FhLinkOptions[] navigationLinks, IFamilyHubsUiOptions familyHubsUiOptions)
        => (IEnumerable<IFhRenderLink>) navigationLinks;

    IEnumerable<IFhRenderLink> ActionLinks(FhLinkOptions[] actionLinks, IFamilyHubsUiOptions familyHubsUiOptions)
        => (IEnumerable<IFhRenderLink>) actionLinks;
}