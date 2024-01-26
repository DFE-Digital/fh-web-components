using FamilyHubs.SharedKernel.Razor.ErrorNext;

namespace FamilyHubs.SharedKernel.Razor.FullPages.Radios;

public record Radio(string Label, string Value) : IRadio;

public interface IRadio
{
    string Label { get; }
    string Value { get; }
    //todo:
    ///// <summary>
    ///// You can add hints to radio items to provide additional information about the options.
    ///// </summary>
    //string? Hint { get; }
}

public interface IRadiosPageModel
{
    public IEnumerable<IRadio> Radios { get; }
    
    public string? SelectedValue { get; }

    /// <summary>
    /// In some cases, you can choose to display radios ‘inline’ beside one another (horizontally).
    ///
    /// Only use inline radios when:
    ///
    /// * the question only has two options
    /// * both options are short
    ///
    /// Remember that on small screens such as mobile devices, the radios will still be ‘stacked’ on top of one another (vertically).
    /// </summary>
    public bool AreRadiosInline => false;

    public IErrorState Errors { get; }

    string? DescriptionPartial { get; }
    string? Legend { get; }
    //todo:
    //string? Hint { get; }
}