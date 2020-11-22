import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

import PlayerControls from '../PlayerControls/PlayerControls'

import {Collapse} from '@material-ui/core/';

/**
 * The player controls need to be on every page when the user is signed into the app if something is playing. This component will determine if the player controls should be on the DOM or not. 
 * 
 * 
 */
class RenderPlayerControls extends Component{
    state = {
      transition: false
    }

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
          {  this.props.store.tracklist.length > 0 ? //does the tracklist array contain at least one song?
              <Collapse  in={this.state.transition} timeout='auto' appear>
                  <PlayerControls trackQueue={this.props.store.tracklist}/>  {/* Collapse doesn't seem to pass PlayerControls 'styled' prop. might require a functional component child */}
              </Collapse>
          :
            <></> // if nothing is playing, don't want to render the controls.
          }
      </div>
    )
  }
}


export default connect(mapStoreToProps)(RenderPlayerControls);
