import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// fetches playlist details by ID when a playlist Component is loaded
function* fetchplaylist(action) {
    try { // fetch specfic song. this will return ALL data including route to audio file
      console.log('fetch playlist with ID of: ', action.payload);
      
      const playlistData = yield axios.get(`api/playlist/${action.payload.id}`)
        // add track to the currently playing tracklist 
        console.log(playlistData.data);        
      yield put({
          type: "SET_PLAYLIST", 
          payload: playlistData.data
      });

      yield put({
          type: "GET_PLAYLIST_NAME",
          payload: action.payload.id
      })
    } catch (error) {
        // through client error if unsuccessful
      console.log('Failed to fetch playlist!',error);
      alert('Failed to Load playlist information! Please try again.')
    }
  }
// When the play button is selected in a playlist, this will set the current playlist info into the tracklist (song queue)
// when this change happens PlayerControls will run though ComponentDidUpdate to re-load the audio element
function* playPlaylist(action) {
    try{
        yield put({
            type: 'SET_TRACKLIST',
            payload: action.payload
        });
    } catch (error) {
        console.log(error);
    }
}
function* playlistName(action) {
    try {
        const playlistName = yield axios.get(`http://73.37.215.93:2550/api/playlist/name/${action.payload}`)
        yield put({
            type: 'SET_PLAYLISTNAME',
            payload: playlistName.data
        })
    } catch (error) {
        console.log(error);
    }
}

  function* fetchplaylistDetailsSaga() {
      yield takeLatest('FETCH_PLAYLIST_DETAILS', fetchplaylist)
      yield takeLatest("PLAY_PLAYLIST", playPlaylist)
      yield takeLatest('GET_PLAYLIST_NAME', playlistName)
    }
  
  export default fetchplaylistDetailsSaga;