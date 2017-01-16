import Ember from 'ember';

export default Ember.Route.extend({

  model() {
    return this.get('store').createRecord('contact');
  },

  actions: {

    onContactSave(contact) {
      this.transitionTo('contacts.detail', contact.id);
    },

    onCancel(contact) {

      if (!contact) {
        this.transitionTo('contacts');
      } else {
        this.transitionTo('contacts.detail', contact.id);
      }
    },

    willTransition(transition) {

      const model = this.controller.get('model');

      // check if there are unsaved changes to the model and warn the user
      if (model.get('hasDirtyAttributes')) {

        // TODO: need to replace this with a better modal
        let confirmation = confirm('Are you sure you want to continue without adding your contact?');

        if (confirmation) {

          this.controller.get('model').rollbackAttributes();

        } else {
          transition.abort();
        }
      }
    }
  }
});
