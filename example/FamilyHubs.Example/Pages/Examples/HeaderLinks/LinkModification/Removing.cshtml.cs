using FamilyHubs.SharedKernel.Razor.FamilyHubsUi.Options;
using FamilyHubs.SharedKernel.Razor.Header;
using FamilyHubs.SharedKernel.Razor.Links;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace FamilyHubs.Example.Pages.Examples.HeaderLinks.LinkModification;

public class RemovingModel : PageModel, IFamilyHubsHeader
{
    IEnumerable<IFhRenderLink> IFamilyHubsHeader.NavigationLinks(FhLinkOptions[] navigationLinks)
    {
        return navigationLinks.Take(1);
    }

    IEnumerable<IFhRenderLink> IFamilyHubsHeader.ActionLinks(FhLinkOptions[] actionLinks)
    {
        return actionLinks.Take(1);
    }
}