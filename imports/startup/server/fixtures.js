import { Meteor } from 'meteor/meteor';
import { Students } from '../../api/students/students.js';
import { Classes } from '../../api/classes/classes.js';
import { Accounts } from 'meteor/accounts-base';

// if the database is empty on server start, create some sample data.
Meteor.startup(() => {
   let user = Accounts.findUserByEmail('test@gmail.com');
   if (!user) {
    Accounts.createUser({
        "email": "test@gmail.com",
        "password": "test",
      });
      user = Accounts.findUserByEmail('test@gmail.com');
   }
  if (Classes.find().count() === 0) {
    const data = [
        {
            "name" : "Ella",
            "surname" : "Bubulle",
            "nationality" : "Francaise",
            "sex" : "F",
            "dataURL": "data:image/jpeg;base64,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"
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
            studentDoc = {
                name: student.name + i,
                surname: student.surname + i,
                nationality: student.nationality,
                sex: student.sex,
                createdAt: new Date(timestamp),
                classId : classId
            }
            if (student.dataURL) {
                studentDoc["dataURL"] = student.dataURL
            }
            const studentId = Students.insert(studentDoc);

            timestamp += 1; // ensure unique timestamp.
        });
    }
        )
    
    
    }
});
