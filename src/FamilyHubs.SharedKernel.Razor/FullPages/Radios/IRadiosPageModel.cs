
using FamilyHubs.SharedKernel.Razor.ErrorNext;

namespace FamilyHubs.SharedKernel.Razor.FullPages.Radios;

public interface IRadiosPageModel
{
    public IErrorState Errors { get; }

    string DescriptionPartial { get; }
}