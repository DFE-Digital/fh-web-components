using FamilyHubs.SharedKernel.Razor.FamilyHubsUi.Options.HealthCheck;
using HealthChecks.UI.Client;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics.HealthChecks;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Diagnostics.HealthChecks;

namespace FamilyHubs.SharedKernel.Razor.Health;

public static class HealthChecksBuilderExtensions
{
    public static IHealthChecksBuilder AddFamilyHubs(
        this IHealthChecksBuilder builder,
        IConfiguration configuration,
        string? appInsightsInstrumentationConfigKey = "APPINSIGHTS_INSTRUMENTATIONKEY")
    {
        if (appInsightsInstrumentationConfigKey != null)
        {
            builder.AddAppInsights(configuration, appInsightsInstrumentationConfigKey);
        }

        var fhHealthCheckOptions = configuration.GetSection("FamilyHubsUi:HealthCheck").Get<FhHealthCheckOptions>();
        var urls = configuration.GetSection("FamilyHubsUi:Urls").Get<Dictionary<string, string>>();
        
        string? feedbackUrl = configuration["FamilyHubsUi:FeedbackUrl"];
        if (!string.IsNullOrEmpty(feedbackUrl))
        {
            fhHealthCheckOptions!.ExternalSites.Add("Feedback Site", new HealthCheckUrlOptions { Url = feedbackUrl });
        }

        var fhBuilder = new FhHealthChecksBuilder(builder, configuration, fhHealthCheckOptions, urls);

        fhBuilder.AddFamilyHubs();

        return builder;
    }

    public static IHealthChecksBuilder AddAppInsights(
        this IHealthChecksBuilder builder,
        IConfiguration config,
        string appInsightsInstrumentationConfigKey)
    {
        string? aiInstrumentationKey = config.GetValue<string>(appInsightsInstrumentationConfigKey);
        if (!string.IsNullOrEmpty(aiInstrumentationKey))
        {
            //todo: check in dev env
            builder.AddAzureApplicationInsights(aiInstrumentationKey, "App Insights", HealthStatus.Degraded, new[] { "Infrastructure" });
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