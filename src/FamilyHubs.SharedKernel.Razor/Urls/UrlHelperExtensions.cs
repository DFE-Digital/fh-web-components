using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Encodings.Web;
using System.Threading.Tasks;
using FamilyHubs.SharedKernel.Razor.FamilyHubsUi;
using Microsoft.AspNetCore.Html;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Microsoft.AspNetCore.Razor.TagHelpers;

namespace FamilyHubs.SharedKernel.Razor.Urls
{
    public enum UrlKey
    {
        ConnectWeb,
        DashboardWeb,
        ManageWeb,
        ReferralApi
    }

    //or extend IHtmlHelper?
    public static class PageModelExtensions
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

    [HtmlTargetElement("fh-url", TagStructure = TagStructure.WithoutEndTag)]
    public class FamilyHubsUrlTagHelper : TagHelper
    {
        private readonly IHtmlHelper _htmlHelper;

        public FamilyHubsUrlTagHelper(IHtmlHelper htmlHelper)
        {
            _htmlHelper = htmlHelper;
        }

        public override void Process(TagHelperContext context, TagHelperOutput output)
        {
            var familyHubs = _htmlHelper.ViewData["FamilyHubsLayoutModel"] as FamilyHubsLayoutModel;
            //var familyHubs = _htmlHelper.ViewContext.HttpContext.RequestServices.GetService(typeof(FamilyHubsLayoutModel)) as FamilyHubsLayoutModel;

            //var context = _htmlHelper.ViewContext.HttpContext;

            output.SuppressOutput();

            string url = "";
            if (context.AllAttributes.TryGetAttribute("url", out var urlAttribute))
            {
                url = urlAttribute?.Value.ToString() ?? "";
            }

            output.Content.SetContent(url);
        }
    }


    //public static class UrlHelperExtensions
    //{
    //    public static string FamilyHubUrl<TUrlKeyEnum>(this IUrlHelper urlHelper, TUrlKeyEnum baseUrl, string? url)
    //        where TUrlKeyEnum : struct, Enum
    //    {
    //        urlHelper.
    //    }
    //}
}
