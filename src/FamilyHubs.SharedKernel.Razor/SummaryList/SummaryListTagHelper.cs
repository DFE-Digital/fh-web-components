using Microsoft.AspNetCore.Razor.TagHelpers;

namespace FamilyHubs.SharedKernel.Razor.SummaryList;

public class SummaryListTagHelper : TagHelper
{
    public bool Border { get; set; } = true;

    public override async Task ProcessAsync(TagHelperContext context, TagHelperOutput output)
    {
        output.TagName = "dl";
        output.Attributes.SetAttribute("class", $"govuk-summary-list {(Border ? "" : "govuk-summary-list--no-border")}");
        output.Content.SetHtmlContent((await output.GetChildContentAsync()).GetContent());
    }
}