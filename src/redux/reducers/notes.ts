import { NoteActions, NoteActionTypes } from '../actions/notes'

export type GroupedById<T> = { byId: Record<string, T>; allIds: string[] }

export function groupByIds<T extends { id: string }>(data: T[]): GroupedById<T> {
  return data.reduce(
    (p: GroupedById<T>, c: T) => {
      p.byId[c.id] = c
      p.allIds.push(c.id)
      return p
    },
    { byId: {}, allIds: [] },
  )
}

export enum LoadingState {
  INITIAL,
  LOADING,
  LOADED,
  ERROR,
}

export type Note = {
  id: string
  text: string
}

export type Notes = Note[]
type NotesDict = { [Key: string]: Note }

export type NotesState = {
  state: LoadingState
  byId: NotesDict
  allIds: string[]
  errorMessage: string
}

const initialState = {
  state: LoadingState.INITIAL,
  byId: {},
  allIds: [],
  errorMessage: '',
}

export function notesReducer(state: NotesState = initialState, action: NoteActions): NotesState {
  switch (action.type) {
    case NoteActionTypes.LOAD_NOTES:
      return {
        ...state,
        state: LoadingState.LOADING,
      }
    case NoteActionTypes.LOAD_NOTES_SUCCESS: {
      const notes = action.payload
      if (notes === null) {
        return state
      }
      return {
        ...state,
        state: LoadingState.LOADED,
        ...groupByIds(notes),
      }
    }
    case NoteActionTypes.LOAD_NOTES_ERROR:
      return {
        ...state,
        state: LoadingState.ERROR,
        byId: {},
        allIds: [],
        errorMessage: action.payload.error,
      }
    case NoteActionTypes.DELETE_NOTE: {
      const { id } = action.payload
      return {
        ...state,
        byId: Object.keys(state.byId).reduce<NotesDict>((p, c) => {
          if (c !== id) p[c] = state.byId[c]
          return p
        }, {}),
        allIds: state.allIds.filter((f) => f !== id),
      }
    }
    case NoteActionTypes.UPDATE_NOTE: {
      const { id, text } = action.payload
      const note = state.byId[id]
      return {
        ...state,
        byId: {
          ...state.byId,
          [id]: {
            ...note,
            text,
          },
        },
      }
    }
    case NoteActionTypes.CREATE_NEW_NOTE: {
      const { id, text } = action.payload
      return {
        ...state,
        allIds: [...state.allIds, id],
        byId: {
          ...state.byId,
          [id]: {
            id,
            text,
          },
        },
      }
    }
  }
  return state
}
