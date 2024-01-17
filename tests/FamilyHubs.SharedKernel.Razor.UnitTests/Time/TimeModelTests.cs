using FamilyHubs.SharedKernel.Razor.Time;

namespace FamilyHubs.SharedKernel.Razor.UnitTests.Time;

public class TimeModelTests
{
    [Fact]
    public void TimeModel_Empty_IsEmpty()
    {
        var timeModel = TimeModel.Empty;
        Assert.True(timeModel.IsEmpty);
    }

    [Fact]
    public void TimeModel_ValidHour_IsHourValid()
    {
        var timeModel = new TimeModel(12, 30, AmPm.Pm);
        Assert.True(timeModel.IsHourValid);
    }

    [Fact]
    public void TimeModel_InvalidHour_IsHourValid()
    {
        var timeModel = new TimeModel(13, 30, AmPm.Pm);
        Assert.False(timeModel.IsHourValid);
    }

    [Fact]
    public void TimeModel_ValidMinute_IsMinuteValid()
    {
        var timeModel = new TimeModel(12, 30, AmPm.Pm);
        Assert.True(timeModel.IsMinuteValid);
    }

    [Fact]
    public void TimeModel_InvalidMinute_IsMinuteValid()
    {
        var timeModel = new TimeModel(12, 60, AmPm.Pm);
        Assert.False(timeModel.IsMinuteValid);
    }

    [Fact]
    public void TimeModel_ValidTime_IsValid()
    {
        var timeModel = new TimeModel(12, 30, AmPm.Pm);
        Assert.True(timeModel.IsValid);
    }

    [Fact]
    public void TimeModel_InvalidTime_IsValid()
    {
        var timeModel = new TimeModel(13, 60, AmPm.Pm);
        Assert.False(timeModel.IsValid);
    }

    //[Fact]
    //public void TimeModel_ToDateTime_ReturnsCorrectDateTime()
    //{
    //    var timeModel = new TimeModel(12, 30, AmPm.Pm);
    //    var expectedDateTime = new DateTime(1, 1, 1, 12, 30, 0, DateTimeKind.Utc);
    //    Assert.Equal(expectedDateTime, timeModel.ToDateTime());
    //}
}