/**
 * ContactController
 *
 * @description :: Server-side logic for managing Contacts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const path = require('path');

module.exports = {

  uploadPicture(req, res) {

    req.file('picture').upload({
      dirname: path.resolve(sails.config.appPath, 'assets/images/uploads')
    },(err, files) => {

      if (err) {
        return res.badRequest('Something went wrong with the upload', err);
      }

      Contact.findOne({ id: req.params.id })
        .then(contact => {

          contact.avatarUrl = `${sails.getBaseUrl()}/pictures/${path.basename(files[0].fd)}`;
          contact['avatar-url'] = contact.avatarUrl;

          contact.save((err) => {

            if (err) {
              return res.send(500, err);
            }

            return res.send(contact);
          })

        }).catch(err => {
          return res.send(500, err);
        });
    });
  },

  getPicture(req, res) {

    const picture = path.resolve(sails.config.appPath, 'assets/images/uploads', req.params.picture);
    const fs = require('fs');

    const d = new Date();
    res.set("Date", d.toUTCString());

    d.setDate(d.getDate() - 2);
    res.set("Last-Modified", d.toUTCString());

    d.setFullYear(d.getFullYear() + 1);
    res.set("Expires", d.toUTCString());

    res.set("Content-Type", "image/png");
    res.set("Cache-Control", "public, mas-age=31536000");

    fs.createReadStream(picture).pipe(res);
    return;
  }
};

