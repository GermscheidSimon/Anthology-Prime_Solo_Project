import React from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

import PlayerControls from '../PlayerControls/PlayerControls'

/**
 * The player controls need to be on every page when the user is signed into the app if something is playing. This component will determine if the player controls should be on the DOM or not. 
 * 
 * > this functional component should probably construct a new Player controls, so that PlayerControls doesn't need to use getDerivedStateFromProps on initial mount. 
 */

const  RenderPlayerControls = (props) => { 

    return (

      <div>
          {  props.store.tracklist.length > 0 ? //does the tracklist array contain at least one song?

           <PlayerControls trackQueue={props.store.tracklist} /> // if the song queue exists, render the controls.
          :
            <></> // if nothing is playing, don't want to render the controls.
          }
      </div>
    );

}

export default connect(mapStoreToProps)(RenderPlayerControls);
