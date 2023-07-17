# FamilyHubs.SharedKernel.Razor

## Release Notes

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
