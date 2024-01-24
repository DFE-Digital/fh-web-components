using FamilyHubs.SharedKernel.Razor.ErrorNext;
using Microsoft.AspNetCore.Mvc;

namespace FamilyHubs.SharedKernel.Razor.FullPages;

public interface ISingleTextAreaPageModel
{
    string DescriptionPartial { get; }

    [BindProperty]
    string? TextAreaValue { get; set; }

    public IErrorState Errors { get; }
}