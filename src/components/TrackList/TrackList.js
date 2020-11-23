import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

import TrackItem from '../TrackItem/TrackItem'

import './Tracklist.css'

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
      }
 * 
 */
class TrackList extends Component {

  fetchPlaylists = () => {
    this.props.dispatch({
      type: "FETCH_PLAYLISTS"
    })
  }
  componentDidMount = () => {
    this.fetchPlaylists()
  }

  render() {
    let iterable = 0
    let tracks = this.props.trackList // trackList passed from parent component
    return (
      <div className="trackListWrap">
        <table className="tracklistTable">
          <thead className="trackListTableHead">
            <tr>
              <th>#</th>
              <th>Track Name</th>
              <th>Artist</th>
              <th>Album</th>
            </tr>
          </thead>  
        {/* .map through tracklist props array and create a table row for eac item. */}
          <tbody className="trackListTableBody">
            {tracks.map(track => {
                iterable++
                return <TrackItem deleteTrack={this.props.deleteTrack}track={track} key={track.id} listNum={iterable} playlists={this.props.store.playlists}/>
            })}
          </tbody>
        </table> 
      </div>
    );
  }
}

export default connect(mapStoreToProps)(TrackList);
