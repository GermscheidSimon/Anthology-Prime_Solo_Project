/**
 * 'Tracklist ==
 * This represents the song queue that the playercontrols will reference to know what songs it is being asked to play'
 *  
 *  Referenced with 'SET_TRACKLIST'
 *  
 */

const tracklist = (state = {trackQueue: [], restartQueue: false}, action) => {
    let trackListAction;
    switch (action.type) {
      case 'SET_TRACKLIST':
          console.log(state);
          
            trackListAction = {
                trackQueue: [...action.payload],
                restartQueue: true
            }

        return trackListAction;
      case 'ADD_TRACK_TO_TRACKLIST':
          console.log(state);
          
            trackListAction = {
                trackQueue: [...state.trackQueue, action.payload],
                restartQueue: false
            }
        return trackListAction
      default:
        return state;
    }
  };
  
  export default tracklist;
  

