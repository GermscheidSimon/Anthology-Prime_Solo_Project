import axios from 'axios';
import { put, takeEvery, takeLatest } from 'redux-saga/effects';

//send axios request to shelf.router to get all items from shelf DB
function* fetchUserLibrary() {
  try{  // fetch an array of song information for Library view
    console.log('fetch library');
    
        const songLibrary = yield axios.get('/api/song'); 
        // add the retrieved data to the library reducer if successfully quiried
        yield put({
            type: 'SET_LIBRARY', 
            payload: songLibrary.data
        });
  } catch(error){
        // through client error if unsuccessful
    console.log('Failed to fetch song Library',error);
    alert('Failed to Load Library! Please try again.')
  }
}
// when a single track is selected this will update tracklist (song queue) with just the one song. It will remain an array of one item
function* fetchSong(action) {
  try { // fetch specfic song. this will return ALL data including route to audio file
      console.log('fetch song', action.payload);
      
      const songData = yield axios.get(`api/song/${action.payload}`)
        // add track to the currently playing tracklist 
    yield put({
          type: "SET_TRACKLIST", 
          payload: songData.data
      });
    yield put({
        type: "SET_CURRENT_SONG",
        payload: songData.data[0]
      })
  } catch (error) {
      // through client error if unsuccessful
    console.log('Failed to fetch song Library',error);
    alert('Failed to Load Library! Please try again.')
  }
}

function* fetchFromSongs() {
    yield takeEvery("FETCH_USER_LIBRARY", fetchUserLibrary);
    yield takeLatest('FETCH_SONG', fetchSong)
  }

export default fetchFromSongs;