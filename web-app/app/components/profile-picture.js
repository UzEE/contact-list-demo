import Ember from 'ember';
import ENV from '../config/environment';

export default Ember.Component.extend({

  classNames: ['thumbnail'],

  uploadTitle: 'Step 1: Select a Picture',
  uploadLabel: 'Upload Picture',
  allowUpload: false,
  
  showCroppie: false,
  croppie: null,

  actions: {

    removePicture(model) {

      model.set('avatarUrl', null);

      model.save().then(() => {
        this.set('confirmRemoveModal', false);
      });
    },

    cancelUpload() {
      this.set('uploadModal', false);
    },

    handleUpload() { 

      this.set('allowUpload', false);
      this.set('uploadLabel', 'Please wait...');
      
      const crop = this.get('croppie');

      crop.result({ type: 'blob', size: { width: 500 }}).then((blob) => {

        const data = new FormData();
        data.append('picture', blob, 'profile-picture.png');

        Ember.$.ajax({

          url: `${ENV.APP.API_HOST}${ENV.APP.PICTURE_UPLOAD_URL.replace('__id__', this.get('model').get('id'))}`,
          type: 'POST',
          data,
          contentType: false,
          processData: false
        
        }).then((response) => {

          const model = this.get('model');
          model.set('avatarUrl', response.avatarUrl);

          model.save().then(result => {

            this.set('uploadLabel', 'Upload Picture');
            this.set('uploadModal', false);
          
            crop.destroy();
            this.set('croppie', null);
            this.set('showCroppie', false);
            this.set('uploadTitle', 'Step 1: Select a Picture');
          });
        });
      });
    },

    // file-picker actions
    fileLoaded(file) {

      this.set('uploadTitle', 'Step 2: Crop your Picture');

      const crop = new Croppie(Ember.$('.picture-crop-preview')[0], {

        viewport: {
          width: 400,
          height: 400
        }
      });

      crop.bind({ url: file.data });
      this.set('croppie', crop);

      this.set('showCroppie', true);
      this.set('allowUpload', true);
    }
  }
});
