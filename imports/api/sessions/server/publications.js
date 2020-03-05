/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';

import { Sessions } from '../sessions';


Meteor.publish('activeSession', function activeSession() {
    if (!this.userId) {
    return this.ready();
  }

  const sessions = Sessions.find({
    userId: this.userId,
    active: true
  });
  return sessions
});

Meteor.publish('session.forClass', function sessionForClass(params) {
  new SimpleSchema({
    classId: { type: String },
  }).validate(params);

  const { classId } = params;

  if (!this.userId) {
    return this.ready();
  }
  const sessions = Sessions.find({
    userId: this.userId,
    classId: classId
  });

  return sessions
});

Meteor.publish('session', function activeSession(params) {
  if (!this.userId) {
  return this.ready();
}

new SimpleSchema({
  sessionId: { type: String },
}).validate(params);

const { sessionId } = params;

const sessions = Sessions.find({
  userId: this.userId,
  _id: sessionId
});
return sessions
});
