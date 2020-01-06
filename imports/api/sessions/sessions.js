import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';


export const Sessions = new Mongo.Collection('sessions');

// Deny all client-side updates since we will be using methods to manage this collection
Sessions.deny({
    insert() { return true; },
    update() { return true; },
    remove() { return true; },
  });

