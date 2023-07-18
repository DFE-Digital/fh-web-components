using FamilyHubs.SharedKernel.Razor.FamilyHubsUi.Options;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Options;

namespace FamilyHubs.SharedKernel.Razor.FamilyHubsUi;

public class FamilyHubsLayoutModel
{
    //todo: have IFamilyHubsUiOptions directly here?
    public IOptions<FamilyHubsUiOptions> FamilyHubsUiOptions { get; }

    public FamilyHubsLayoutModel(IOptions<FamilyHubsUiOptions> familyHubsUiOptions)
    {
        FamilyHubsUiOptions = familyHubsUiOptions;
    }

    public PageModel? PageModel { get; set; }
}