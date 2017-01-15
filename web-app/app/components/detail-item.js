import Ember from 'ember';

export default Ember.Component.extend({

  classNames: ['form-group'],

  globalEdit: false,
  isEditMode: false,

  globalEditChanged: Ember.observer('globalEdit', function () {

    if (!this.get('globalEdit')) {
      this.set('isEditMode', false);
    }
  }),

  actions: {

    enableEditMode() {

      if (!this.get('isEditMode')) {

        this.set('isEditMode', true);

        if (!this.get('globalEdit')) {
          this.set('globalEdit', true);
        }
      }
    },

    disableEditMode() {

      if (this.get('isEditMode')) {
        this.set('isEditMode', false);
      }
    }
  }
});
