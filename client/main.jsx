import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import AppContainer from '/imports/ui/containers/AppContainer'
import 'bootstrap/dist/css/bootstrap.min.css';

Meteor.startup(() => {
  render(<AppContainer />, document.getElementById('react-target'));
});
