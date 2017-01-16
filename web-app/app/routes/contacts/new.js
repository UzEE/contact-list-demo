import Ember from 'ember';

export default Ember.Route.extend({

  model() {
    return this.get('store').createRecord('contact');
  },

  setupController(controller, model) {
    
    this._super(controller, model);

    controller.set('title', 'Add New Contact');
    controller.set('buttonTitle', 'Add Contact');
    controller.set('showDelete', false);
  },

  // use the shared template for both .new and .edit routes
  renderTemplate() {
    this.render('contacts/editor');
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
