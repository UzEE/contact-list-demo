import Ember from 'ember';

export default Ember.Route.extend({

  model(params) {
    return this.get('store').findRecord('contact', params.contact_id);
  },

  setupController(controller, model) {

    this._super(...arguments);

    controller.set('isEditMode', false);
  },

  actions: {

    deleteContact(contact) {
      
      // TODO: need to replace this with a better modal
      const confirmation = confirm('Are you sure you want to delete the record?');

      if (confirmation) {

        contact.destroyRecord().then(() => {
          this.transitionTo('contacts');
        });
      }
    },

    willTransition(transition) {

      const isEditMode = this.controller.get('isEditMode');

      if (!isEditMode) {
        return;
      }

      // check if there are unsaved changes to the model and warn the user
      if (this.controller.get('model').get('hasDirtyAttributes')) {

        // TODO: need to replace this with a better modal
        let confirmation = confirm('Are you sure you want to discard your changes?');

        if (confirmation) {

          this.controller.set('isEditMode', false);
          this.controller.get('model').rollbackAttributes();

        } else {
          transition.abort();
        }
      } else {

        this.controller.set('isEditMode', false);
      }
    }
  }
});
