import DS from 'ember-data';

export default DS.JSONAPIAdapter.extend({
  
  // since we're running our API from a different server, we need to change default host
  host: 'http://localhost:1337'
});
