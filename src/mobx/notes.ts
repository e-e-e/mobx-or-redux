import { FakeNotesService } from '../services'
import { action, makeAutoObservable, observable, runInAction } from 'mobx'
import { LoadingState } from '../redux/reducers/notes'

export type Note = {
  id: string
  text: string
}
export type Notes = Note[]

class NoteState {
  notes: Notes = []
  error?: string
  state: LoadingState = LoadingState.INITIAL

  constructor() {
    makeAutoObservable(this)
  }
}

export type NotesStore = {
  state: NoteState
  load(): Promise<void>
  create(note: Note): void
  update(note: Note): void
  delete(id: string): void
}

export function createNotesStore(services: { notes: FakeNotesService }): NotesStore {
  const state = new NoteState()
  return {
    state,
    load: async () => {
      const notes = await services.notes.getNotes()
      runInAction(() => {
        state.notes = notes
      })
    },
    create: action((note: Note) => {
      state.notes.push(note)
    }),
    update: action((note: Note) => {
      const old = state.notes.find((n) => n.id === note.id)
      old.text = note.text
    }),
    delete: action((id: string) => {
      const index = state.notes.findIndex((n) => n.id === id)
      if (index >= 0) {
        state.notes.splice(index, 1)
      }
    }),
  }
}
