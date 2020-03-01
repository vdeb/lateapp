/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';

import { Sessions } from '../sessions';


Meteor.publish('activeSession', function activeSession() {
    if (!this.userId) {
    return this.ready();
  }

  const sessions = Sessions.find({
    userId: this.userId,
  });
  return sessions
});
