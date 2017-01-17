import DS from 'ember-data';
import Ember from 'ember';

const camelize = Ember.String.camelize;

export default DS.JSONAPISerializer.extend({

  keyForAttribute: function(attr, method) {
    return camelize(attr);
  }
});
