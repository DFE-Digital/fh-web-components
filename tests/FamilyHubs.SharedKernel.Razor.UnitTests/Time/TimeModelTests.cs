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

    [Theory]
    [InlineData(1, 1, AmPm.Am, 1, 1)]
    [InlineData(1, 1, AmPm.Pm, 13, 1)]
    [InlineData(12, 30, AmPm.Am, 0, 30)]
    [InlineData(12, 30, AmPm.Pm, 12, 30)]
    public void TimeModel_ToDateTime_ReturnsCorrectDateTime(int hour, int minute, AmPm amPm, int expectedHour, int expectedMinute)
    {
        var timeModel = new TimeModel(hour, minute, amPm);
        var expectedDateTime = new DateTime(1, 1, 1, expectedHour, expectedMinute, 0, DateTimeKind.Utc);
        Assert.Equal(expectedDateTime, timeModel.ToDateTime());
    }

    [Theory]
    [InlineData(null, 30, AmPm.Pm)]
    [InlineData(12, null, AmPm.Pm)]
    [InlineData(12, 30, null)]
    public void TimeModel_NullHour_ToDateTime_ReturnsNull(int? hour, int? minute, AmPm? amPm)
    {
        var timeModel = new TimeModel(hour, minute, amPm);
        Assert.Null(timeModel.ToDateTime());
    }
}