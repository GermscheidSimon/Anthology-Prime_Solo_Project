import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

import TrackList from '../TrackList/TrackList'


/**
 * TrackList is expecting an array of objects that look like this. Data from the SQL query needs to be translated for trackList reusability
 * {
        id:  integer
        title: <song title>,
        album: <album name>,
        artist: <artist name>,
        length: <song length>
        }
 */

function Playlist(props) {

    useEffect(() => fetchPlaylistDetails(), [props.match.params]);
        
    const fetchPlaylistDetails = () => {
        
        props.dispatch({
            type: "FETCH_PLAYLIST_DETAILS",
            payload: props.match.params
        }); 
        console.log(props.store.playlist);
        
    }
 
  const parsePlaylistData = () => {
        
      let tracklist =  props.store.playlist.map( track => {;
            
            return {
                id: track.songs_id,
                name: track.name,
                album: track.album,
                artist: track.artist,
                length: track.length
            }
      })
      console.log(tracklist);
      
    return tracklist
  }
  const handlePlay_Playlist = () => {
    props.dispatch({
        type: "PLAY_PLAYLIST",
        payload: props.store.playlist
    });
  }
 

  return (
    <div>
        <div className="playlistHeader">
            Playlist name here
        </div>
        <button onClick={handlePlay_Playlist}>Play!</button>
       { props.store.playlist && 

        <TrackList trackList={parsePlaylistData()}/>

       }
    </div>
  );
}

export default connect(mapStoreToProps)(Playlist);
