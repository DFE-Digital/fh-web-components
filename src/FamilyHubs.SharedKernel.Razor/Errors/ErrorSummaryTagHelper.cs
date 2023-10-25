#if WIP
using System.Text;
using Microsoft.AspNetCore.Razor.TagHelpers;

namespace FamilyHubs.SharedKernel.Razor.Errors;

public class ErrorSummaryTagHelper : TagHelper
{
    public IErrorState? Model { get; set; }
    [HtmlAttributeName("html-id-for-{0}")]
    public Dictionary<string, string> ErrorIdToHtmlElementId { get; set; } = new();
    public override void Process(TagHelperContext context, TagHelperOutput output)
    {
        if (Model?.HasErrors != true)
        {
            return;
        }
        output.TagName = "div";
        output.Attributes.SetAttribute("class", "govuk-grid-row");
        var content = new StringBuilder();
        content.Append(@"
<div class='govuk-grid-column-two-thirds'>
   <div class='govuk-error-summary' data-module='govuk-error-summary'>
       <div role='alert'>
           <h2 class='govuk-error-summary__title'>
               There is a problem
           </h2>
           <div class='govuk-error-summary__body'>
               <ul class='govuk-list govuk-error-summary__list'>
");
        foreach (var errorId in Model.ErrorIds)
        {
            var error = Model.GetError(errorId);
            //todo: errorId can be a generic enum type now (as the model is not being used for a partial's model)
            // then we should be able to tostring it, to look up the dictionary entry
            // then we can remove HtmlElementId from the error model
            // we'll need a new model if we continue to support the partial
            string? htmlElementId = ErrorIdToHtmlElementId.ContainsKey(errorId) ? ErrorIdToHtmlElementId[errorId] : error.HtmlElementId;
            content.Append($@"
                                <li>
                                    <a href='#{htmlElementId}'>{error.ErrorMessage}</a>
                                </li>");
        }
        content.Append(@"
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>");
        output.Content.SetHtmlContent(content.ToString());
    }
}
#endif