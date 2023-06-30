using System.Collections.Immutable;

namespace FamilyHubs.SharedKernel.Razor.Errors;

public static class ErrorDictionaryExtensions
{
    public static ImmutableDictionary<int, Error> Add<T>(
        this ImmutableDictionary<int, Error> dictionary,
        T errorId,
        string htmlElementId,
        string errorMessage)
        where T : struct, Enum, IConvertible
    {
        return dictionary.Add((int)(IConvertible)errorId, new Error((int)(IConvertible)errorId, htmlElementId, errorMessage));
    }
}