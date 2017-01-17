import Ember from 'ember';

export default Ember.Component.extend({

  classNames: ['thumbnail'],

  uploadTitle: "Step 1: Select a Picture",
  uploadLabel: "Upload Picture",
  allowUpload: Ember.computed.not('model.hasAvatar'),

  actions: {

    removePicture(model) {

      model.set('avatarUrl', null);

      model.save().then(() => {
        this.set('confirmRemove', false);
      });
    },

    cancelUpload() {
      this.set('uploadModal', false);
    },

    handleUpload() { console.log('Handle upload...'); },

    // file-picker actions
    fileLoaded(file) {

      this.set('uploadTitle', 'Step 2: Crop your Picture');

      console.log(file);
    }
  }
});
