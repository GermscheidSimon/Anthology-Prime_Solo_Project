import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* fetchplaylist(action) {
    try { // fetch specfic song. this will return ALL data including route to audio file
      console.log('fetch playlist with ID of: ', action.payload);
      
      const playlistData = yield axios.get(`api/playlist/${action.payload.id}`)
        // add track to the currently playing tracklist 
      yield put({
          type: "SET_PLAYLIST", 
          payload: playlistData.data
      });
    } catch (error) {
        // through client error if unsuccessful
      console.log('Failed to fetch playlist!',error);
      alert('Failed to Load playlist information! Please try again.')
    }
  }
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

  function* fetchplaylistDetailsSaga() {
      yield takeLatest('FETCH_PLAYLIST_DETAILS', fetchplaylist)
      yield takeLatest("PLAY_PLAYLIST", playPlaylist)
    }
  
  export default fetchplaylistDetailsSaga;