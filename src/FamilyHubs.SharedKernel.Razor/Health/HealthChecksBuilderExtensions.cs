using FamilyHubs.SharedKernel.Razor.FamilyHubsUi.Options;
using HealthChecks.UI.Client;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics.HealthChecks;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Diagnostics.HealthChecks;

namespace FamilyHubs.SharedKernel.Razor.Health;

public static class HealthChecksBuilderExtensions
{
    public enum UrlType
    {
        InternalApi,
        ExternalApi,
        InternalSite,
        ExternalSite
    }

    //todo: in own config outside of FamilyHubsUiOptions
    //todo: move to sharedkernel

    public static IHealthChecksBuilder AddFamilyHubs(
        this IHealthChecksBuilder builder,
        FamilyHubsUiOptions options)
    {
        AddUrlTypes(builder, options.HealthCheck.InternalApis, UrlType.InternalApi);
        AddUrlTypes(builder, options.HealthCheck.ExternalApis, UrlType.ExternalApi);
        AddUrlTypes(builder, options.HealthCheck.ExternalSites, UrlType.ExternalSite);
        return builder;
    }

    private static void AddUrlTypes(
        IHealthChecksBuilder builder,
        Dictionary<string, HealthCheckUrlOptions> urls, 
        UrlType urlType)
    {
        foreach (var url in urls)
        {
            builder.AddApi(url.Key, url.Value.Url, urlType);
        }
    }

    public static IHealthChecksBuilder AddApi(
        this IHealthChecksBuilder builder,
        string name,
        string? url,
        UrlType urlType = UrlType.InternalApi)
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
            builder.AddUrlGroup(new Uri(url), name, HealthStatus.Degraded,
                new[] { urlType.ToString() });
        }

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