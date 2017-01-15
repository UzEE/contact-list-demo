import Ember from 'ember';

export default Ember.Component.extend({

  // hardcode the occupation list for now until we find a better way to share
  occupationList: [   
    'software engineer', 
    'graphic designer', 
    'film director', 
    'music producer',
    'student',
    'accountant',
    'business analyst'
  ]
});
