import Ember from 'ember';

export default Ember.Route.extend({

  // fetch all models from the server
  model() {
    return this.get('store').findAll('contact');
  }
});
