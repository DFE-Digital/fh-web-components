using System.Collections.Immutable;
using System.Diagnostics.CodeAnalysis;
using Microsoft.EntityFrameworkCore.ChangeTracking.Internal;

namespace FamilyHubs.SharedKernel.Razor.ErrorNext;

public class ErrorState : IErrorState
{
    private readonly ImmutableDictionary<int, Error> _possibleErrors;

    public ErrorState(ImmutableDictionary<int, Error> possibleErrors, IEnumerable<int> triggeredErrors)
    {
        _possibleErrors = possibleErrors;
        ErrorIds = triggeredErrors;
    }

    public static IErrorState Empty { get; }
        = new ErrorState(ImmutableDictionary<int, Error>.Empty, Enumerable.Empty<int>());

    //todo: params version?
    public static IErrorState Create<T>(ImmutableDictionary<int, Error> possibleErrors, IEnumerable<T>? triggeredErrors)
        where T : struct, Enum, IConvertible
    {
        if (triggeredErrors?.Any() == true)
        {
            return new ErrorState(possibleErrors,
                triggeredErrors.Select(e => (int)(IConvertible)e));
        }

        return Empty;
    }

    public Func<string, Error>? ErrorToHtmlElementId { get; set; }

    public bool HasErrors => ErrorIds.Any();

    //todo: either/and IEnumerable<Error>?
    public IEnumerable<int> ErrorIds { get; }

    public Error GetError(int errorId)
    {
        return _possibleErrors[errorId];
    }

    public bool HasError(params int[] errorIds)
    {
        return GetErrorIdIfTriggered(errorIds) != null;
    }

    [SuppressMessage("Minor Code Smell", "S3267:Loops should be simplified with \"LINQ\" expressions", Justification = "LINQ expression version is less simple")]
    public int? GetErrorIdIfTriggered(params int[] mutuallyExclusiveErrorIds)
    {
        if (!mutuallyExclusiveErrorIds.Any())
        {
            return ErrorIds.Any() ? ErrorIds.First() : null;
        }

        foreach (int errorId in mutuallyExclusiveErrorIds)
        {
            if (ErrorIds.Contains(errorId))
            {
                return errorId;
            }
        }

        return null;
    }

    public Error? GetErrorIfTriggered(params int[] mutuallyExclusiveErrorIds)
    {
        int? currentErrorId = GetErrorIdIfTriggered(mutuallyExclusiveErrorIds);
        return currentErrorId != null ? GetError(currentErrorId.Value) : null;
    }
}