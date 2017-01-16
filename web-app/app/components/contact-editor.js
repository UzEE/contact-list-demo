import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['form-horizontal'],

  // hardcode the occupation list for now until we find a better way to share
  occupationList: [   
    'software engineer', 
    'graphic designer', 
    'film director', 
    'music producer',
    'student',
    'accountant',
    'business analyst'
  ],

  today: new Date(),
  isEditMode: false,

  actions: {

    saveContact(contact) {

      // disable edit mode
      this.set('isEditMode', false);

      // if there isn't anything to update, just leave
      if (!contact.get('hasDirtyAttributes')) {
        return;
      }

      // save changes and then raise saved event
      contact.save().then((response) => {
        this.sendAction('onContactSave', response);
      });
    },

    cancelChanges(contact) {

      // disable edit mode
      this.set('isEditMode', false);

      // cancel changes and raise cancel event
      if (contact.get('isNew')) {

        contact.rollbackAttributes();
        this.sendAction('onCancel');
      
      } else {

        contact.rollbackAttributes();
        this.sendAction('onCancel', contact);
      }
    },
  }
});
