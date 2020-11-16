import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

import './PlaylistPage.css'

class PlaylistPage extends Component {

  render() {
    return (
      <div className="PlaylistCardsWrap">
        <div className="playlist-card">
            this is a playlist
        </div>
        <div className="playlist-card">
            add new Playlist 
        </div>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(PlaylistPage);
