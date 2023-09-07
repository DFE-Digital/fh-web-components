using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc.ViewFeatures;

namespace FamilyHubs.SharedKernel.Razor.Layout;

public class FhViewStartModel
{
    public FhViewStartModel(PageModel pageModel, ViewDataDictionary<PageModel> viewData)
    {
        PageModel = pageModel;
        ViewData = viewData;
    }

    public Microsoft.AspNetCore.Mvc.RazorPages.PageModel PageModel;
    public ViewDataDictionary<Microsoft.AspNetCore.Mvc.RazorPages.PageModel> ViewData;
}