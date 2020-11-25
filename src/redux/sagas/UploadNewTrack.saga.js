import axios from 'axios';
import { takeEvery } from 'redux-saga/effects';


function* uploadTrack(action) {
    try { // fetch specfic song. this will return ALL data including route to audio file
        console.log('upload new track');
        
        const headers = {
            headers: { 'content-type': 'multipart/form-data' } // let the receivving server know the file is broken up
        }
        
        // the parameters here help identify the song. they come from the AddNewTrack state when the song is dispatched here.
        // action.payload.file represents the FormData object being passed as a multipart data (buffered)
          for (const newTrack of action.payload) {
             yield axios({
              method: "POST",
              url: `/api/song/${newTrack.trackInfo.artist}/${newTrack.trackInfo.album}/${newTrack.trackInfo.name}`,
              data: newTrack.file,
              config: headers
          })
      }
      yield alert('success')
         
    } catch (error) {
        // through client error if unsuccessful
        alert('failure')
      console.log('Upload failed',error);
    } 
  }
 

  function* uploadTrackSaga() {
      yield takeEvery('UPLOAD_TRACK', uploadTrack)
    }
  
  export default uploadTrackSaga;