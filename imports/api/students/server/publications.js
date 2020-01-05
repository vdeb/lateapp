import { Meteor } from 'meteor/meteor';

import { Students } from '../students.js';

Meteor.publish('students', function studentsPublication() {
    return Students.find({}, {
        fields: Students.publicFields,
      });
})