/* globals require*/
import Ember from 'ember';
import routingConfigUtil from 'ember-cli-packages-demo/utils/lazy-routing-configuration';

var retried = false;
export default Ember.Route.extend({
  lazyLoader: Ember.inject.service(),
  redirect: function (model, transition) {
    if (retried) {
      // Shortcircuit this in case the download fails.
      retried = !retried;
      return;
    }
    retried = !retried;
    transition.abort();
    this.get('lazyLoader').withPackage('package1').then(()=>{
      const MainRouter = this.get('container').lookup('router:main');
      const PackageRouter = require('package1/router');
      if (PackageRouter && PackageRouter.default) {
        routingConfigUtil.mergeRouters(MainRouter, PackageRouter.default);
        transition.retry();
      }
    });
  }
});
