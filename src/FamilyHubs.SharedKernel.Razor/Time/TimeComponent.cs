using Microsoft.AspNetCore.Http;

namespace FamilyHubs.SharedKernel.Razor.Time;

public class TimeComponent
{
    public string? Description { get; set; }
    //todo: not nice having element id out of view
    public string? HintId { get; set; }
    public string Name { get; set; }
    public AmPm DefaultAmPm { get; set; }

    public TimeComponent(
        string name,
        string? description = null,
        string? hintId = null,
        AmPm defaultAmPm = AmPm.Am)
    {
        Name = name;
        Description = description;
        HintId = hintId;
        DefaultAmPm = defaultAmPm;
    }

    //todo: don't have here?
    public TimeModel CreateModel(IFormCollection form)
    {
        return new TimeModel(Name, form);
    }
}