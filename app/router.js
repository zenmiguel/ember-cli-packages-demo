import Ember from 'ember';

const Router = Ember.Router.extend();

Router.map(function() {
  //This will catch all the invalid routes, try to load its package (or bundle) and then loads its route
  this.route('catchAll', {path: '*:'});
  this.route('boot');
});

export default Router;
