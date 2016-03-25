[x] Add tests to make sure the files are split and small (node tests)
[x] Bring packages-resolver (and hard code JS)
[x] Move packages to packages/
[x] Lazy load JS
  [x] Split Router.map?
  [x] Dynamically determine the package to load for a given route
  [x] Test LOG_TRANSITIONS_INTERNAL
  [ ] Test Engines to ensure allignment
[ ] Lazy load CSS
[ ] Add links and link-to across routes.
  It fails if the route isn't defined (Router.map). Solutions:
    1. We could funnel all the routes from all the packages into boot, that way we can load everything upfront (and even remove the use of DSL). However, this will break the catch-all approach used for lazy-loading.
    2. We could use our own link-to helper that will just do a transitionTo, but won't be able to render an anchor tag since we can't resolve the URL from the routeName.
## minor:
[ ] Decide how to run packages tests. See engines.

## Reuse

[ ] Consider splitting for better re-use
  Move to an addon:
    package-name generator and add them to config/environment changes to get packageNames
    create a Package object that inherits from EmberApp and takes a config override to clean ember-cli-build
    Create an EmberAppWithPackages app that does packages and app and takes overrides for both.
    Expose resolver for consuming app
    Lazy-loader: catch-all route, service:lazy-loader, util:lazy-routing-configuration

## Later:

[ ] Add support for bundles
  Nested routes
  More than one route per bundle
  More than one package per bundle (concat)
  Bundle dependencies

### Perf

[ ] Remove environment/config from packages since it's already in boot.
  Consider overriding all of  `EmberApp.prototype.javascript` or at least `this.concatFiles(appJs` to remove the `app-config.js` footerFile
[ ] Test perf
