import { Meteor } from 'meteor/meteor';
import { Students } from '../../api/students/students.js';

// if the database is empty on server start, create some sample data.
Meteor.startup(() => {
  if (Students.find().count() === 0) {
    const data = [
        {
            "name" : "Ella",
            "surname" : "Bubulle",
            "nationality" : "Francaise",
            "sex" : "F",
        },
        {
            "name" : "Jose",
            "surname" : "Bove",
            "nationality" : "Francaise",
            "sex" : "M",
        },
        {
            "name" : "Arthur",
            "surname" : "Mori",
            "nationality" : "Espagnol",
            "sex" : "M",
        },
        {
            "name" : "Jean Louis",
            "surname" : "Dupard",
            "nationality" : "Française",
            "sex" : "M",
        },
        {
            "name" : "Serguei",
            "surname" : "Dubrovski",
            "nationality" : "Russe",
            "sex" : "M",
        },
        {
            "name" : "Lola",
            "surname" : "de La Luna",
            "nationality" : "Espagnole",
            "sex" : "F",
        },
        {
            "name" : "Georgia",
            "surname" : "Moustakis",
            "nationality" : "Grecque",
            "sex" : "F",
        },
        {
            "name" : "Vincenzo",
            "surname" : "Nibali",
            "nationality" : "Italienne",
            "sex" : "M",
        },
    ];

    let timestamp = (new Date()).getTime();

    data.forEach((student) => {
        // will be used afterwards
      const studentId = Students.insert({
        name: student.name,
        surname: student.surname,
        nationality: student.nationality,
        sex: student.sex,
        createdAt: new Date(timestamp)
      });


        timestamp += 1; // ensure unique timestamp.
      });
    }
});
