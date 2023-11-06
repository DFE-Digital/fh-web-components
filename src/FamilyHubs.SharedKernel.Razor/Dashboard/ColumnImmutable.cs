
namespace FamilyHubs.SharedKernel.Razor.Dashboard;

public enum Align
{
    Left,
    Right
}

// alternatively pass class for header and cell (or both combined) to allow for more customization
public record ColumnImmutable(string DisplayName, string? SortName = null, Align Align = Align.Left);
