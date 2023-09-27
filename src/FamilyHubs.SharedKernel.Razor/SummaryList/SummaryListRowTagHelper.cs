using Microsoft.AspNetCore.Razor.TagHelpers;

namespace FamilyHubs.SharedKernel.Razor.SummaryList;

public class SummaryListRowTagHelper : TagHelper
{
    public string? Key { get; set; }

    public override async Task ProcessAsync(TagHelperContext context, TagHelperOutput output)
    {
        string finalValue = (await output.GetChildContentAsync()).GetContent();
        if (!string.IsNullOrWhiteSpace(finalValue))
        {
            output.TagName = "div";
            output.Attributes.SetAttribute("class", "govuk-summary-list__row");
            output.Content.SetHtmlContent($@"
                <dt class='govuk-summary-list__key'>
                    {Key}
                </dt>
                <dd class='govuk-summary-list__value'>
                    {finalValue}
                </dd>
            ");
        }
        else
        {
            output.SuppressOutput();
        }
    }
}