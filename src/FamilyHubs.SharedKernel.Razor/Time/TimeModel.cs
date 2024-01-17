using Microsoft.AspNetCore.Http;
using System.Diagnostics;
using System.Text.Json.Serialization;

namespace FamilyHubs.SharedKernel.Razor.Time;

//todo: Am/PM is in quotes in debugger tooltip
[DebuggerDisplay("{Hour}:{Minute}{AmPm?.ToString()}")]
public class TimeModel
{
    public int? Hour { get; }
    public int? Minute { get; }
    public AmPm? AmPm { get; }

    public static TimeModel Empty => new(null, null, null);

    private static readonly TimeZoneInfo UkTimeZone = TimeZoneInfo.FindSystemTimeZoneById("GMT Standard Time");

    [JsonConstructor]
    public TimeModel(int? hour, int? minute, AmPm? amPm)
    {
        Hour = hour;
        Minute = minute;
        AmPm = amPm;
    }

    public TimeModel(DateTime? time)
    {
        if (time == null)
        {
            return;
        }

        if (time.Value.Hour > 12)
        {
            Hour = time.Value.Hour - 12;
            AmPm = Time.AmPm.Pm;
        }
        else
        {
            Hour = time.Value.Hour;
            AmPm = Time.AmPm.Am;
        }
        Minute = time.Value.Minute;
    }

    public TimeModel(string name, IFormCollection form)
    {
        if (int.TryParse(form[$"{name}Hour"].ToString(), out var value))
        {
            Hour = value;
        }
        if (int.TryParse(form[$"{name}Minute"].ToString(), out value))
        {
            Minute = value;
        }
        AmPm = form[$"{name}AmPm"].ToString() switch
        {
            "am" => Time.AmPm.Am,
            "pm" => Time.AmPm.Pm,
            _ => null
        };
    }

    public bool IsEmpty => Hour == null && Minute == null;

    public bool IsHourValid => Hour is >= 0 and <= 12;
    public bool IsMinuteValid => Minute is >= 0 and <= 59;
    public bool IsValid => IsHourValid && IsMinuteValid && AmPm != null;

    public DateTime? ToDateTime()
    {
        if (Hour == null || Minute == null || AmPm == null)
        {
            return null;
        }

        var hour = AmPm == Time.AmPm.Pm ? Hour + 12 : Hour;

        //todo: unit test : utc to uk timezone correct?
        //        return TimeZoneInfo.ConvertTime(new DateTime(1, 1, 1, hour.Value, Minute.Value, 0, DateTimeKind.Utc), UkTimeZone);
        return TimeZoneInfo.ConvertTime(default(DateTime).AddHours(hour.Value).AddMinutes(Minute.Value), UkTimeZone);
    }
}