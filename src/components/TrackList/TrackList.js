import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

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
        title: <song title>,
        album: <album name>,
        artist: <artist name>,
        length: <song length>
        songDir: <url to song  (http://servername:5000/server/FS_songs/<songFileName>)>
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
                return(
                <tr>
                  <td>{track.id}</td>
                  <td>{track.title}</td>
                  <td>{track.artist}</td>
                  <td>{track.album}</td>
                  <td>{track.length}</td>
                </tr>
            )  
        })}
          </tbody>
      </table> 
    );
  }
}

export default connect(mapStoreToProps)(TrackList);
