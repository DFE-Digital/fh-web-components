using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using System.Reflection;

namespace FamilyHubs.SharedKernel.Razor.FamilyHubsUi.Options.Configure;

public class FamilyHubsUiOptionsConfigure : IConfigureOptions<FamilyHubsUiOptions>
{
    private readonly IConfiguration _configuration;

    public FamilyHubsUiOptionsConfigure(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public void Configure(FamilyHubsUiOptions options)
    {
        ConfigureLinks(options.Header.NavigationLinks, options.Urls);
        ConfigureLinks(options.Header.ActionLinks, options.Urls);
        ConfigureLinks(options.Footer.Links, options.Urls);
    }

    public void ConfigureLinks(LinkOptions[] linkOptions, Dictionary<string, string> urls)
    {
        foreach (var link in linkOptions)
        {
            if (link.ConfigUrl != null)
            {
                link.Url = _configuration[link.ConfigUrl];
            }
            else if (string.IsNullOrEmpty(link.Url))
            {
                string? baseUrl = null;
                if (!string.IsNullOrEmpty(link.BaseUrlKey))
                {
                    if (!urls.TryGetValue(link.BaseUrlKey, out baseUrl))
                    {
                        throw new ArgumentException($"No url found in FamilyHubsUi:Urls for key \"{link.BaseUrlKey}\" when constructing link for \"{link.Text}\".");
                    }
                }
                link.Url = $"{baseUrl}/{link.Text.ToLowerInvariant().Replace(' ', '-')}";
            }
        }
    }
}