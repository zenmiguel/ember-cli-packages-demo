/* globals require*/
import Ember from 'ember';
import config from '../config/environment';
import routingConfigUtil from 'ember-cli-packages-demo/utils/lazy-routing-configuration';

const loadedBundles = {};
config.bundles.forEach(bundle=>loadedBundles[bundle.name] = false);

export default Ember.Service.extend({
  // TODO: consider moving to  really need to inject this or if it's better to get as an import as @nathanhammond suggested
  // TODO: consider removing the $ dependency
  // ajax: Ember.inject.service(),
  isBundleLoaded (bundleName) {
    return loadedBundles[bundleName];
  },
  getBundleForUrl (url) {
    return config.bundles.find(bundle=>
      bundle.handledRoutesPatterns.any(pattern=>
        url.match(pattern)));
  },
  loadBundleForUrl (url) {
    return this.loadBundle(this.getBundleForUrl(url));
  },
  loadBundle (bundle) {
    if (this.isBundleLoaded(bundle.name)) {
      return Ember.RSVP.resolve();
    }
    // TODO: figure out how to thumbprint this
    // TODO: change to use ember-ajax instead of $.getScript
    return new Ember.RSVP.Promise((resolve, reject)=>{
      const get = Ember.$.ajax({
        dataType: "script",
        cache: true,
        url: `/assets/${bundle.name}.js`
      });
      get.done(()=> {
        loadedBundles[bundle.name] = true;
        bundle.packages.forEach(packageName=>{
          this._addRoutesForPackage(packageName);
        });
        Ember.run(null, resolve);
      });
      get.fail((jqXHR)=>Ember.run(null, reject, jqXHR));
    });
  },
  _addRoutesForPackage (packageName) {
    const MainRouter = this.get('container').lookup('router:main');
    const PackageRouter = require(`${packageName}/router`);
    if (PackageRouter && PackageRouter.default) {
      routingConfigUtil.mergeRouters(MainRouter, PackageRouter.default);
    }
  }
});
