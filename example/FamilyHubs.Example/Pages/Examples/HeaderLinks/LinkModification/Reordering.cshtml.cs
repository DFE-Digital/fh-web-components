using FamilyHubs.SharedKernel.Razor.FamilyHubsUi.Delegators;
using FamilyHubs.SharedKernel.Razor.FamilyHubsUi.Options;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace FamilyHubs.Example.Pages.Examples.HeaderLinks.LinkModification;

public class ReorderingModel : PageModel, IFamilyHubsHeader
{
    IEnumerable<IFhRenderLink> IFamilyHubsHeader.NavigationLinks(FhLinkOptions[] navigationLinks)
    {
        return navigationLinks.Reverse();
    }

    IEnumerable<IFhRenderLink> IFamilyHubsHeader.ActionLinks(FhLinkOptions[] actionLinks)
    {
        return actionLinks.Reverse();
    }
}