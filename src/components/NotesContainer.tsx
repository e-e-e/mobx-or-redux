import React from 'react'
import { Fieldset } from '@react95/core'
export function NotesContainer({ children }: React.PropsWithChildren<unknown>) {
  return (
    <Fieldset legend="Our Notes" style={{ display: 'flex' }}>
      {children}
    </Fieldset>
  )
}
