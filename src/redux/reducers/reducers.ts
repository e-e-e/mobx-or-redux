import { combineReducers } from 'redux'
import { notesReducer } from './notes'

export const reducer = combineReducers({
  notes: notesReducer,
})

export type RootState = ReturnType<typeof reducer>
