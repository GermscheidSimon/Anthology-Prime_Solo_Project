import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* fetchPlaylists(action) {
    try { // fetch specfic song. this will return ALL data including route to audio file
      console.log('fetch playlist');
      
      const playlistsData = yield axios.get(`api/playlist/`)
        // add track to the currently playing tracklist 
      yield put({
          type: "SET_ALL_PLAYLISTS", 
          payload: playlistsData.data
      });
    } catch (error) {
        // through client error if unsuccessful
      console.log('Failed to fetch playlists!',error);
      alert('Failed to Load your playlist information! Please try again.')
    }
  }

  function* PlaylistsSags() {
      yield takeLatest('FETCH_PLAYLISTS', fetchPlaylists)
    }
  
  export default PlaylistsSags;