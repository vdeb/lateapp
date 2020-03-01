import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

import { Sessions } from './sessions.js' ;
import { SimpleSchema } from 'simpl-schema/dist/SimpleSchema';

export const insert = new ValidatedMethod({
    name: 'sessions.insert',
    validate: new SimpleSchema({
        name: {
            type: String,
            optional: true,
        },
        sessionDate: {
            type: Date,
        },
        classId: {
            type: String,
            regEx: SimpleSchema.RegEx.Id,
        }
    }).validator(),
    run({ name, sessionDate, classId }) {
      return Sessions.insert({ name, sessionDate, classId, userId: this.userId });
    },
  });

  export const endClass = new ValidatedMethod({
    name: 'sessions.endClass',
    validate: new SimpleSchema({
        sessionId: {
            type: String,
            regEx: SimpleSchema.RegEx.Id,
          }
    }).validator(),
    run({ sessionId }) {
      Sessions.update(
          { _id: sessionId, userId: this.userId },
          { $set: {active: false}})
    }
});

  export const logLate = new ValidatedMethod({
      name: 'sessions.logLate',
      validate: new SimpleSchema({
          sessionId: {
              type: String,
              regEx: SimpleSchema.RegEx.Id,
            },
          studentId: {
            type: String,
            regEx: SimpleSchema.RegEx.Id,
          },
          arrivedAt: {
            type: Date,
            defaultValue: new Date(),
          }
      }).validator(),
      run({ sessionId, studentId, arrivedAt }) {
        Sessions.update(
            { _id: sessionId, userId: this.userId, "students._id": studentId },
            { $set: {"students.$.arrivedAt": arrivedAt}})
      }
  });

  export const LogAbsence = new ValidatedMethod({
    name: 'sessions.logAbsence',
    validate: new SimpleSchema({
        sessionId: {
            type: String,
            regEx: SimpleSchema.RegEx.Id,
          },
        studentId: {
          type: String,
          regEx: SimpleSchema.RegEx.Id,
        }
    }).validator(),
    run({ sessionId, studentId }) {
      Sessions.update(
          { _id: sessionId, userId: this.userId, "students._id": studentId },
          { $set: {"students.$.isAbsent": true}})
    }
});