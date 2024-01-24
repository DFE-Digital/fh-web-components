using FamilyHubs.SharedKernel.Razor.ErrorNext;

namespace FamilyHubs.SharedKernel.Razor.FullPages;

public interface ISingleTextAreaPageModel
{
    string? TextAreaValue { get; set; }

    public IErrorState Errors { get; }

    string DescriptionPartial { get; }

    public int TextAreaMaxLength { get; }
    public int TextAreaNumberOfRows { get; }

}