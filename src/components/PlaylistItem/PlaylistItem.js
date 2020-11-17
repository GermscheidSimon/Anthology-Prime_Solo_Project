import React from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

import {withRouter} from 'react-router-dom'


function PlaylistItem(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  
    const navigateToPlaylist = (playlistID) => {
        props.history.push(`/library/playlist/${playlistID}`)
        console.log(props);
        
    }

  return (
    <div onClick={() => navigateToPlaylist(props.playlist.id)} className="playlist-card">
        
            <div > {props.playlist.playlistName} </div>
    </div>
  );
}


export default withRouter(connect(mapStoreToProps)(PlaylistItem));
