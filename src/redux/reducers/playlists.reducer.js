const playlists = (state = [], action) => {
    switch (action.type) {
      case "SET_ALL_PLAYLISTS":
        return action.payload;
      default:
        return state;
    }
  };
  
  // user will be on the redux state at:
  // state.user
  export default playlists;
  

