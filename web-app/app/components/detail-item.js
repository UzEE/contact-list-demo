import Ember from 'ember';

export default Ember.Component.extend({

  classNames: ['form-group'],

  isEditMode: false,

  actions: {

    enableEditMode() {

      if (!this.get('isEditMode')) {
        this.set('isEditMode', true);
      }
    },

    disableEditMode() {

      if (this.get('isEditMode')) {
        this.set('isEditMode', false);
      }
    }
  }
});
