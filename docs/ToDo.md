# Potential improvements

* once all consumers are using error next, rename it to error

* accessible-autocomplete uses inline styles. might have to move them into css as our CSP bans inline styles

* fix accessible-autocomplete map file

* add support for custom columns width to the dashboard. either/both https://design-system.service.gov.uk/components/table/ and custom css widths

* error summary tag helper?

* copy code from .net for asp-page etc for summary list tag helper as alternatives for action hrefs

* change how we handle changing the header, so instead (or in addition to) of the code behind file implementing the interface, allow the user to add a service to the service collection. that should allow us to move all the error pages into the shared components, but still let the consumer decide on what goes in the header

* add postcode search from Find?

* add typescript compilation to the example site

* default back button to home page if javascript disabled, rather than removing it? configurable? or get referrer in c# instead

* update docs and have more examples

* move rest of common readme sections into their own files and link to them from both package's readmes

* add tag helper/partial to output an <a> from a FhLinkOptions? worth the bother??

* use config exceptions

* add sign out link on error pages if signed in

* add 401/403 error pages

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

If you are using Windows, you can use a different approach to achieve the same behavior. One way to do this is to use a Node.js script to check the value of the npm_config_global environment variable and run the gulp task if necessary. Here�s an example of how you can do this:

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
With this setup, when you run npm install in your package�s source code directory or when you run npm install my-package to add the package as a dependency of another package, the postinstall.js script will be run and will check whether the package is being installed globally or not. If it is not being installed globally, then the copy-packages-js gulp task will be executed.
