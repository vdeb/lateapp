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
      return Sessions.insert({ name, sessionDate, classId });
    },
  });