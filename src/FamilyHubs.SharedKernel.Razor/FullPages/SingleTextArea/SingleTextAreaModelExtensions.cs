
namespace FamilyHubs.SharedKernel.Razor.FullPages.SingleTextArea;

public static class SingleTextAreaModelExtensions
{
    public static TErrorId? CheckForErrors<TErrorId>(this ISingleTextAreaPageModel model, TErrorId emptyErrorId,
        TErrorId tooLongErrorId)
        where TErrorId : struct, Enum
    {
        if (string.IsNullOrEmpty(model.TextAreaValue))
        {
            return emptyErrorId;
        }

        // workaround the front end counting line endings as 1 chars (\n) as per HTML spec,
        // and the http transport/.net/windows using 2 chars for line ends (\r\n)
        if (model.TextAreaValue.Replace("\r", "").Length > model.TextAreaMaxLength)
        {
            return tooLongErrorId;
        }

        return default;
    }
}