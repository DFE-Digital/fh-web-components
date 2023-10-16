using FamilyHubs.SharedKernel.Razor.FamilyHubsUi.Options;
using FamilyHubs.SharedKernel.Razor.Health;
using Microsoft.Extensions.Options;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddRazorPages();

builder.Services.AddFamilyHubs(builder.Configuration);

//todo: gotta find a better way to do this
#pragma warning disable ASP0000
var serviceProvider = builder.Services.BuildServiceProvider();
#pragma warning restore ASP0000
var uiOptions = serviceProvider.GetService<IOptions<FamilyHubsUiOptions>>();
var healthCheckBuilder = builder.Services.AddHealthChecks().AddFamilyHubs(uiOptions!.Value);

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
