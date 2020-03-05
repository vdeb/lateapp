import React, { Component } from 'react';

import Row from 'react-bootstrap/Row';

import Student from '../components/Student.jsx';
import Button from 'react-bootstrap/Button';


export default class ActiveSessionPage extends Component {

    constructor() {
        super();

        this.handleLate = this.handleLate.bind(this);
        this.endClass = this.endClass.bind(this);
      }

    endClass(event) {
        event.preventDefault();
        Meteor.call(
            'sessions.endClass',
            {
                sessionId: this.props.session._id
            }
        )
        this.props.history.replace('/class/' + this.props.session.classId)
    }
    
    handleLate(studentId, event) {
        Meteor.call(
            'sessions.logLate',
            {
                sessionId: this.props.session._id,
                studentId: studentId,
                arrivedAt: new Date()
            }
        )
    }

    handleAbsence(studentId, event) {
        Meteor.call(
            'sessions.logAbsence',
            {
                sessionId: this.props.session._id,
                studentId: studentId,
            }
        )
    }
 
    renderStudents(studentList, status="awaited") {
        return studentList.map( (student) => (
          <Student
            key={student._id}
            student={student}
            handleLate={(event) => this.handleLate(student._id, event)}
            handleAbsence = {(event) => this.handleAbsence(student._id, event)}
            status={status}
        />
        ));
      }
    
    render() {
        let awaitedStudents = [];
        let onTimeStudents = [];
        let absentStudents = [];
        if (!this.props.loading) {
            awaitedStudents = this.props.session.students.filter(
                (student) => (!("arrivedAt" in student) & !(student.isAbsent))
            );
            onTimeStudents = this.props.session.students.filter(
                (student) => (("arrivedAt" in student))
            );
            absentStudents = this.props.session.students.filter(
                (student) => ((student.isAbsent))
            );
        }
        return (
            <div>
                <h2>
                    {this.props.loading? "Loading": this.props.session.name}
                </h2>
                <Button onClick={this.endClass}>
                    Terminer le cours
                </Button>
                <h4>Etudiants :</h4>
                <Row>
                {this.props.loading? "Loading" :
                    awaitedStudents.length > 0 && this.renderStudents(awaitedStudents, "awaited")}
                </Row>
                <h4>
                    Arrivés :
                </h4>
                <Row>
                {this.props.loading? "Loading" :
                    onTimeStudents.length > 0 && this.renderStudents(onTimeStudents, "arrived")}
                </Row>
                <h4>
                    Absents :
                </h4>
                <Row>
                {this.props.loading? "Loading" :
                    absentStudents.length > 0 && this.renderStudents(absentStudents, "absent")}
                </Row>
            </div>
        )
    }
}
