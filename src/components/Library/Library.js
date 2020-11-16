import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import TrackList from '../TrackList/TrackList';

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.
class Library extends Component {
  state = {
    heading: 'Class Component',
  };

  render() {
    return (
      <div>
       <TrackList />
      </div>
    );
  }
}

export default connect(mapStoreToProps)(Library);
