import { call, put, takeLatest, fork, all, getContext } from 'redux-saga/effects'
import { FakeNotesService } from '../../services'
import { loadError, loadSuccess, NoteActionTypes } from '../actions/notes'

type PromiseType<T extends Promise<any>> = T extends Promise<infer U> ? U : never
type PromisedReturnType<T extends (...args: any) => Promise<any>> = PromiseType<ReturnType<T>>

function* fetchNotes() {
  const notes: FakeNotesService = yield getContext('notes')
  try {
    const data: PromisedReturnType<FakeNotesService['getNotes']> = yield call(() =>
      notes.getNotes(),
    )
    yield put(loadSuccess(data))
  } catch (e) {
    yield put(loadError({ error: e.message }))
  }
}

function* watchNotesFetch() {
  yield takeLatest(NoteActionTypes.LOAD_NOTES, fetchNotes)
}

export const noteSagas = function* playlistSagas() {
  yield all([fork(watchNotesFetch)])
}
