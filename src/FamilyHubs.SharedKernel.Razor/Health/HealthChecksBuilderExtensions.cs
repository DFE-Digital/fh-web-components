using FamilyHubs.SharedKernel.Razor.FamilyHubsUi.Options;
using HealthChecks.UI.Client;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics.HealthChecks;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Diagnostics.HealthChecks;

namespace FamilyHubs.SharedKernel.Razor.Health;

//todo: move to sharedkernel, so can be used in api's
//todo: Urls don't support parent fam hub options 
public class FhHealthChecksBuilder
{
    public enum UrlType
    {
        InternalApi,
        ExternalApi,
        InternalSite,
        ExternalSite
    }

    private readonly IHealthChecksBuilder _builder;
    private readonly IConfiguration _configuration;
    private readonly FhHealthCheckOptions? _fhHealthCheckOptions;
    private readonly Dictionary<string, string>? _urls;

    public FhHealthChecksBuilder(
        IHealthChecksBuilder builder,
        IConfiguration configuration,
        string healthCheckConfigKey = "FamilyHubsUi:HealthCheck",
        string urlsConfigKey = "FamilyHubsUi:Urls")
    {
        _builder = builder;
        _configuration = configuration;

        _fhHealthCheckOptions = configuration.GetSection(healthCheckConfigKey).Get<FhHealthCheckOptions>();
        _urls = configuration.GetSection(urlsConfigKey).Get<Dictionary<string, string>>();
    }

    public void AddFamilyHubs()
    {
        if (_fhHealthCheckOptions?.Enabled == false)
        {
            return;
        };

        ConfigureCheckUrls(_fhHealthCheckOptions!.InternalApis);
        ConfigureCheckUrls(_fhHealthCheckOptions.ExternalApis);
        ConfigureCheckUrls(_fhHealthCheckOptions.ExternalSites);
        ConfigureCheckUrls(_fhHealthCheckOptions.Databases);

        AddUrlTypes(_fhHealthCheckOptions.InternalApis, UrlType.InternalApi);
        AddUrlTypes(_fhHealthCheckOptions.ExternalApis, UrlType.ExternalApi);
        AddUrlTypes(_fhHealthCheckOptions.ExternalSites, UrlType.ExternalSite);
    }

    private void ConfigureCheckUrls(Dictionary<string, HealthCheckUrlOptions> healthCheckUrls)
    {
        foreach (var url in healthCheckUrls)
        {
            ConfigureUrl(url.Value);
        }
    }

    private void ConfigureUrl(HealthCheckUrlOptions link)
    {
        if (link.ConfigUrl != null)
        {
            link.Url = _configuration[link.ConfigUrl];
        }
        else
        {
            // if a base url key is set, treat the Url as a relative url from the given base
            if (!string.IsNullOrEmpty(link.BaseUrlKey))
            {
                link.Url = AddRelativeToBaseUrl(link.BaseUrlKey, link.Url ?? "").ToString();
            }
        }
    }

    //todo: this version doesn't support parent configs
    private Uri AddRelativeToBaseUrl(string baseUrlKeyName, string? relativeUrl = null)
    {
        if (_urls == null)
        {
            throw new ArgumentException("BaseUrl used, but no Urls present");
        }

        if (!_urls.TryGetValue(baseUrlKeyName, out var baseUrlValue))
        {
            throw new ArgumentException($"No path found in Urls for key \"{baseUrlKeyName}\"", baseUrlKeyName);
        }

        return new Uri($"{baseUrlValue.TrimEnd('/')}/{relativeUrl?.TrimStart('/')}");
    }

    private void AddUrlTypes(
        Dictionary<string, HealthCheckUrlOptions> urls,
        UrlType urlType)
    {
        foreach (var url in urls)
        {
            AddApi(url.Key, url.Value.Url, urlType);
        }
    }

    private void AddApi(string name, string? url, UrlType urlType = UrlType.InternalApi)
    {
        // Only add the health check if the config key is set.
        // Either the API is optional (or not used locally) and missing intentionally,
        // in which case there's no need to add the health check,
        // or it's required, but in that case, the real consumer of the API should
        // continue to throw it's own relevant exception
        if (!string.IsNullOrEmpty(url))
        {
            if (urlType == UrlType.InternalApi)
            {
                //todo: add "/health" endpoints to all APIs
                url = url.TrimEnd('/') + "/api/info";
            }

            // we handle API failures as Degraded, so that App Services doesn't remove or replace the instance (all instances!) due to an API being down
            _builder.AddUrlGroup(new Uri(url), name, HealthStatus.Degraded,
                new[] { urlType.ToString() });
        }
    }
}

public static class HealthChecksBuilderExtensions
{
    public static IHealthChecksBuilder AddFamilyHubs(
        this IHealthChecksBuilder builder,
        IConfiguration configuration)
    {
        var fhBuilder = new FhHealthChecksBuilder(builder, configuration);

        fhBuilder.AddFamilyHubs();

        return builder;
    }

    public static WebApplication MapSiteHealthChecks(this WebApplication app)
    {
        app.MapHealthChecks("/health", new HealthCheckOptions
        {
            Predicate = _ => true,
            ResponseWriter = UIResponseWriter.WriteHealthCheckUIResponse
        });

        return app;
    }
}