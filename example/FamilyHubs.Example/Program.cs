using FamilyHubs.SharedKernel.Razor.FamilyHubsUi.Options;
using FamilyHubs.SharedKernel.Razor.Health;
using Microsoft.Extensions.Options;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddRazorPages();

builder.Services.AddFamilyHubs(builder.Configuration);

//todo: gotta find a better way to do this
// there's a version that has a uri factory, nut we're still buggered for name...
// public static IHealthChecksBuilder AddUrlGroup(
// this IHealthChecksBuilder builder,
// Func<IServiceProvider, Uri> uriProvider,


//#pragma warning disable ASP0000
//var serviceProvider = builder.Services.BuildServiceProvider();
//#pragma warning restore ASP0000
//var uiOptions = serviceProvider.GetService<IOptions<FamilyHubsUiOptions>>();
//var healthCheckBuilder = builder.Services.AddHealthChecks().AddFamilyHubs(uiOptions!.Value);

builder.Services
    .AddHealthChecks()
    .AddFamilyHubs(builder.Configuration);

var app = builder.Build();

app.UseFamilyHubs();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapRazorPages();

app.MapSiteHealthChecks();

app.Run();
