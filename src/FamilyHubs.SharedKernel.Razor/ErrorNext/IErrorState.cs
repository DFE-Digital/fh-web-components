namespace FamilyHubs.SharedKernel.Razor.ErrorNext;

//todo: all errors referred to are triggered errors, remove 'Triggered' from names?
public interface IErrorState
{
    bool HasTriggeredErrors { get; }

    //internal, rather than in interface?
    IEnumerable<Error> TriggeredErrors { get; }

    Func<int, string>? ErrorIdToHtmlElementId { get; set; }

    bool HasTriggeredError(params int[] errorIds);

    Error? GetErrorIfTriggered(params int[] mutuallyExclusiveErrorIds);
}