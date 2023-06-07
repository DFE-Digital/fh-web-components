using Microsoft.Extensions.Caching.Distributed;

namespace Microsoft.Extensions.DependencyInjection;

public static class IServiceCollectionExtension
{
    // passing Action<ReferralDistributedCacheOptions> would follow the standard pattern
    public static IServiceCollection AddRedisDistributedCache(
        this IServiceCollection services,
        string? connectionString,
        int slidingExpirationInMinutes,
        string instanceName)
    {
        ArgumentNullException.ThrowIfNull(connectionString);

        services.AddStackExchangeRedisCache(options =>
        {
            options.Configuration = connectionString;
            options.InstanceName = instanceName;
        });

        // there's currently only one, so this should be fine
        services.AddSingleton(new DistributedCacheEntryOptions
        {
            SlidingExpiration = TimeSpan.FromMinutes(slidingExpirationInMinutes)
        });

        return services;
    }

    public static IServiceCollection AddSqlServerDistributedCache(
        this IServiceCollection services,
        string connectionString,
        int slidingExpirationInMinutes,
        string schemaName,
        string tableName)
    {
        services.AddDistributedSqlServerCache(options =>
        {
            options.ConnectionString = connectionString;
            options.SchemaName = schemaName;
            options.TableName = tableName;
        });

        // there's currently only one, so this should be fine
        services.AddSingleton(new DistributedCacheEntryOptions
        {
            SlidingExpiration = TimeSpan.FromMinutes(slidingExpirationInMinutes)
        });

        return services;
    }
}