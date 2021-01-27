import React from 'react'
import { Fieldset, Input, Button } from '@react95/core'

export function NotesEditor({
  onSubmit,
}: {
  onSubmit: (data: { id: string; text: string }) => void
}) {
  const [name, setName] = React.useState('')
  const [text, setText] = React.useState('')
  const disabled = !name.trim() || !text.trim()
  const submit = () => {
    if (!disabled) {
      onSubmit({ id: name, text })
      setName('')
      setText('')
    }
  }
  return (
    <Fieldset legend="Make a note" style={{ marginTop: 30 }}>
      <label>
        Name: <Input required onChange={(e) => setName(e.target.value ?? '')} value={name} />
      </label>
      <br />
      <br />
      <label>
        Text: <Input required onChange={(e) => setText(e.target.value ?? '')} value={text} />
      </label>
      <br />
      <br />
      <Button onClick={submit} disabled={disabled} />
    </Fieldset>
  )
}
