/**
 * Playlist --
 *  This reducer represents the playlist details the Playlist Page is loaded. 
 *          Reference: "SET_PLAYLIST"
 * 
 *  When the "Play" button in the Playlist page is selected, this data will be pushed to the tracklist reducer ("SET_TRACKLIST") This will begin playback of that music
 * 
 * 
 */

const playlist = (state = [], action) => {
    switch (action.type) {
      case 'SET_PLAYLIST':
        return action.payload;
      default:
        return state;
    }
  };
  
  // playlist will be on the redux state at:
  // store.playlist
  export default playlist;
  

