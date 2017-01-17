/**
 * Contact.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

const fs = require('fs');
const path = require('path');

function deleteAvatarFromDisk(avatarPath) {
  fs.unlink(avatarPath);
}

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
  },

  // afterDestroy: function (contacts, cb) {

  //   for (const contact of contacts) {

  //     if (!contact.avatarUrl) continue;

  //     const picture = path.resolve(sails.config.appPath, 'assets/images/uploads', contact.avatarUrl.substring(contact.avatarUrl.lastIndexOf('/') + 1));
  //     deleteAvatarFromDisk(picture);
  //   }

  //   cb();
  // }
};
