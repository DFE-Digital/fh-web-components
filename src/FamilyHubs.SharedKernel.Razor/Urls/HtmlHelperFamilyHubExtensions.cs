using FamilyHubs.SharedKernel.Razor.FamilyHubsUi;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace FamilyHubs.SharedKernel.Razor.Urls;

public static class HtmlHelperFamilyHubExtensions
{
    public static Uri FamilyHubUrl<TUrlKeyEnum>(this IHtmlHelper htmlHelper, TUrlKeyEnum baseUrl, string? url)
        where TUrlKeyEnum : struct, Enum
    {
        var model = htmlHelper.ViewData["FamilyHubsLayoutModel"] as FamilyHubsLayoutModel;

        //todo: possibly cache from config as Uri's?
        var baseUrlString = baseUrl.ToString();
        if (!model!.FamilyHubsUiOptions.Value.Urls.TryGetValue(baseUrlString, out var baseUrlValue))
        {
            throw new ArgumentException($"No url found in FamilyHubsUi:Urls for key \"{baseUrlString}\"", nameof(baseUrl));
        }

        return new Uri(new Uri(baseUrlValue), url);
    }

    public static Uri FamilyHubConfigUrl<TUrlKeyEnum>(this IHtmlHelper htmlHelper, TUrlKeyEnum baseUrl, string configKey)
        where TUrlKeyEnum : struct, Enum
    {
        var configuration = htmlHelper.ViewContext.HttpContext.RequestServices.GetRequiredService<IConfiguration>();

        return htmlHelper.FamilyHubUrl(baseUrl, configuration[configKey]);
    }
}