using FamilyHubs.SharedKernel.Razor.ErrorNext;
using FamilyHubs.SharedKernel.Razor.FullPages.Radios;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace FamilyHubs.Example.Pages.Examples.FullPages
{
    public enum Country
    {
        England,
        Scotland,
        Wales,
        NorthernIreland
    }

    public class RadioModel : PageModel, IRadiosPageModel
    {
        public static Radio[] StaticRadios => new []
        {
            new Radio("England", Country.England.ToString()),
            new Radio("Scotland", Country.Scotland.ToString()),
            new Radio("Wales", Country.Wales.ToString()),
            new Radio("Northern Ireland", Country.NorthernIreland.ToString())
        };

        public IEnumerable<IRadio> Radios => StaticRadios;
        [BindProperty]
        public string? SelectedValue => null;
        public IErrorState Errors => ErrorState.Empty;
        public string? DescriptionPartial => null;
        public string? Legend => "Where do you live?";

        public RadioModel()
        {
        }

        public void OnPost()
        {
        }
    }
}
