using FamilyHubs.SharedKernel.Razor.FamilyHubsUi.Options;

namespace FamilyHubs.SharedKernel.Razor.FamilyHubsUi.Delegators;

public enum LinkStatus
{
    Visible,
    NotVisible, // NotRendered? (we might want a Hidden also, for rendered, but html hidden)
    Active
}

public interface IFamilyHubsHeader
{
    bool ShowNavigationMenu => true;
    LinkStatus GetStatus(LinkOptions link) => LinkStatus.Visible;
}