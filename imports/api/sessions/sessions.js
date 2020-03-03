import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { _ } from 'underscore';

import { Students } from '../students/students.js';
import { Classes } from '../classes/classes.js';

class SessionsCollection extends Mongo.Collection {

    insert(session, callback) {
        const ourSession = session;
        if (!ourSession.name) {
            console.log("Session Name not defined");
            ourSession.name = `Session du ${ourSession.sessionDate.toLocaleString('fr')}`;
        }

        ourSession.students = Students.find({ classId: ourSession.classId }).fetch();
        _.each(ourSession.students, (student) => (student.isAbsent = false));
        // An active session is an ongoing one
        ourSession.active = true;
    
        return super.insert(ourSession, callback);
      }
}

export const Sessions = new SessionsCollection('sessions');

// Deny all client-side updates since we will be using methods to manage this collection
Sessions.deny({
    insert() { return true; },
    update() { return true; },
    remove() { return true; },
  });

  const studentSchema = Students.schema.pick("name",  "surname", "sex", "nationality", "schoolId", "classId", "createdAt")
  studentSchema.extend({
      _id: {
          type: String, 
          regEx: SimpleSchema.RegEx.Id
        },
      isAbsent: {
          type: Boolean,
          defaultValue: false
      },
      arrivedAt: {
          type: Date,
          optional: true
      }
    })

  Sessions.schema = new SimpleSchema({
    name: {
        type: String,
        max: 50,
        optional: true,
    },
    sessionDate: {
        type: Date,
    },
    active: {
        type: Boolean
    },
    classId: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
    },
    userId: { 
        type: String,
        regEx: SimpleSchema.RegEx.Id,
    },
    students: {
        type: Array,
    },
    'students.$': {
        type: studentSchema,
    },
    createdAt: {
        type: Date,
        defaultValue: new Date(),
    }
  });

  Sessions.attachSchema(Sessions.schema);

  Sessions.helpers({
      class() {
          return Classes.findOne(this.classId);
      },
      editableBy(userId) {
          return this.class().editableBy(userId);
      }
  });