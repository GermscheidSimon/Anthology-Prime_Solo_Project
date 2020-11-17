import React, { useState } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';


function TemplateFunction(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  
    const navigateToPlaylist = (playlistID) => {
        props.history.push(`/library/playlist/${playlistID}`)
    }

  return (
    <div onClick={navigateToPlaylist}>
      <h2></h2>
    </div>
  );
}

export default connect(mapStoreToProps)(TemplateFunction);
