using FamilyHubs.SharedKernel.Razor.AlternativeServices;
using FamilyHubs.SharedKernel.Razor.FamilyHubsUi.Options;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Options;

namespace FamilyHubs.Example.Pages.Components.Alternative;

public class IndexModel : PageModel, IAlternativeService
{
    private readonly FamilyHubsUiOptions _familyHubsUiOptions;
    public string ServiceName => "AlternativeService1";

    public string AlternativeServiceName { get; set; }

    public IndexModel(IOptions<FamilyHubsUiOptions> familyHubsUiOptions)
    {
        _familyHubsUiOptions = familyHubsUiOptions.Value;
    }

    public void OnGet()
    {
        AlternativeServiceName = _familyHubsUiOptions.GetAlternative(ServiceName).ServiceName;
    }
}