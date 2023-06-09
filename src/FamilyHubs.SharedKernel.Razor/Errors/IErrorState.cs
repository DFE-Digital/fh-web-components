﻿namespace FamilyHubs.SharedKernel.Razor.Errors;

public interface IErrorState
{
    //todo: better naming of all these. GetError is the odd one out as it's not referring to the current state
    bool HasErrors { get; }
    IEnumerable<int> ErrorIds { get; }

    //todo: leave this out of interface? (GetErrorIfTriggered could be used instead (renamed), but consumers would have to deal with null) or just rename?
    Error GetError(int errorId);

    bool HasError(params int[] errorIds);

    int? GetErrorIdIfTriggered(params int[] mutuallyExclusiveErrorIds);
    Error? GetErrorIfTriggered(params int[] mutuallyExclusiveErrorIds);
}