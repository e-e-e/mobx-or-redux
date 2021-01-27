import React from 'react'
import { ThemeProvider, GlobalStyle } from '@react95/core'
import '@react95/icons/icons.css'
import './App.css'
import { installReduxNotesApp } from './ReduxNotesApp'
import { installMobXNotesApp } from './MobXNotesApp'

const ReduxNotesApp = installReduxNotesApp()
const MobXNotesApp = installMobXNotesApp()

function App() {
  return (
    <ThemeProvider>
      <GlobalStyle />
      <div className="App">
        <div>
          <h1>Redux</h1>
          <ReduxNotesApp />
        </div>
        <div>
          <h1>MobX</h1>
          <MobXNotesApp />
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App
