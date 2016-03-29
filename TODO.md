[x] Add tests to make sure the files are split and small (node tests)
[x] Bring packages-resolver (and hard code JS)
[x] Move packages to packages/
[x] Lazy load JS
  [x] Split Router.map?
  [x] Dynamically determine the package to load for a given route
  [x] Test LOG_TRANSITIONS_INTERNAL
  [x] Test Engines to ensure allignment
[x] Lazy load CSS


## Reuse

[x] Consider splitting for better re-use
  Move to an addon:
    [x] package-name generator and add them to config/environment changes to get packageNames
    [x] bundle
    create a Package object that inherits from EmberApp and takes a config override to clean ember-cli-build
    Create an EmberAppWithPackages app that does packages and app and takes overrides for both.
    Expose from addon 
    [x] resolver 
    [x] service:lazy-loader, 
    [x] util:lazy-routing-configuration
    [x] catch-all route, 

