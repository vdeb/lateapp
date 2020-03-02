import { Meteor } from 'meteor/meteor';
import { Students } from '../../api/students/students.js';
import { Classes } from '../../api/classes/classes.js';
import { Accounts } from 'meteor/accounts-base';

// if the database is empty on server start, create some sample data.
Meteor.startup(() => {
   const user = Accounts.findUserByEmail('victor.debray.2011@gmail.com');
  if (Classes.find().count() === 0) {
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
    [1, 2].map( function(i){
        let timestamp = (new Date()).getTime();

        const classId = Classes.insert({
            name: 'Innov 2020 - ' + i,
            userId: user._id,
            createdAt: new Date(timestamp)
        })

        data.forEach((student) => {
            // will be used afterwards
        const studentId = Students.insert({
            name: student.name + i,
            surname: student.surname + i,
            nationality: student.nationality,
            sex: student.sex,
            createdAt: new Date(timestamp),
            classId : classId
        });

            timestamp += 1; // ensure unique timestamp.
        });
    }
        )
    
    
    }
});
