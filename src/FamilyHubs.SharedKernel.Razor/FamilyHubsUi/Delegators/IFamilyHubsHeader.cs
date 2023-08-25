using FamilyHubs.SharedKernel.Razor.FamilyHubsUi.Options;

namespace FamilyHubs.SharedKernel.Razor.FamilyHubsUi.Delegators;

public enum LinkStatus
{
    Visible,
    NotVisible, // NotRendered? (we might want a Hidden also, for rendered, but html hidden). could also have VisibleIfJavascriptEnabled
    Active
}

public interface IFamilyHubsHeader
{
    bool ShowNavigationMenu => true;
    bool ShowActionLinks => true;

    //todo: accept FhLinkOptions or IFhRenderLink : once allows eg check base link, other allows checking final render link - i guess if wanted to check baseurl can implement class
    LinkStatus GetStatus(IFhRenderLink link) => LinkStatus.Visible;
    IEnumerable<IFhRenderLink> NavigationLinks(FhLinkOptions[] navigationLinks) => navigationLinks;
    IEnumerable<IFhRenderLink> ActionLinks(FhLinkOptions[] actionLinks) => actionLinks;
}