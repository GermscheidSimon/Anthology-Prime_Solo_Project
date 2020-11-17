import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.
class AddNewTrack extends Component {
  state = {
    heading: 'Class Component',
  };

  render() {
    return (
      <div className="addTrackFormWrap">
          <form>
                <label htmlFor=""   >Track Name:</label>
                    <input type="text"  />
                <label htmlFor=""   > Artist: </label>
                    <input type="text"  />
                <label htmlFor=""   > Album: </label>
                    <input type="text"  />
                <label htmlFor=""   >Track File Upload: </label>
                    <input type="file"  />


                <input type='submit' value='Upload Track'/>
          </form>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(AddNewTrack);
