import { NotesContainer } from './components/NotesContainer'
import { Note } from './components/Note'
import { NotesEditor } from './components/NotesEditor'
import { createNote, loadNotes } from './redux/actions/notes'
import React from 'react'
import { createNotesStore, NotesStore } from './mobx/notes'
import { FakeNotesService } from './services'
import { observer } from 'mobx-react-lite'
import { Button } from '@react95/core'

export function installMobXNotesApp() {
  const store = createNotesStore({ notes: new FakeNotesService() })
  return () => <MobXNotesApp store={store} />
}

const MobXNote = observer(Note)

const MobXNotesApp = observer(({ store }: { store: NotesStore }) => {
  return (
    <div>
      <NotesContainer>
        {store.state.notes.map((n) => (
          <MobXNote key={n.id} text={n.text} name={n.id} onChange={store.update} />
        ))}
      </NotesContainer>
      <NotesEditor
        onSubmit={(note) => {
          store.create(note)
        }}
      />
      <br />
      <Button onClick={store.load}>load</Button>
    </div>
  )
})
