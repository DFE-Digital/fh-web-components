using FamilyHubs.SharedKernel.Razor.Errors;
using FamilyHubs.SharedKernel.Razor.FullPages;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace FamilyHubs.Example.Pages.Examples.FullPages
{
    public class SingleTextboxModel : PageModel, ISingleTextboxPageModel
    {
        public string HeadingText { get; set; } = "Single Textbox Example";
        public string? HintText { get; set; } = "It's the ultimate question";
        public string TextBoxLabel { get; set; } = "What is the answer to life, the universe, and everything?";
        public string? TextBoxValue { get; set; }
        public IErrorState Errors { get; set; } = ErrorState.Empty;

        public void OnGet()
        {
        }
    }
}
