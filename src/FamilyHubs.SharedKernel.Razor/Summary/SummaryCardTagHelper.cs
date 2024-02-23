using Microsoft.AspNetCore.Razor.TagHelpers;
using System.Text;

namespace FamilyHubs.SharedKernel.Razor.Summary;

public class SummaryCardTagHelper : TagHelper
{
    public string? Title { get; set; }
    public string? Action1 { get; set; }
    public string? Action1VisuallyHidden { get; set; }
    public string? Action1Href { get; set; }
    public string? Action2 { get; set; }
    public string? Action2VisuallyHidden { get; set; }
    public string? Action2Href { get; set; }

    public override async Task ProcessAsync(TagHelperContext context, TagHelperOutput output)
    {
        ArgumentNullException.ThrowIfNull(Title);

        output.TagName = "div";
        output.Attributes.SetAttribute("class", "govuk-summary-card");

        var childContent = (await output.GetChildContentAsync()).GetContent();

        string? actions = null;
        if (Action1 != null || Action2 != null)
        {
            actions = $@"<ul class=""govuk-summary-card__actions"">
                <li class=""govuk-summary-card__action"">
                    <a href=""{Action1Href}"">{Action1}{(
                Action1VisuallyHidden != null
                ? $"<span class=\"govuk-visually-hidden\">{Action1VisuallyHidden}</span>"
                : "")}</a>
                </li>
                </ul>";
        }

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