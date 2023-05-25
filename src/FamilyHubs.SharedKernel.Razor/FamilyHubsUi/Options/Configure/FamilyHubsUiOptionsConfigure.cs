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
        ConfigureLinks(options.Header.NavigationLinks);
        ConfigureLinks(options.Header.ActionLinks);
        ConfigureLinks(options.Footer.Links);
    }

    public void ConfigureLinks(LinkOptions[] linkOptions)
    {
        foreach (var link in linkOptions)
        {
            if (link.ConfigUrl != null)
            {
                link.Url = _configuration[link.ConfigUrl];
            }
            else if (string.IsNullOrEmpty(link.Url))
            {
                link.Url = $"/{link.Text.ToLowerInvariant().Replace(' ', '-')}";
            }
        }
    }
}