import Ember from 'ember';

export default Ember.Route.extend({

  model() {
    return this.get('store').createRecord('contact');
  },

  actions: {

    createContact(newContact) {

      newContact.save().then((response) => {
        this.transitionTo('contacts.detail', response.id);
      });
    },

    cancelCreate() {

      this.controller.get('model').rollbackAttributes();
      this.transitionTo('contacts');
    },

    willTransition(transition) {

      const model = this.controller.get('model');

      // check if there are unsaved changes to the model and warn the user
      if (model.get('hasDirtyAttributes')) {

        let confirmation = confirm('Are you sure you want to discard your changes?');

        if (confirmation) {

          this.controller.get('model').rollbackAttributes();

        } else {
          transition.abort();
        }
      }
    }
  }
});
