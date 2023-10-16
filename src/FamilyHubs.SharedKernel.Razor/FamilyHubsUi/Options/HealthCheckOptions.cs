
namespace FamilyHubs.SharedKernel.Razor.FamilyHubsUi.Options
{
    public interface IUrlOptions
    {
        string? BaseUrlKey { get; set; }
        string? Url { get; set; }
        string? ConfigUrl { get; set; }
    }

    public class HealthCheckUrlOptions : IUrlOptions
    {
        /// <summary>
        /// A key name from the FamilyHubsUi:Url section.
        /// If supplied, the configured value of the given key name,
        /// acts as the base URL for the relative Url supplied through Url or ConfigUrl.
        /// </summary>
        public string? BaseUrlKey { get; set; }

        /// <summary>
        /// The URL for the link.
        /// </summary>
        public string? Url { get; set; }

        /// <summary>
        /// If supplied, the Url is populated from the config value found at the given config key.
        /// </summary>
        /// <example>
        /// "FamilyHubsUi:FeedbackUrl"
        /// </example>
        public string? ConfigUrl { get; set; }
    }

    public class HealthCheckOptions
    {
        public bool Enabled { get; set; }

        public Dictionary<string, HealthCheckUrlOptions> InternalApis { get; set; } = new();

        public Dictionary<string, HealthCheckUrlOptions> ExternalApis { get; set; } = new();

        public Dictionary<string, HealthCheckUrlOptions> ExternalSites { get; set; } = new();

        public Dictionary<string, HealthCheckUrlOptions> Databases { get; set; } = new();
    }
}
