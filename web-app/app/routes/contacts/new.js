import Ember from 'ember';

export default Ember.Route.extend({

  model() {
    return this.get('store').createRecord('contact');
  },

  setupController(controller, model) {

    this._super(...arguments);

    controller.set('transitionModal', false);
    controller.set('continueTransition', () => {

      const transition = controller.get('transition');

      this.controller.set('transitionModal', false);
      controller.get('model').rollbackAttributes();

      transition.retry();
    });
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

        this.controller.set('transitionModal', true);
        this.controller.set('transition', transition);
        transition.abort();
      }
    }
  }
});
