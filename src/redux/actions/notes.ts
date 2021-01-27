import { createAction } from 'redux-actions'
import { Note } from '../reducers/notes'
import { Action } from 'redux'

export type ActionWithPayload<T extends string, P = never> = [P] extends [never]
  ? Action<T>
  : Action<T> & { payload: P }

export enum NoteActionTypes {
  LOAD_NOTES = 'LOAD_NOTES',
  LOAD_NOTES_SUCCESS = 'LOAD_NOTES_SUCCESS',
  LOAD_NOTES_ERROR = 'LOAD_NOTES_ERROR',
  CREATE_NEW_NOTE = 'CREATE_NEW_NOTE',
  DELETE_NOTE = 'DELETE_NOTE',
  UPDATE_NOTE = 'UPDATE_NOTE',
}

export const loadNotes = createAction(NoteActionTypes.LOAD_NOTES)
export const loadSuccess = createAction<Note[]>(NoteActionTypes.LOAD_NOTES_SUCCESS)
export const loadError = createAction<{ error: string }>(NoteActionTypes.LOAD_NOTES_ERROR)
export const createNote = createAction<Note>(NoteActionTypes.CREATE_NEW_NOTE)
export const deleteNote = createAction<{ id: string }>(NoteActionTypes.DELETE_NOTE)
export const updateNote = createAction<Note>(NoteActionTypes.UPDATE_NOTE)

export type LOAD_NOTES = Action<NoteActionTypes.LOAD_NOTES>
export type LOAD_NOTES_SUCCESS = ActionWithPayload<NoteActionTypes.LOAD_NOTES_SUCCESS, Note[]>
export type LOAD_NOTES_ERROR = ActionWithPayload<
  NoteActionTypes.LOAD_NOTES_ERROR,
  { error: string }
>
export type CREATE_NEW_NOTE = ActionWithPayload<NoteActionTypes.CREATE_NEW_NOTE, Note>
export type DELETE_NOTE = ActionWithPayload<NoteActionTypes.DELETE_NOTE, { id: string }>
export type UPDATE_NOTE = ActionWithPayload<NoteActionTypes.UPDATE_NOTE, Note>

export type NoteActions =
  | LOAD_NOTES
  | CREATE_NEW_NOTE
  | DELETE_NOTE
  | UPDATE_NOTE
  | LOAD_NOTES_SUCCESS
  | LOAD_NOTES_ERROR
