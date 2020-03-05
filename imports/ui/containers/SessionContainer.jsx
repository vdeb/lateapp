import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import { Sessions } from '../../api/sessions/sessions';

const SessionContainer = (component) => withTracker((match) => {
    const sessionId  = match.match.params.id;
    const sessionHandle = Meteor.subscribe('session', { sessionId });
    return {
    loading: !(sessionHandle.ready()),
    session: Sessions.findOne(),
    };
})(component);

export default SessionContainer;
