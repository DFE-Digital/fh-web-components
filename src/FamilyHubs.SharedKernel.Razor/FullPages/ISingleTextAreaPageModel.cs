using FamilyHubs.SharedKernel.Razor.ErrorNext;
using Microsoft.AspNetCore.Mvc;

namespace FamilyHubs.SharedKernel.Razor.FullPages;

public interface ISingleTextAreaPageModel
{
    [BindProperty]
    string? TextAreaValue { get; set; }

    public IErrorState Errors { get; }

    string DescriptionPartial { get; }

    public int TextAreaMaxLength { get; }
    public int TextAreaNumberOfRows { get; }

}