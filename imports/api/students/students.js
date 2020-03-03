import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Classes } from '../classes/classes';


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
    dataURL: {
      type: String,
      optional: true
    },
    schoolId: {
      type: String,
      max: 10,
      optional: true
  },
    classId: {
      type: String,
      regEx: SimpleSchema.RegEx.Id,
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
    dataURL: 1,
    sex: 1,
    createdAt: 1
  };

  Students.helpers({
    class() {
      return Classes.findOne(this.classId);
    },
    editableBy(userId) {
      return this.class().editableBy(userId);
    }
  });
  