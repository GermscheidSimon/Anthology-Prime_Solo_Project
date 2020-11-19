import axios from 'axios';
import { put, takeEvery, takeLatest } from 'redux-saga/effects';


function* uploadTrack(action) {
    try { // fetch specfic song. this will return ALL data including route to audio file
        console.log('upload new track');
        
        const headers = {
            headers: { 'content-type': 'multipart/form-data' } // let the receivving server know the file is broken up
        }
        
        yield axios({
            method: "POST",
            url: `/api/song/${action.payload.trackInfo.artist}/${action.payload.trackInfo.album}/${action.payload.trackInfo.name}`,
            data: action.payload.file,
            config: headers
        })
    } catch (error) {
        // through client error if unsuccessful
      console.log('Upload failed',error);
      alert('Upload failed! please try again.')
    }
  }

  function* uploadTrackSaga() {
      yield takeEvery('UPLOAD_TRACK', uploadTrack)
    }
  
  export default uploadTrackSaga;