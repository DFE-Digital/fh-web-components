using FamilyHubs.Example.Models;
using FamilyHubs.SharedKernel.Razor.FamilyHubsUi.Options;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Options;

namespace FamilyHubs.Example.Pages.Components.Urls
{
    public class IndexModel : PageModel
    {
        private readonly IOptions<FamilyHubsUiOptions> _familyHubsUiOptions;
        public Uri ExampleUrl { get; set; }

        public IndexModel(IOptions<FamilyHubsUiOptions> familyHubsUiOptions)
        {
            _familyHubsUiOptions = familyHubsUiOptions;
        }

        public void OnGet()
        {
            ExampleUrl = _familyHubsUiOptions.Value.Url(UrlKey.ManageWeb, "example");
        }
    }
}
