import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

import { Students } from '../students/students.js';

class SessionsCollection extends Mongo.Collection {

    insert(session, callback) {
        const ourSession = session;
        if (!ourSession.name) {
            console.log("Name not defined");
            ourSession.name = `Session du ${ourSession.sessionDate}`;
        }

        const studentsList = Students.find({}).fetch();
        console.log(studentsList);
        ourSession.students = Students.find({}).fetch();
    
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

  Sessions.schema = new SimpleSchema({
    name: {
        type: String,
        max: 50,
        optional: true,
    },
    sessionDate: {
        type: Date,
    },
    students: {
        type: Array,
    },
    'students.$': {
        type: Students.schema,
    },
    createdAt: {
        type: Date,
        defaultValue: new Date(),
    }
  });

  Sessions.attachSchema(Sessions.schema);