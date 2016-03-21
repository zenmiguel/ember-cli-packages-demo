import Ember from 'ember';
import config from 'ember-cli-packages-demo/config/environment';

const PackageRouter = Ember.Router.extend({
  location: config.locationType
});

PackageRouter.map(function() {
  this.route('package1');
});

var retried = false;
export default Ember.Route.extend({
  lazyLoader: Ember.inject.service(),
  redirect: function (model, transition) {
    if (retried) {
      retried = !retried;
      return;
    }
    retried = !retried;
    transition.abort();
    this.get('lazyLoader').withPackage('package1').then(()=>{
      this._appendNewRoutesToTheRouter();
      transition.retry();
    });
  },

  _appendNewRoutesToTheRouter() {
    const MainRouter = this.get('container').lookup('router:main');

    MainRouter.router.recognizer.map(this._getDSL(), function(recognizer, routes) {
      for (var i = routes.length - 1, proceed = true; i >= 0 && proceed; --i) {
        var route = routes[i];
        recognizer.add(routes, { as: route.handler });
        proceed = route.path === '/' || route.path === '' || route.handler.slice(-6) === '.index';
      }
    });
  },

  _getDSL () {
    var dslCallbacks = PackageRouter.dslCallbacks;
    var dsl = new Ember.RouterDSL(null, {
      // enableLoadingSubstates: !!moduleBasedResolver
      enableLoadingSubstates: false
    });

    function generateDSL() {
      this.resource('application', { path: "/", overrideNameAssertion: true }, function() {
        for (var i=0; i < dslCallbacks.length; i++) {
          dslCallbacks[i].call(this);
        }
      });
    }

    generateDSL.call(dsl);

    // if (Ember.get(this, 'namespace.LOG_TRANSITIONS_INTERNAL')) {
    //   router.log = Ember['default'].Logger.debug;
    // }

    // router.map(dsl.generate());
    return dsl.generate();
  }
});
