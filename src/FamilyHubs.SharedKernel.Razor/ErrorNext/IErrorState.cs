namespace FamilyHubs.SharedKernel.Razor.ErrorNext;

//todo: all errors referred to are triggered errors, remove 'Triggered' from names?
public interface IErrorState
{
    bool HasTriggeredErrors { get; }

    //internal, rather than in interface?
    IEnumerable<TriggeredError> TriggeredErrors { get; }

    Func<int, string>? ErrorIdToHtmlElementId { get; set; }

    bool HasTriggeredError(params int[] errorIds);

    //int? GetErrorIdIfTriggered(params int[] mutuallyExclusiveErrorIds);
    //Error? GetErrorIfTriggered(params int[] mutuallyExclusiveErrorIds);

    TriggeredError? GetErrorIfTriggered(params int[] mutuallyExclusiveErrorIds);
}