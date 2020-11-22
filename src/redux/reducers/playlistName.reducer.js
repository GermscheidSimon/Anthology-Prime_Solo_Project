const playlistName = (state={playlistName: 'playlistName'}, action) => {
    switch (action.type) {
        case 'SET_PLAYLISTNAME':
            return action.payload;
    
        default:
            return state;
    }
}

export default playlistName;