import Ember from 'ember';

export default Ember.Component.extend({

  classNames: ['thumbnail'],

  actions: {

    removePicture(model) {

      model.set('avatarUrl', null);

      model.save().then(response => {
        this.set('confirmRemove', false);
      });
    },
  }
});
