
namespace FamilyHubs.SharedKernel.Razor.Dashboard;

public class ColumnImmutable
{
    public string DisplayName { get; }
    public string? SortName { get; }

    public ColumnImmutable(string displayName, string? sortName = null)
    {
        DisplayName = displayName;
        SortName = sortName;
    }
}