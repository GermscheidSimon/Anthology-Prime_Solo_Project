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
            <div>
                <p> title </p>
                <p> album </p>
                <p> artist </p>
                <p> 00:00 // 00:00 </p>
            </div>
            <div>
                <button>Previous</button>
                <button>PlayPause</button>
                <button>NextSong</button>
            </div>
            <div>
                <select>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                </select>
            </div>
            <div>
                <button>Display Song Queue</button>
            </div>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(PlayerControls);
