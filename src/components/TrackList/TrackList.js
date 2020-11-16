import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.
class TrackList extends Component {
  state = {

  };

  render() {
    return (
        <table>
        <tr>
          <th>#</th>
          <th>Track Name</th>
          <th>Artist</th>
          <th>Album</th>
          <th>Length</th>
        </tr>
        <tr>
          <td>1</td>
          <td>Bohemian rhapsody</td>
          <td>Queen</td>
          <td>A Night at the Opera</td>
          <td>5:59</td>
        </tr>
      </table> 
    );
  }
}

export default connect(mapStoreToProps)(TrackList);
