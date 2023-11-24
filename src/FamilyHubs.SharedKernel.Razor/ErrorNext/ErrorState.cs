using System.Collections.Immutable;
using System.Diagnostics.CodeAnalysis;

namespace FamilyHubs.SharedKernel.Razor.ErrorNext;

public class ErrorState : IErrorState
{
    public ErrorState(ImmutableDictionary<int, PossibleError> possibleErrors, IEnumerable<int> triggeredErrorIds)
    {
        TriggeredErrorIds = triggeredErrorIds;
        TriggeredErrors = triggeredErrorIds.Select(e => new Error(possibleErrors[e], this));
    }

    public static IErrorState Empty { get; }
        = new ErrorState(ImmutableDictionary<int, PossibleError>.Empty, Enumerable.Empty<int>());

    //todo: params version?
    public static IErrorState Create<T>(ImmutableDictionary<int, PossibleError> possibleErrors, IEnumerable<T>? triggeredErrorIds)
        where T : struct, Enum, IConvertible
    {
        if (triggeredErrorIds?.Any() == true)
        {
            return new ErrorState(possibleErrors,
                triggeredErrorIds.Select(e => (int)(IConvertible)e));
        }

        return Empty;
    }

    public Func<int, string>? ErrorIdToHtmlElementId { get; set; }

    public bool HasErrors => TriggeredErrorIds.Any();

    //todo: remove this?
    private IEnumerable<int> TriggeredErrorIds { get; }
    public IEnumerable<Error> TriggeredErrors { get; }

    public bool HasTriggeredError(params int[] errorIds)
    {
        return GetErrorIdIfTriggered(errorIds) != null;
    }

    //todo: roll into next method?
    [SuppressMessage("Minor Code Smell", "S3267:Loops should be simplified with \"LINQ\" expressions", Justification = "LINQ expression version is less simple")]
    private int? GetErrorIdIfTriggered(params int[] mutuallyExclusiveErrorIds)
    {
        if (!mutuallyExclusiveErrorIds.Any())
        {
            // if no error ids supplied, returns the first error (if there is one)
            // this is only really useful where there is only one input on the page
            return TriggeredErrorIds.Any() ? TriggeredErrorIds.First() : null;
        }

        foreach (int errorId in mutuallyExclusiveErrorIds)
        {
            if (TriggeredErrorIds.Contains(errorId))
            {
                return errorId;
            }
        }

        return null;
    }

    public Error? GetErrorIfTriggered(params int[] mutuallyExclusiveErrorIds)
    {
        int? currentErrorId = GetErrorIdIfTriggered(mutuallyExclusiveErrorIds);
        return currentErrorId != null ? TriggeredErrors.First(e => e.Id == currentErrorId) : null;
    }
}