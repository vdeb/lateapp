import React, { Component } from 'react';

import Table from 'react-bootstrap/Table'


export default class SessionPage extends Component {

    renderStudents(studentList, status="awaited") {
        let colorClass = status == "arrived"? 'table-success': status == "absent"? 'table-warning': '';
        return studentList.map( (student) => (
            <tr className={colorClass}>
                <td>{student.name}</td>
                <td>{student.surname}</td>
                <td>{status}</td>
                <td>{student.arrivedAt? student.arrivedAt.toDatetimeLocal(): ''}</td>
            </tr>
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
                <h4>
                    {this.props.loading? "b": this.props.session.sessionDate.toDatetimeLocal()}
                </h4>
                <Table bordered hover>
                    <thead>
                        <tr>
                            <th>Prénom</th>
                            <th>Nom</th>
                            <th>Statut</th>
                            <th>Arrivé à</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.props.loading? "Loading" :
                    onTimeStudents.length > 0 && this.renderStudents(onTimeStudents, "arrived")}
                    {this.props.loading? "Loading" :
                    absentStudents.length > 0 && this.renderStudents(absentStudents, "absent")}
                    {this.props.loading? "Loading" :
                    awaitedStudents.length > 0 && this.renderStudents(awaitedStudents, "awaited")}
                    </tbody>
                </Table>
            </div>
        )
    }
}
