import { Notes } from './redux/reducers/notes'

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export class FakeNotesService {
  async getNotes(): Promise<Notes> {
    await delay(200)
    return [
      { id: 'fake A', text: 'A fake note' },
      { id: 'fake B', text: 'A second fake note' },
    ]
  }
}
