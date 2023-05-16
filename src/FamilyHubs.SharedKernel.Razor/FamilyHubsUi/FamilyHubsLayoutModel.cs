using FamilyHubs.SharedKernel.Razor.FamilyHubsUi.Options;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Options;

namespace FamilyHubs.SharedKernel.Razor.FamilyHubsUi;

public class FamilyHubsLayoutModel
{
    //    private readonly IOptions<FamilyHubsUiOptions> _familyHubsUiOptions;
    //todo: transition to above
    public readonly IOptions<FamilyHubsUiOptions> FamilyHubsUiOptions;

    public FamilyHubsLayoutModel(IOptions<FamilyHubsUiOptions> familyHubsUiOptions)
    {
        FamilyHubsUiOptions = familyHubsUiOptions;
    }

    public PageModel? PageModel { get; set; }
}