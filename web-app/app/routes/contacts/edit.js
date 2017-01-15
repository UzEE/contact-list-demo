import Ember from 'ember';

export default Ember.Route.extend({

  model(params) {
    return this.store.findRecord('contact', params.contact_id);
  },

  setupController(controller, model) {
    
    this._super(controller, model);

    controller.set('title', 'Edit Contact');
    controller.set('buttonTitle', 'Save Contact');
    controller.set('showDelete', true);
  },

  // use the shared template for both .new and .edit routes
  renderTemplate() {
    this.render('contacts/editor');
  },

  actions: {

    saveContact(contact) {

      // if there isn't anything to update, just leave
      if (!contact.get('hasDirtyAttributes')) {
        return;
      }

      contact.save().then(() => {
        this.transitionTo('contacts.detail', contact.id);
      });
    },

    cancelEdit(contact) {

      this.controller.get('model').rollbackAttributes();
      this.transitionTo('contacts.detail', contact.id);
    },

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

      const model = this.controller.get('model');

      // check if there are unsaved changes to the model and warn the user
      if (model.get('hasDirtyAttributes')) {

        // TODO: need to replace this with a better modal
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
