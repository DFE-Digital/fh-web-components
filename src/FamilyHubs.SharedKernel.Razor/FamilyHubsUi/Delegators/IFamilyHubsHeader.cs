using FamilyHubs.SharedKernel.Razor.FamilyHubsUi.Options;

namespace FamilyHubs.SharedKernel.Razor.FamilyHubsUi.Delegators
{
    public interface IFamilyHubsHeader
    {
        bool ShowNavigationMenu => false;
        bool IsActive(LinkOptions link);
    }
}
