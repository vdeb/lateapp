import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import { Students } from '../../api/students/students';
import { Classes } from '../../api/classes/classes';

const ClassContainer = (component) => withTracker(( match ) => {
    const id  = match.match.params.id;
    const studentsHandle = Meteor.subscribe('students.inClass', { classId: id });
    return {
    loading: !(studentsHandle.ready()),
    students: Students.find({}, { sort: { name: 1 } }).fetch(),
    classes: Classes.find({_id: id}).fetch(),
    class: id
    };
})(component);

export default ClassContainer;
