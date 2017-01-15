import Ember from 'ember';

export default Ember.Route.extend({

  model(params) {
    return this.get('store').findRecord('contact', params.id);
  },

  setupController(controller, model) {

    this._super(...arguments);

    controller.set('today', new Date());
    controller.set('globalEdit', false);
  },

  actions: {

    updateContact(contact) {

      // if there isn't anything to update, just leave
      if (!contact.get('hasDirtyAttributes')) {
        return;
      }

      contact.save().then(() => {
        controller.set('globalEdit', false);
      });
    },

    cancelUpdate() {

      this.controller.get('model').rollbackAttributes();
      this.controller.set('globalEdit', false);
    },

    deleteContact(contact) {
      
      const confirmation = confirm('Are you sure you want to delete the record?');

      if (confirmation) {

        contact.destroyRecord().then(() => {
          this.transitionTo('contacts');
        });
      }
    }
  }
});
