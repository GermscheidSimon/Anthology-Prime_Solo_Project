import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

//send axios request to shelf.router to get all items from shelf DB
function* fetchUserLibrarySaga() {
  try{
        const songLibrary = yield axios.get('/api/library');

        yield put({
            type: 'SET_LIBRARY',
            payload: songLibrary.data
        })
  } catch(error){
    console.log('Failed to fetch song Library',error);
  }
}

function* fetchUserLibrary() {
    yield takeEvery('FETCH_USER_LIBRARY', fetchUserLibrarySaga);
  }

export default fetchUserLibrary;