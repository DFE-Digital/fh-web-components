using FamilyHubs.SharedKernel.Razor.FamilyHubsUi.Options;
using FamilyHubs.SharedKernel.Razor.Header;
using FamilyHubs.SharedKernel.Razor.Links;
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
            "Request support" => LinkStatus.Active,
            "Don't show" => LinkStatus.NotVisible,
            _ => LinkStatus.Visible
        };
    }
}