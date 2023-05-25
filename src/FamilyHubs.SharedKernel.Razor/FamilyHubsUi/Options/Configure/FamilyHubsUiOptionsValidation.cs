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
        foreach (var link in linkOptions)
        {
            if (!Uri.IsWellFormedUriString(link.Url, UriKind.RelativeOrAbsolute))
            {
                validationErrors.Add($"{linkTypeDescription} link for \"{link.Text}\" has invalid Url \"{link.Url}\"");
            }
        }
    }
}