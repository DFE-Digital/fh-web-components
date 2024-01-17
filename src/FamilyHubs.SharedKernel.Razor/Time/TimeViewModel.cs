
namespace FamilyHubs.SharedKernel.Razor.Time;

//todo: record?
public class TimeViewModel
{
    public TimeComponent Component { get; }
    public TimeModel? Time { get; }

    public TimeViewModel(TimeComponent component, DateTime? time = null)
    {
        Component = component;
        Time = time != null ? new TimeModel(time) : null;
    }

    public TimeViewModel(TimeComponent component, TimeModel? time)
    {
        Component = component;
        Time = time;
    }

    //todo: throw if Time is valid?
    public string FirstInvalidElementId => Time?.IsHourValid == true ? MinuteElementId : HourElementId;

    //todo: one central location for the ids
    public string HourElementId => $"{Component.Name}Hour";
    public string MinuteElementId => $"{Component.Name}Minute";
}
