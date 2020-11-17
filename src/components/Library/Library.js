import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import TrackList from '../TrackList/TrackList';

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

  items = [
    {
        id:  1,
        title: 'Bohemian rhapsody',
        album: 'A Night At The Opera',
        artist: 'queen',
        length: '5:59'
    },
    {
        id:  2,
        title: 'Bohemian rhapsody',
        album: 'A Night At The Opera',
        artist: 'queen',
        length: '5:59'
    }
  ]

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
      <div>
          <div>
                Your Library -- 
          </div>

          <TrackList trackList={songLibrary}/>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(Library);
