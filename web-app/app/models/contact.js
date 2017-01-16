import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({

  name: DS.attr('string'),
  occupation: DS.attr('string'),
  dateOfBirth: DS.attr('date'),
  avatarUrl: DS.attr('string'),

  displayName: Ember.computed('isNameValid', function () {
    return this.get('isNameValid') ? this.get('name') : '(Unknown Person)';
  }),

  // a valid name can have any character as long as it's not just whitespace
  isNameValid: Ember.computed('name', function () {
    
    const name = this.get('name');

    return !Ember.isEmpty(name);
  }),

  isOccupationValid: Ember.computed.gte('occupation.length', 1),
  isDateOfBirthValid: Ember.computed('dateOfBirth', function () {

    const dateOfBirth = this.get('dateOfBirth');

    // we only need to check if Date of Birth isn't in the future
    // everything else is fine since people can add newborns in their
    // contact lists
    return dateOfBirth < new Date();
  }),

  hasAvatar: Ember.computed('avatarUrl', function () {

    const url = this.get('avatarUrl');
    
    // borrowed from: https://github.com/kevva/url-regex/blob/master/index.js
    const protocol = '(?:(?:[a-z]+:)?//)';
    const auth = '(?:\\S+(?::\\S*)?@)?';
    const host = '(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)';
    const domain = '(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*';
    const tld = '(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))\\.?';
    const port = '(?::\\d{2,5})?';
    const path = '(?:[/?#][^\\s"]*)?';
    const regex = `(?:${protocol}|www\\.)${auth}(?:localhost|${host}${domain}${tld})${port}${path}`;

    return (new RegExp(regex, 'ig')).test(url);
  }),

  getAvatarUrl: Ember.computed('avatarUrl', function () {

    if (this.get('hasAvatar')) {
      return this.get('avatarUrl');
    }

    // we are hardcoding the thumbnail size here
    return `http://api.adorable.io/avatars/480/${this.get('displayName').underscore()}.png`;
  }),

  isValidForSaving: Ember.computed.and('isNameValid', 'isOccupationValid', 'isDateOfBirthValid', 'hasDirtyAttributes')
});
