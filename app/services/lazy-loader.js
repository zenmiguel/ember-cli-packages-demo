import Ember from 'ember';
import config from '../config/environment';

const loadaedModules = {};
config.packageNames.forEach(packageName=>loadaedModules[packageName] = false);

export default Ember.Service.extend({
  // TODO: consider moving to  really need to inject this or if it's better to get as an import as @nathanhammond suggested
  // TODO: consider removing the $ dependency
  // ajax: Ember.inject.service(),
  isPackageLoaded (packageName) {
    return loadaedModules[packageName];
  },
  withPackage (packageName) {
    if (loadaedModules[packageName]) {
      return Ember.RSVP.resolve();
    }
    // TODO: figure out how to thumbprint this
    // TODO: change to use ember-ajax instead of $.getScript
    return new Ember.RSVP.Promise((resolve, reject)=>{
      const get = Ember.$.ajax({
        dataType: "script",
        cache: true,
        url: `/assets/${packageName}.js`
      });
      get.done(()=> {
        loadaedModules[packageName] = true;
        Ember.run(null, resolve);
      });
      get.fail((jqXHR)=>Ember.run(null, reject, jqXHR));
    });
  }
});
