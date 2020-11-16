import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

import './PlayerControls.css'


class PlayerControls extends Component {
  state = {
    heading: 'Class Component',
  };

  render() {
    return (
        <div className="playerControlsWrap">
            <div className="songInfoWrap">
                <div className="songTitle"> title </div>
                  <div className="songInfoSecondary">
                    <div> album </div>
                    <div> artist </div>
                    <div> 00:00 // 00:00 </div>
                  </div>
            </div>
            <div className="songNavigation">
                <button>Previous</button>
                <button>PlayPause</button>
                <button>NextSong</button>
            </div>
            <div className="songVolume">
                <select>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                </select>
            </div>
            <div className="songQueue">
                <button>Display Song Queue</button>
            </div>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(PlayerControls);
