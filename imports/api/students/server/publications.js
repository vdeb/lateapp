import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';

import { Students } from '../students.js';
import { Classes } from '../../classes/classes.js';

// Meteor.publish('students', function studentsPublication() {
//     return Students.find({}, {
//         fields: Students.publicFields,
//       });
// })

Meteor.publishComposite('students.inClass', function todosInClass(params) {
  new SimpleSchema({
    classId: { type: String },
  }).validate(params);

  const { classId } = params;
  const { userId } = this;

  return {
    find() {

      // We only need the _id field in this query, since it's only
      // used to drive the child queries to get the todos
      const options = {
        fields: { _id: 1 },
      };

      return Classes.find({_id: classId, userId: userId}, options);
    },

    children: [{
      find(classe) {
        return Students.find({ classId: classe._id }, { fields: Students.publicFields });
      },
    }],
  };
});