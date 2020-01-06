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
        }
    }).validator(),
    run({ name, sessionDate }) {
        console.log("We re in the method !")
      return Sessions.insert({ name, sessionDate });
    },
  });