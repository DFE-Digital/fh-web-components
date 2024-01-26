
using FamilyHubs.SharedKernel.Razor.ErrorNext;

namespace FamilyHubs.SharedKernel.Razor.FullPages.Radios;

//public enum LabelSize
//{
//    h1,
//    h2
//}

public interface IRadio
{
    string Label { get; }
    string Value { get; }
    //todo:
    //string? Hint { get; }
}

public interface IRadiosPageModel
{
    public IEnumerable<IRadio> Radios { get; }
    
    public string? SelectedValue { get; }

    //todo:
    //public bool AreRadiosInline { get; }

    public IErrorState Errors { get; }

    string? DescriptionPartial { get; }
    string? Label { get; }
}