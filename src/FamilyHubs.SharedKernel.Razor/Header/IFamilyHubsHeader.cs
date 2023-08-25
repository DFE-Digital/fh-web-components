using FamilyHubs.SharedKernel.Razor.FamilyHubsUi.Options;
using FamilyHubs.SharedKernel.Razor.Links;

namespace FamilyHubs.SharedKernel.Razor.Header;

public interface IFamilyHubsHeader
{
    bool ShowNavigationMenu => true;
    bool ShowActionLinks => true;

    LinkStatus GetStatus(IFhRenderLink link) => LinkStatus.Visible;

    IEnumerable<IFhRenderLink> NavigationLinks(FhLinkOptions[] navigationLinks) 
        => (IEnumerable<IFhRenderLink>) navigationLinks;

    IEnumerable<IFhRenderLink> ActionLinks(FhLinkOptions[] actionLinks)
        => (IEnumerable<IFhRenderLink>) actionLinks;
}