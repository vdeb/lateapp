import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import { Sessions } from '../../api/sessions/sessions';

const ActiveSessionContainer = (component) => withTracker(() => {
    const sessionHandle = Meteor.subscribe('activeSession');
    return {
    loading: !(sessionHandle.ready()),
    session: Sessions.findOne({active: true}),
    };
})(component);

export default ActiveSessionContainer;    
