using FamilyHubs.SharedKernel.Razor.ErrorNext;
using FamilyHubs.SharedKernel.Razor.FullPages.Checkboxes;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace FamilyHubs.Example.Pages.Examples.FullPages;

public enum DayCode
{
    MO, TU, WE, TH, FR, SA, SU
}

public class CheckboxCustomModel : PageModel, ICheckboxesPageModel
{
    public static Checkbox[] StaticCheckboxes => new[]
    {
        new Checkbox("Monday", DayCode.MO.ToString()),
        new Checkbox("Tuesday", DayCode.TU.ToString()),
        new Checkbox("Wednesday", DayCode.WE.ToString()),
        new Checkbox("Thursday", DayCode.TH.ToString()),
        new Checkbox("Friday", DayCode.FR.ToString()),
        new Checkbox("Saturday", DayCode.SA.ToString()),
        new Checkbox("Sunday", DayCode.SU.ToString())
    };

    public IEnumerable<ICheckbox> Checkboxes => StaticCheckboxes;

    public IErrorState Errors { get; set; } = ErrorState.Empty;

    public string? DescriptionPartial => "Checkbox-Custom-Content";
    public string? Legend => "Select all the days when this service is available";
    public string? Hint => "Select all options that apply. If none apply or you do not know these yet, leave blank and click continue.";

    public IEnumerable<DayCode>? SelectedDayCodes;

    public void OnGet()
    {
        //todo: example of pre-selecting checkboxes
    }

    public void OnPost()
    {
        SelectedDayCodes = Enumerable.Empty<DayCode>();
    }
}