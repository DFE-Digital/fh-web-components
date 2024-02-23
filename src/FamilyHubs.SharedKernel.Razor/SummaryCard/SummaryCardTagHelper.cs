using Microsoft.AspNetCore.Razor.TagHelpers;
using System.Text;

namespace FamilyHubs.SharedKernel.Razor.SummaryList;

public class SummaryCardTagHelper : TagHelper
{
    public string? Title { get; set; }

    public override async Task ProcessAsync(TagHelperContext context, TagHelperOutput output)
    {
        output.TagName = "div";
        output.Attributes.SetAttribute("class", "govuk-summary-card");
        output.Content.SetHtmlContent((await output.GetChildContentAsync()).GetContent());
    }

    public override async Task ProcessAsync(TagHelperContext context, TagHelperOutput output)
    {
        ArgumentNullException.ThrowIfNull(Title);

        output.TagName = "div";
        output.Attributes.SetAttribute("class", "govuk-summary-card");

        var childContent = (await output.GetChildContentAsync()).GetContent();

        //var contentBuilder = new StringBuilder();
        //contentBuilder.Append("<div class=\"govuk-summary-card__title-wrapper\">");
        //contentBuilder.Append($"<h2 class=\"govuk-summary-card__title\">{Title}</h2>");
        //contentBuilder.Append("</div>");

        //contentBuilder.Append(childContent);

        //output.Content.SetHtmlContent(contentBuilder.ToString());

        output.Content.SetHtmlContent($@"
            <div class=""govuk-summary-card__title-wrapper"">
                <h2 class=""govuk-summary-card__title"">{Title}</h2>
            </div>
            <div class=""govuk-summary-card__content"">
                <dl class=""govuk-summary-list"">
                    {childContent}
                </dl>
            </div>");
    }

}