# Family Hub web framework and components

This package is designed to work in conjunction with the [FamilyHubs.SharedKernel.Razor](https://www.nuget.org/packages/FamilyHubs.SharedKernel.Razor) nuget package, to rapidly create new GOV.UK websites and add standard components.

It builds on top of theses packages:
* [GOV.UK Design System](https://www.npmjs.com/package/govuk-frontend)
* [Ministry of Justice Frontend](https://www.npmjs.com/package/@ministryofjustice/frontend)
* [DfE Frontend](https://www.npmjs.com/package/dfe-frontend-alpha)

The package contains:
* configurable standard GOV.UK layout (although only the DfE header is included)
* configurable header and footer links
* cookie banner and page with pluggable content
* Google Analytics support
* GOV.UK pagination support
* Error handling, error pages and GOVUK error summary component
* MOJ dashboard support
* alternative configs for when pages need different layouts, headers, footers etc.
* Url helpers for picking Urls from config, manipulating them and inheriting them from ancestor configs
* a set of SASS files that import the above packages and add some additional styling
* .NET distributed cache support for SQL Server and Redis
* JavaScript postcode helpers
* HTTP security header support

There is an [example ASP.Net 7 site](https://github.com/DFE-Digital/fh-web-components/tree/main/example/FamilyHubs.Example) that shows how to use the packages.

## Consuming the packages

Install the familyhubs-frontend package into the website project using the following command:

```
npm install familyhubs-frontend
```

Installing the package, will add files to the wwwroot folder. (todo document which files)

In the styles/application.scss file, add the following line:

```
@import "../node_modules/familyhubs-frontend/styles/all";
```

Add the FamilyHubs.SharedKernel.Razor package to the website project.

The FamilyHubs.SharedKernel.Razor package contains:

* the layout
* common shared partial views
* todo add rest here

Check that the npm package and the Razor Class Library are on the same version.

Add the configuration section to the appsettings.json file of the website project.

### Configuration

Here's an example configuration section that should be added to the appsettings.json file of a Family Hubs website:

```json
  "FamilyHubsUi": {
    "ServiceName": "Manage family support services and accounts",
    "Phase": "Beta",
    "FeedbackUrl": "https://example.com/feedback",
    "SupportEmail": "find-support-for-your-family.service@education.gov.uk",
    "Analytics": {
      "CookieName": "manage_family_support_cookies_policy",
      "CookieVersion": 1,
      "MeasurementId": "",
      "ContainerId": ""
    },
    "Header": {
	  "NavigationLinks": [
		{ "Text": "Requests Sent", "Url": "https://dev.manage-connection-requests.education.gov.uk/" },
		{ "Text": "Search for service", "Url": "/ProfessionalReferral/Search" },
	  ],
      "ActionLinks": [
		{ "Text": "My account", "Url": "/account/my-account" },
		{ "Text": "Sign out", "Url": "/account/signout" }
	  ]
	},
    "Footer": {
      "Links": [
        { "Text": "Accessibility" },
        { "Text": "Contact Us" },
        { "Text": "Cookies" },
        { "Text": "Feedback", "ConfigUrl": "FamilyHubsUi:FeedbackUrl" },
        { "Text": "Terms and conditions" }
      ] 
    } 
```

Notes:

* Google Analytics is only enabled if the MeasurementId and ContainerId are set.

* The Options classes have XML documentation on the properties.

* If your cookie page is at a different location to `/cookies`, you can set it using `CookiePageUrl` in the `Analytics` section.

## Version numbers

To ease testing, we should keep the version number of the NPM package and the Razor Class Library in sync. Consumers should then ensure that both packages are on the same version.

The version of the familyhubs-frontend package is given in its package.json file, as the value of the version property.

The version of the FamilyHubs.SharedKernel.Razor package is given in its FamilyHubs.SharedKernel.Razor.csproj file, as the value of the VersionPrefix property.

## familyhubs-frontend

To publish this npm package, you’ll need to follow these steps:

* Create a user account on the npm website if you don’t already have one.
* In your terminal or command prompt, navigate to the `familyhubs-frontend` directory, containing the package files.
* Run the `npm login` command and enter your npm username, password, and email when prompted.
* Update the package.json file in the package directory with the version number synced to the FamilyHubs.SharedKernel.Razor version.
* Run the `npm publish` command to publish the package to the npm registry.

After publishing the package, it will be available for others to install and use nearly instantaneously.

It's best to reference the package using its exact version number, otherwise it might not pick up the latest, just published version.

## FamilyHubs.SharedKernel.Razor

The package is automatically built when the solution is built.

It is not currently published automatically to the NuGet feed, and needs to be manually uploaded to NuGet.

## Components

### Cookie page

Call `AddCookiePage()` on your `IServiceCollection`, like so...

```
    services.AddCookiePage(configuration);
```

Create a new Razor Page. Inject ICookiePage into the PageModel's constructor, stash it away, then pass it to the cookie page partial in the View.

To add support for users running without Javascript, add an OnPost method as per the example.

E.g.

```
public class IndexModel : PageModel
{
    public readonly ICookiePage CookiePage;

    public IndexModel(ICookiePage cookiePage)
    {
        CookiePage = cookiePage;
    }

    public void OnPost(bool analytics)
    {
        CookiePage.OnPost(analytics, Request, Response);
    }
}
```

and add in your view...

```
    <partial name="~/Pages/Shared/_CookiePage.cshtml" model="Model.CookiePage"/>
```

Add a partial view called `Pages/Shared/_CookiePolicy.cshtml` and add the cookie policy content into it.

If you want to pick up the cookie policy content from a different partial view, pass its name into `AddCookiePage()`, e.g.

```
    services.AddCookiePage(configuration, "SomeOtherView.cshtml");
```

### User-friendly, branded error pages

To add user-friendly Family Hub branded error pages, call `UseErrorHandling()` on `WebApplication`, e.g.

```
    app.UseErrorHandling();
```

By default, the error handling middleware will only be added if it's not the development environment. If you want to always add it, irrespective of the environment (useful for local testing), pass `true` as the first parameter.

If `SupportEmail` is set in the configuration, the error page will include a link to the given support email address.

To test the not found page, navigate to a URL that doesn't exist, e.g. `/not-found`.

To test the error page, navigate to `/error/test`, which is a fault-injection page included in the library, explicitly for testing the error page handling.

## Release Notes

### 2.3.0

Update libraries:
* [MOJ Frontend to v1.8.0 (from v1.6.6)](https://github.com/ministryofjustice/moj-frontend/blob/main/CHANGELOG.md)
* [jQuery to v3.7.1 (from v3.7.0)](https://github.com/jquery/jquery/releases).

### 2.2.1

Support BaseUrl inheritance in configured links.

### 2.2.0

When calling `Url<>()` on an alternative `FamilyHubsUiOptions`, if the Url isn't present in the alternative's Url config section, it will traverse the alternative's ancestors looking for the nearest instance of the Url.

This allows inheritance of Urls from ancestors, whilst still allowing the overriding of Urls.

### 2.1.0

Add support to allow link status to be set in config and/or during [Navigation|Action]Links() calls.

### 2.0.0

New major version as contains breaking changes.

Improvements to header links handling to provide more flexibility.

`ServiceName` in `FamilyHubsUiOptions` is now optional. This allows consumers to use components without having to use the layout or provide a dummy `ServiceName`.

Update [GOV.UK Frontend to v4.7.0](https://github.com/alphagov/govuk-frontend/releases).

### 1.16.0

Add ability to change header links per page.

See, `IFamilyHubsHeader.NavigationLinks()` and `IFamilyHubsHeader.ActionLinks()`.

### 1.15.1

Fix reference to our js file in the layout.

### 1.15.0

`_Layout.cshtml` now has a `Head` section for inserting page specific content at the end of the head section.

### 1.14.0

Support query params/fragment in the relativeUrl param to `FamilyHubsUiOptions.Url<>()`.

### 1.13.0

Add support for header and footer links that have a `BaseUrlKey` value that contains a path component.

### 1.12.0

Fix `FamilyHubsUiOptions.Url<>()` when the base URL has a path component.

### 1.11.0

Add `GetAlternative()` method to `FamilyHubsUiOptions` to get alternative service config.

### 1.10.0

Add `GetFamilyHubsUiOptions()` and other helper extension methods to ViewDataDictionary

### 1.9.0 & 1.8.0

Add support for alternative service layout by page (see Alternative example page)

### 1.7.0

Adds optional configurable link for the header (see `Header:ServiceNameLink`) 

### 1.6.0

Add `Url()` helper to FamilyHubsUiOptions

### 1.5.0

Adds:
* BaseUrlKey support in header and footer links

### 1.4.0

Adds:
* Url helpers (`Html.FamilyHubUrl` & `Html.FamilyHubConfigUrl`)
* static DontShow pagination instances (`IPagination.DontShow` & `ILinkPagination.DontShow`)

See the example site for usage.

Notes:
* This version requires `_ViewStart.cshtml` to not be overridden in the consuming project.
If you need to override `_ViewStart.cshtml`, ensure the contents of the version in this package is included in your overridden version. A later version might contain a helper for this.

## Possible ToDos

* move common readme sections into their own files and link to them from both package's readmes

* if url not in alternative, could look in parents (to reduce dupes)

* add partial to output an <a> from a FhLinkOptions? worth the bother??

* use config exceptions

* add sign out link on error pages if signed in

* navigation menu button visible on mobile if no nav links

* better way than solution folders/files for grouping files? show all files and no solution items perhaps?

* pick up jquery from cdn with a fallback to our own copy

* add uncompressed govuk js

* minify moj js

* move lib js into lib folder?

* chrome/.net sometimes seems to get confused by asp-append-version. it doesn't seem to pick up that the file's changed and fetches the correct file, but also picks stuff up from cache. find a solution
    <script src="~/js/app.js" asp-append-version="true"></script>
    or is it an issue with the map file?

* add _viewstart to rcl?

* use partial for error pages?

* finish documenting how to use as a consumer, and how to develop

* delete old wwwroot files on install?

* use asp-append-version to simplify updating versions??

* remove scripts support from private gulpfile? 

* Use Components/, rather than scripts and styles, a la govuk?

* only run postinstall script when consumer is installing, rather than running npm install locally

If you are using Windows, you can use a different approach to achieve the same behavior. One way to do this is to use a Node.js script to check the value of the npm_config_global environment variable and run the gulp task if necessary. Here’s an example of how you can do this:

// postinstall.js
const { spawn } = require('child_process');

if (process.env.npm_config_global !== 'true') {
  spawn('gulp', ['copy-packages-js'], { stdio: 'inherit' });
}
In this example, we have created a Node.js script postinstall.js that checks the value of the npm_config_global environment variable. If the value is not "true", then the script spawns a new process to run the gulp copy-packages-js command.

You can use this script as your postinstall script by adding it to the scripts section of your package.json file:

{
  "scripts": {
    "postinstall": "node postinstall.js"
  },
  "dependencies": {
    "gulp": "^4.0.2"
  }
}
With this setup, when you run npm install in your package’s source code directory or when you run npm install my-package to add the package as a dependency of another package, the postinstall.js script will be run and will check whether the package is being installed globally or not. If it is not being installed globally, then the copy-packages-js gulp task will be executed.
