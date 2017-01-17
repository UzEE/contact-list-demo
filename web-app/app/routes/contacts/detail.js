import Ember from 'ember';

export default Ember.Route.extend({

  model(params) {
    return this.get('store').findRecord('contact', params.contact_id);
  },

  setupController(controller, model) {

    this._super(...arguments);

    controller.set('isEditMode', false);
    controller.set('transitionModal', false);

    controller.set('deleteContact', (contact) => {

      contact.destroyRecord().then(() => {

        controller.set('confirmRemove', false);
        this.transitionTo('contacts');
      });
    });

    controller.set('continueTransition', () => {

      const transition = controller.get('transition');

      this.controller.set('transitionModal', false);
      controller.set('isEditMode', false);
      controller.get('model').rollbackAttributes();

      transition.retry();
    });
  },

  actions: {

    willTransition(transition) {

      const isEditMode = this.controller.get('isEditMode');

      if (!isEditMode) {
        return;
      }

      // check if there are unsaved changes to the model and warn the user
      if (this.controller.get('model').get('hasDirtyAttributes')) {

        this.controller.set('transitionModal', true);
        this.controller.set('transition', transition);
        transition.abort();

      } else {

        this.controller.set('isEditMode', false);
      }
    }
  }
});
