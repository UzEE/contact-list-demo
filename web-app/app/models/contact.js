import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({

  name: DS.attr('string'),
  occupation: DS.attr('string'),
  dateOfBirth: DS.attr('date'),
  avatarUrl: DS.attr('string'),

  displayName: Ember.computed('name', function () {
    
    const name = this.get('name');

    return (typeof name === 'undefined' || name === null || !name.length) ? '(Unknown Person)' : name;
  }),

  isNameValid: Ember.computed.gte('name.length', 1),
  isOccupationValid: Ember.computed.gte('occupation.length', 1),
  isDateOfBirthValid: Ember.computed('dateOfBirth', function () {

    const dateOfBirth = this.get('dateOfBirth');

    // we only need to check if Date of Birth isn't in the future
    // everything else is fine since people can add newborns in their
    // contact lists
    return dateOfBirth < new Date();
  }),

  isValidForSaving: Ember.computed.and('isNameValid', 'isOccupationValid', 'isDateOfBirthValid')
});
