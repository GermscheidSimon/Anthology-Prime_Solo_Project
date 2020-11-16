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
        title: <song title>,
        album: <album name>,
        artist: <artist name>,
        length: <song length>
        songDir: <url to song  (http://servername:5000/server/FS_songs/<songFileName>)>
        }
    ]
 */
class Library extends Component {
  state = {
    
  };

  items = [
    {
        id:  1,
        title: 'Bohemian rhapsody',
        album: 'A Night At The Opera',
        artist: 'queen',
        length: '5:59',
        songDir: 'http://localhost:5000/filepath'
    },
    {
        id:  2,
        title: 'Bohemian rhapsody',
        album: 'A Night At The Opera',
        artist: 'queen',
        length: '5:59',
        songDir: 'http://localhost:5000/filepath'
    }
  ]

  render() {
    return (
      <div>
          <div>
                Your Library -- 
          </div>

          <TrackList trackList={this.items}/>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(Library);
