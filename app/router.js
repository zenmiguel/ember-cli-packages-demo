import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  //This will catch all the invalid routes.
  this.route('catchAll', {path: '*:'});
  this.route('boot');
  this.route('package1');
  this.route('package2');
});

export default Router;
