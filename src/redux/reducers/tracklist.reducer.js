/**
 * 'Tracklist ==
 * This represents the song queue that the playercontrols will reference to know what songs it is being asked to play'
 *  
 *  Referenced with 'SET_TRACKLIST'
 *  
 */

const tracklist = (state = [], action) => {
    switch (action.type) {
      case 'SET_TRACKLIST':
        return action.payload;
      default:
        return state;
    }
  };
  
  export default tracklist;
  

