[ ] Add tests to make sure the files are split and small (node tests)
[ ] Bring packages-resolver (and hard code JS)
[ ] Lazy load CSS
[ ] Lazy load JS
  [ ] Add tests for JS lazy loader
[ ] Add links and link-to across routes. 
[ ] Remove environment/config from packages since it's already in boot. 
  Consider overriding all of  `EmberApp.prototype.javascript` or at least `this.concatFiles(appJs` to remove the `app-config.js` footerFile

minor:
[ ] Makes sure that the `'ember-cli-packages-demo/config/environment'` is only generated for app and not for each addon.   throw new Error('Could not read config from meta tag with name "' + metaName + '".');


*Later:*

[ ] Add support for bundles
