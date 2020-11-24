import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

import PlayerControls from '../PlayerControls/PlayerControls'

/**
 * The player controls need to be on every page when the user is signed into the app if something is playing. This component will determine if the player controls should be on the DOM or not. 
 * 
 * 
 */
class RenderPlayerControls extends Component{


    componentDidMount = () => {

      this.setState({
        transition: true
      })
    }
    handletransition = () => {
      this.setState({
        transition: !this.state.transition
      })
    }
  
  render() {
    return (
      <div>
          {  this.props.store.tracklist.trackQueue.length > 0 ? //does the tracklist array contain at least one song?
                  <PlayerControls trackQueue={this.props.store.tracklist}/>  /* Collapse doesn't seem to pass PlayerControls 'styled' prop. might require a functional component child */
          :
            <></> // if nothing is playing, don't want to render the controls.
          }
      </div>
    )
  }
}


export default connect(mapStoreToProps)(RenderPlayerControls);
