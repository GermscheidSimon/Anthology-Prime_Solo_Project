import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import TrackList from '../TrackList/TrackList';

import './Library.css'

/**
 
TrackList JSON Structure for Library Component --- 

    Library fetch will return an array of objects containing all the data necessary to display, and playback individual songs. 

    library: [ 
        {
        id:  integer
        name: <song title>,
        album: <album name>,
        artist: <artist name>,
        length: <song length>
        }
    ]
 */
class Library extends Component {

  componentDidMount = () => {
      this.getSongLibrary();
  }
  getSongLibrary = () => {      
      this.props.dispatch({
          type: "FETCH_USER_LIBRARY"
      });
  }

  render() {
      const songLibrary = this.props.store.libraryReducer
    return (
      <div className="libraryWrap">
          <div>
                Your Library -- 
          </div>
          <div className="lib_TrackListWrap">
          <TrackList trackList={songLibrary}/>
          </div>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(Library);
