import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  //This will catch all the invalid routes.
  this.resource('catchAll', {path: '*:'});
});

export default Router;
