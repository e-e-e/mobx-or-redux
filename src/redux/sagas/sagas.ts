import { all, fork } from 'redux-saga/effects'
import { noteSagas } from './notes'

export const rootSaga = function* root() {
  yield all([fork(noteSagas) /* any other sagas */])
}
