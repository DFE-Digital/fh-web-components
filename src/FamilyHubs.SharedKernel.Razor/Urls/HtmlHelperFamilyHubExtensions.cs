using FamilyHubs.SharedKernel.Razor.FamilyHubsUi;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace FamilyHubs.SharedKernel.Razor.Urls;

public static class HtmlHelperFamilyHubExtensions
{
    public static string FamilyHubUrl<TUrlKeyEnum>(this IHtmlHelper htmlHelper, TUrlKeyEnum baseUrl, string? url)
        where TUrlKeyEnum : struct, Enum
    {
        var model = htmlHelper.ViewData["FamilyHubsLayoutModel"] as FamilyHubsLayoutModel;

        var baseUrlString = baseUrl.ToString();
        if (model!.FamilyHubsUiOptions.Value.Urls.TryGetValue(baseUrlString, out var baseUrlValue))
        {
            return $"{baseUrlValue}{url}";
        }

        return url ?? "";
    }
}