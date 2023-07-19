using FamilyHubs.SharedKernel.Razor.AlternativeServices;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace FamilyHubs.Example.Pages.Components.Alternative;

public class IndexModel : PageModel, IAlternativeService
{
    string IAlternativeService.ServiceName => "AlternativeService1";
}