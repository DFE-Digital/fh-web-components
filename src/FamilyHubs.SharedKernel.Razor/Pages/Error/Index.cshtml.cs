using FamilyHubs.SharedKernel.Razor.FamilyHubsUi.Options;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace FamilyHubs.SharedKernel.Razor.Pages.Error;

public class ErrorModel : PageModel
{
    public string SupportEmail { get; set; }

    public ErrorModel(IOptions<FamilyHubsUiOptions> familyHubsUiOptions)
    {
        SupportEmail = familyHubsUiOptions.Value.SupportEmail;
    }
}