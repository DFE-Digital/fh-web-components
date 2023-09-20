using Microsoft.AspNetCore.Razor.TagHelpers;

namespace FamilyHubs.SharedKernel.Razor.TagHelpers;

[HtmlTargetElement("a", Attributes = "fh-new-tab")]
public class AnchorTagHelper : TagHelper
{
    public override void Process(TagHelperContext context, TagHelperOutput output)
    {
        output.Attributes.SetAttribute("target", "_blank");
        output.Attributes.SetAttribute("rel", "noopener noreferrer");
        output.PostContent.SetHtmlContent(" (opens in new tab)");
    }
}