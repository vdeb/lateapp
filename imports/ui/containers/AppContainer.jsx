import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import App from '../App.jsx';
import { Classes } from '../../api/classes/classes';
import { Students } from '../../api/students/students';

const AppContainer = withTracker(() => {
    const classesHandle = Meteor.subscribe('classes');
    return {
    user: Meteor.user(),
    loading: !(classesHandle.ready()),
    connected: Meteor.status().connected,
    classes: Classes.find({}).fetch(),
    };
})(App);

export default AppContainer;
