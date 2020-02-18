import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';


export const Classes = new Mongo.Collection('classes');

// Deny all client-side updates since we will be using methods to manage this collection
Classes.deny({
    insert() { return true; },
    update() { return true; },
    remove() { return true; },
  });

Classes.schema = new SimpleSchema({
name: {
    type: String,
    max: 30
},
userId: { 
    type: String,
    regEx: SimpleSchema.RegEx.Id,
},
createdAt: {
    type: Date,
}
});

Classes.attachSchema(Classes.schema);

Classes.publicFields = {
    name: 1,
    userId: 1,
    createdAt: 1
};