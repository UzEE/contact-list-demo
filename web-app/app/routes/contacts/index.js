import Ember from 'ember';

export default Ember.Route.extend({

  setupController(controller, model) {

    this._super(controller, model);

    // set isIndex flag on parent controller to true
    // this will make contact list full width for mobile devices
    this.controllerFor('contacts').set('isIndex', true);
  },

  deactivate() {
    this.controllerFor('contacts').set('isIndex', false);
  }
});
