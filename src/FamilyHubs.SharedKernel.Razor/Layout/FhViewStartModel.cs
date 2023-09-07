using FamilyHubs.SharedKernel.Razor.AlternativeServices;
using FamilyHubs.SharedKernel.Razor.FamilyHubsUi;
using FamilyHubs.SharedKernel.Razor.FamilyHubsUi.Extensions;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Microsoft.Extensions.Options;

namespace FamilyHubs.SharedKernel.Razor.Layout;

public class FhViewStartModel
{
    //public FhViewStartModel(PageModel pageModel, ViewDataDictionary<PageModel> viewData)
    //{
    //    PageModel = pageModel;
    //    ViewData = viewData;
    //}

    public static void ViewStartInit(FamilyHubsLayoutModel familyHubsLayoutModel, PageModel pageModel, ViewDataDictionary<PageModel> viewData)
    {
        familyHubsLayoutModel.PageModel = pageModel;
        var alt = familyHubsLayoutModel.PageModel as IAlternativeService;
        if (alt?.ServiceName != null)
        {
            var altFamilyHubsUiOptions = familyHubsLayoutModel.FamilyHubsUiOptions.Value.AlternativeFamilyHubsUi[alt.ServiceName];
            if (altFamilyHubsUiOptions.Enabled)
            {
                familyHubsLayoutModel.FamilyHubsUiOptions = Options.Create(altFamilyHubsUiOptions);
            }
        }
        viewData.SetFamilyHubsLayoutModel(familyHubsLayoutModel);
    }

    //public PageModel PageModel;
    //public ViewDataDictionary<PageModel> ViewData;
}