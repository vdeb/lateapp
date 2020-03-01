import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import { Sessions } from '../../api/sessions/sessions';

const SessionContainer = (component) => withTracker(( match ) => {
    const sessionHandle = Meteor.subscribe('activeSession');
    return {
    loading: !(sessionHandle.ready()),
    session: Sessions.findOne({active: true}),
    };
})(component);

export default SessionContainer;
