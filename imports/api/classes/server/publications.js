/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';

import { Classes } from '../classes.js';


Meteor.publish('classes', function listsPrivate() {
  if (!this.userId) {
    return this.ready();
  }

  return Classes.find({
    userId: this.userId,
  }, {
    fields: Classes.publicFields,
  });
});
