/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';

import { Sessions } from '../sessions';


Meteor.publish('activeSession', function activeSession() {
  if (!this.userId) {
    return this.ready();
  }

  return Sessions.findOne({
    userId: this.userId,
  }, {
    fields: { _id: 1 },
  });
});
