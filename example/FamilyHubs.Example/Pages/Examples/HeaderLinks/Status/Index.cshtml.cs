using FamilyHubs.SharedKernel.Razor.FamilyHubsUi.Delegators;
using FamilyHubs.SharedKernel.Razor.FamilyHubsUi.Options;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace FamilyHubs.Example.Pages.Examples.HeaderLinks.Status;

public class IndexModel : PageModel, IFamilyHubsHeader
{
    public bool ShowNavigationMenu => true;
    public bool ShowActionLinks => true;

    LinkStatus IFamilyHubsHeader.GetStatus(IFhRenderLink link)
    {
        return link.Text switch
        {
            "Home" => LinkStatus.Active,
            "Don't show" => LinkStatus.NotVisible,
            _ => LinkStatus.Visible
        };
    }
}