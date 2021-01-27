import { installRedux } from './redux/install'
import { FakeNotesService } from './services'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from './redux/reducers/reducers'
import { Notes } from './redux/reducers/notes'
import { NotesContainer } from './components/NotesContainer'
import { Note } from './components/Note'
import { NotesEditor } from './components/NotesEditor'
import { createNote, loadNotes, updateNote } from './redux/actions/notes'
import { Button } from '@react95/core'
import React from 'react'

export function installReduxNotesApp() {
  const { ReduxProvider } = installRedux({ notes: new FakeNotesService() })
  return () => (
    <ReduxProvider>
      <ReduxNotes />
    </ReduxProvider>
  )
}

function ReduxNotes() {
  const notes = useSelector<RootState, Notes>((state) =>
    state.notes.allIds.map((id) => state.notes.byId[id]),
  )
  const dispatch = useDispatch()
  const onChange = React.useCallback(
    (note: { id: string; text: string }) => {
      dispatch(updateNote(note))
    },
    [dispatch],
  )
  return (
    <div>
      <NotesContainer>
        {notes.map((n) => (
          <Note text={n.text} name={n.id} onChange={onChange} />
        ))}
      </NotesContainer>
      <NotesEditor
        onSubmit={(note) => {
          dispatch(createNote(note))
        }}
      />
      <br />
      <Button onClick={() => dispatch(loadNotes())}>load</Button>
    </div>
  )
}
