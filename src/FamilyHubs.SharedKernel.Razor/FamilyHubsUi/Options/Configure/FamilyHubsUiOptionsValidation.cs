using Microsoft.Extensions.Options;

namespace FamilyHubs.SharedKernel.Razor.FamilyHubsUi.Options.Configure;

public class FamilyHubsUiOptionsValidation : IValidateOptions<FamilyHubsUiOptions>
{
    public ValidateOptionsResult Validate(string? _, FamilyHubsUiOptions options)
    {
        var validationErrors = new List<string>();
        ValidateLinks(options.Header.NavigationLinks, validationErrors, "Header navigation");
        ValidateLinks(options.Header.ActionLinks, validationErrors, "Header action");
        ValidateLinks(options.Footer.Links, validationErrors, "Footer");

        if (validationErrors.Any())
        {
            return ValidateOptionsResult.Fail(validationErrors);
        }
        return ValidateOptionsResult.Success;
    }

    private static void ValidateLinks(LinkOptions[] linkOptions, List<string> validationErrors, string linkTypeDescription)
    {
        validationErrors.AddRange(
            linkOptions.Where(l =>
                    !string.IsNullOrEmpty(l.Url) && !Uri.IsWellFormedUriString(l.Url, UriKind.RelativeOrAbsolute))
            .Select(l => $"{linkTypeDescription} link for \"{l.Text}\" has invalid Url \"{l.Url}\""));
    }
}