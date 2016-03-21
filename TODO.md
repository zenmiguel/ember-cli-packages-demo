[x] Add tests to make sure the files are split and small (node tests)
[x] Bring packages-resolver (and hard code JS)
[x] Move packages to packages/
[x] Lazy load JS
  [ ] Split Router.map? 
  [ ] Test Engines to ensure allignment
  [ ] For a dev build, maybe do everything sync and drop lazy
[ ] Lazy load CSS
[ ] Add links and link-to across routes. 

## minor:
[ ] Decide how to run tests. See engines. 
[ ] Generate .js tags dynamically for package1 and package2. It might not be needed after lazy loading of JS 

## Reuse

[ ] Consider splitting for better re-use
  Move to an addon: 
    package-name, config/environment changes to get packageNames
    create a Package that inherits from EmberApp and takes a config override
    Create an EmberAppWithPackages app that does packages and app and takes overrides for both. 
    Expose resolver for consuming app
    Lazy-loader: route, catch-all route and background loader

## Later:

[ ] Add support for bundles

### Perf

[ ] Remove environment/config from packages since it's already in boot. 
  Consider overriding all of  `EmberApp.prototype.javascript` or at least `this.concatFiles(appJs` to remove the `app-config.js` footerFile
[ ] Test perf
