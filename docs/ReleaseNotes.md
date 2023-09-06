## Release Notes

### 3.0.0

Breaking changes:

The class `app-back-link` has been renamed to `fh-back-link`.

The behaviour of back links with the class has also been changed, to not show the back link, if the page has been opened in a new tab.

### 2.5.0

Rename `custom-main` class on the `<main>` element to `app-custom-main`.

### 2.4.0

Add `PathPrefix` to `FamilyHubsUiOptions`. If supplied,
the prefix will be prepended to all files included through the layout,
e.g. css, js and asset files.

Useful for when the site is being used behind an App Gateway using path based routing.

### 2.3.1

Update phase banner wording.

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

### 1.3.0 and below

Lost in the mists of time.