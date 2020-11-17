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
  

