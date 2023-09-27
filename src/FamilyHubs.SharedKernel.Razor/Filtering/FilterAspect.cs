using System.Diagnostics;
using FamilyHubs.SharedKernel.Razor.Filtering.Interfaces;

namespace FamilyHubs.SharedKernel.Razor.Filtering;

[DebuggerDisplay("{Id}")]
public sealed record FilterAspect(
    string Id,
    string Description,
    string? Name = null,
    bool SelectedByDefault = false) : IFilterAspect
{
    public string Value => Name ?? Id;
}
