import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

import { Classes } from './classes' ;
import { Students } from '../students/students';
import { SimpleSchema } from 'simpl-schema/dist/SimpleSchema';

console.log(Students.schema.omit(['createdAt', 'classId']));

export const classInsert = new ValidatedMethod({
    name: 'classes.insert',
    validate: new SimpleSchema({
        name: {
            type: String,
            optional: true,
        },
        createdAt: {
            type: Date
        },
        students: {
            type: Array,
        },
        'students.$': {
            type: Students.schema.omit('createdAt', 'classId'),
        },
    }).validator(),
    run({ name, students, createdAt }) {
      let classId = Classes.insert({ name, userId: this.userId, createdAt });
      students.forEach(student => {
          Students.insert({...student, classId, createdAt})
      });
      return classId
    },
  });
