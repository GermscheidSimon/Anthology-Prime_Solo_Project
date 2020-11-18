import { all } from 'redux-saga/effects';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';

import fetchLibrarySaga from './fetchFromSongs.saga'
import fetchplaylistDetailsSaga from './fetchPlaylistDetails.saga'
import PlaylistsSags from './fetchPlaylists.saga'
import uploadTrackSaga from './UploadNewTrack.saga'


// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
//Login and Registration operations
    loginSaga(), 
    registrationSaga(),
    userSaga(),
//Application operations
    fetchLibrarySaga(),
    fetchplaylistDetailsSaga(),
    PlaylistsSags(),
    uploadTrackSaga()
  ]);
}
