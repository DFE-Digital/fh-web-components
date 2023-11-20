using System.ComponentModel.DataAnnotations;

namespace FamilyHubs.SharedKernel.Razor.FullPages
{
    public interface ISingleTelephoneTextboxPageModel : ISingleTextboxPageModel
    {
        [Phone]
        new string? TextBoxValue { get; set; }
    }
}