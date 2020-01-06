import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';


export const Students = new Mongo.Collection('students');


// Deny all client-side updates since we will be using methods to manage this collection
Students.deny({
    insert() { return true; },
    update() { return true; },
    remove() { return true; },
  });

 Students.schema = new SimpleSchema({
    name: {
        type: String,
        max: 30
    },
    surname: {
        type: String,
        max: 30
    },
    nationality: {
        type: String,
        max: 30
    },
    sex: {
        type: String,
        max: 1,
        regEx: /[MF]/
    },
    createdAt: {
      type: Date,
    }
  });

  Students.attachSchema(Students.schema);

  Students.publicFields = {
    name: 1,
    surname: 1,
    nationality: 1,
    sex: 1,
    createdAt: 1
  };