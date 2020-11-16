import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

import PlayerControls from '../PlayerControls/PlayerControls'

/**
 * The player controls need to be on every page when the user is signed into the app. This component will determine if the player controls should be on the DOM or not. 
 * 
 */
class RenderPlayerControls extends Component { 
  state = {
    isRendered: false, // default render is false
    user_id: 0
  };

  componentDidUpdate = (props, state) => {
    if (props.store.user.id !== state.user_id) { // if the store has a user session, and the local id has not been set
        this.setState({
            user_id: this.props.store.user.id  //set user id to match what is in redux
        })
        this.updateRenderCondition() // toggle player controls render
    }   
  }
  updateRenderCondition = () => {
      if (this.props.store.user.id) {
        this.setState({
            isRendered: true,
        })
      }
  }

  render() {
    return (

      <div>
          {  this.state.isRendered ?

           <PlayerControls/> // if isRendered is true render the player controls

          :
            <></> // if isRendered is false, render nothing
          }
      </div>
    );
  }
}

export default connect(mapStoreToProps)(RenderPlayerControls);
