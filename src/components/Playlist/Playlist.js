import React, { Component, useEffect, useState } from 'react';
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
        }
 */

class Playlist extends Component {

    state = {
        playlistName: 'playlistName'
    }
    
    fetchPlaylistDetails = () => {
        this.props.dispatch({
            type: "FETCH_PLAYLIST_DETAILS",
            payload: this.props.match.params
        });
    }
    componentDidMount = () => {
        this.fetchPlaylistDetails()
        console.log(this.props.store.playlistName);
        
    }


 
    parsePlaylistData = () => {
        
      let tracklist =  this.props.store.playlist.map( track => {;
            
            return {
                id: track.songs_id,
                name: track.name,
                album: track.album,
                artist: track.artist,
                length: track.length
            }
      })      
    return tracklist
  }
   handlePlay_Playlist = () => {
    this.props.dispatch({
        type: "PLAY_PLAYLIST",
        payload: this.props.store.playlist
    });
  }
 
    render() {
        return (
            <div>
                <div className="playlistHeader">
                    {this.props.store.playlistName.playlistName}
                </div>
                <button onClick={this.handlePlay_Playlist}>Play!</button>
            { this.props.store.playlist && 


                <TrackList trackList={this.parsePlaylistData()}/>
            }
            </div>
        );
    }
}

export default connect(mapStoreToProps)(Playlist);
