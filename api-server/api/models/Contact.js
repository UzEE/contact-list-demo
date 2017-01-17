/**
 * Contact.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  schema: true,

  attributes: {

    id: {
      type: 'integer',
      unique: true,
      primaryKey: true,
      autoIncrement: true
    },

    name: {
      type: 'string',
      required: true
    },

    occupation: {
      type: 'string',
      enum: [
        'software engineer', 
        'graphic designer', 
        'film director', 
        'music producer',
        'student',
        'accountant',
        'business analyst'
      ],
      required: true
    },

    dateOfBirth: {
      type: 'datetime'
    },

    avatarUrl: {
      type: 'string',
      url: true
    }
  }
};

