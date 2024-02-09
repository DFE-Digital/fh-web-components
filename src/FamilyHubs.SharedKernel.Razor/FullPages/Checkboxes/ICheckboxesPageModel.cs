using FamilyHubs.SharedKernel.Razor.ErrorNext;

namespace FamilyHubs.SharedKernel.Razor.FullPages.Checkboxes;

public interface ICheckboxesPageModel
{
    public IEnumerable<ICheckbox> Checkboxes { get; }

    //todo: will need to be some sort of collection
    public string? SelectedValue { get; set; }

    public IErrorState Errors { get; }

    string? DescriptionPartial { get; }
    string? Legend { get; }
    string? Hint { get; }
}