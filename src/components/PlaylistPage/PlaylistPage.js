import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

import PlaylistItem from '../PlaylistItem/PlaylistItem'
import AddNewPlaylistModal from '../AddNewPlaylistModal/AddNewPlaylistModal'

import './PlaylistPage.css'

class PlaylistPage extends Component {

    state = {
        playlists: []
    }

    componentDidMount = () => {
        this.fetchPlaylists();
    }

    fetchPlaylists = () => {
        this.props.dispatch({
            type: "FETCH_PLAYLISTS"
        });
        this.setState({
            playlists: this.props.store.playlists
        })
    }
    handleNewPlaylist = () => {

    }


  render() {
    return (
        <div>
            <div className="playlistHeader">
                 Playlists
            </div>
            <div className="PlaylistCardsWrap">
                {this.props.store.playlists.map( playlist => {
                    return(
                    <PlaylistItem playlist={playlist}/>
                    )
                })}
                <AddNewPlaylistModal/>
            </div>
        </div>
    );
  }
}

export default connect(mapStoreToProps)(PlaylistPage);
