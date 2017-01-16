import DS from 'ember-data';
import ENV from '../config/environment';

export default DS.JSONAPIAdapter.extend({
  
  // since we're running our API from a different server, we need to change default host
  host: ENV.APP.API_HOST
});
