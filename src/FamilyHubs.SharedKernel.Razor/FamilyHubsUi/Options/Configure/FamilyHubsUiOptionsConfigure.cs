using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;

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
        ConfigureLink(options.Header.ServiceNameLink, options.Urls);
        ConfigureLinks(options.Header.NavigationLinks, options.Urls);
        ConfigureLinks(options.Header.ActionLinks, options.Urls);
        ConfigureLinks(options.Footer.Links, options.Urls);
    }

    public void ConfigureLinks(FhLinkOptions[] linkOptions, Dictionary<string, string> urls)
    {
        foreach (var link in linkOptions)
        {
            ConfigureLink(link, urls);
        }
    }

    private void ConfigureLink(FhLinkOptions link, Dictionary<string, string> urls)
    {
        if (link.ConfigUrl != null)
        {
            link.Url = _configuration[link.ConfigUrl];
        }
        else
        {
            // if Url is not set, use a simple slugified version of the link text
            link.Url ??= $"/{link.Text.ToLowerInvariant().Replace(' ', '-')}";

            // is a base url key is set, treat the Url as a relative url from the given base
            if (!string.IsNullOrEmpty(link.BaseUrlKey))
            {
                if (!urls.TryGetValue(link.BaseUrlKey, out var baseUrl))
                {
                    throw new ArgumentException(
                        $"No url found in FamilyHubsUi:Urls for key \"{link.BaseUrlKey}\" when constructing link for \"{link.Text}\".");
                }

                var url = new Uri(new Uri(baseUrl), link.Url);

                link.Url = url.ToString();
            }
        }
    }
}