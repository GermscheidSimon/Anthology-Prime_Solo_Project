import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

import TrackItem from '../TrackItem/TrackItem'

/**
 * Track List component. Flexible compoennt for displying track lists on various pages on the site.  
 *  >> Used in --
 *      Library
 *      PlaylistTracks
 *      NowPlaying
 * 
 * trackList props is passed in as an array of tracks: 
 * 
 *  Track JSON :: 
      {
        id:  integer
        name: <song title>,
        album: <album name>,
        artist: <artist name>,
        length: <song length>
      }
 * 
 */
class TrackList extends Component {

  render() {
    let tracks = this.props.trackList // trackList passed from parent component
    return (
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Track Name</th>
              <th>Artist</th>
              <th>Album</th>
              <th>Length</th>
            </tr>
          </thead>
{/* .map through tracklist props array and create a table row for eac item. */}
          <tbody>
            {tracks.map(track => {
                return <TrackItem track={track} key={track.id} />
            })}
          </tbody>
      </table> 
    );
  }
}

export default connect(mapStoreToProps)(TrackList);
