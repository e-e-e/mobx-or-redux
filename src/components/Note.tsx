import React from 'react'
import { Icon, Modal, List, TextArea } from '@react95/core'
import styled from '@xstyled/styled-components'

const Name = styled.span`
  word-break: break-word;
`
const StyledNote = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  text-align: center;
  width: 25%;
  margin-bottom: 4px;
  text-decoration: none;
  color: inherit;
`

function NoteModal({
  name,
  text,
  onClose,
  onAccept,
}: {
  name: string
  text: string
  onClose: () => void
  onAccept: (value: string) => void
}) {
  const [value, setValue] = React.useState(text)
  return (
    <Modal
      width="300"
      height="200"
      icon="file_text_32x32_4bit"
      title={name}
      defaultPosition={{
        x: 0,
        y: 20,
      }}
      closeModal={onClose}
      buttons={[
        { value: 'Ok', onClick: () => onAccept(value) },
        { value: 'Cancel', onClick: onClose },
      ]}
      menu={[
        {
          name: 'File',
          list: (
            <List>
              <List.Item onClick={onClose}>Exit</List.Item>
            </List>
          ),
        },
        {
          name: 'Edit',
          list: (
            <List>
              <List.Item>Copy</List.Item>
            </List>
          ),
        },
      ]}
    >
      {text}
      <TextArea value={value} onChange={(e) => setValue(e.target.value || '')} />
    </Modal>
  )
}

export function Note({
  name,
  text,
  onChange,
}: {
  name: string
  text: string
  onChange: (note: { id: string; text: string }) => void
}) {
  const [showModal, toggleShowModal] = React.useState(false)
  const open = () => toggleShowModal(true)
  const onClose = () => toggleShowModal(false)
  const onAccept = (v: string) => {
    if (v !== text) {
      onChange({ id: name, text: v })
    }
    onClose()
  }
  return (
    <StyledNote>
      <Icon name="file_text_32x32_4bit" style={{ marginBottom: 4 }} onClick={open} />
      <Name>{name}.txt</Name>
      {showModal && <NoteModal name={name} text={text} onClose={onClose} onAccept={onAccept} />}
    </StyledNote>
  )
}
