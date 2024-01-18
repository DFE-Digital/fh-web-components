using FamilyHubs.SharedKernel.Razor.Time;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace FamilyHubs.Example.Pages.Examples.Time
{
    public class IndexModel : PageModel
    {
        public TimeViewModel? StartTime { get; set; }
        public TimeViewModel? EndTime { get; set; }

        private static TimeComponent StartTimeComponent => new("start", "Starts", "start-time-hint");
        private static TimeComponent EndTimeComponent => new("end", "Ends", "end-time-hint");

        public void OnGet()
        {
            DateTime startTime = DateTime.Today, endTime = startTime.AddDays(1);

            StartTime = new TimeViewModel(StartTimeComponent, startTime);
            EndTime = new TimeViewModel(EndTimeComponent, endTime);
        }
    }
}
