import Ember from 'ember';
import config from 'ember-cli-packages-demo/config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('package1');
});

export default Router;
