import React from 'react'
import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'
import { FakeNotesService } from '../services'
import { Provider } from 'react-redux'
import { reducer } from './reducers/reducers'
import { rootSaga } from './sagas/sagas'

export function installRedux(services: { notes: FakeNotesService }) {
  const sagaMiddleware = createSagaMiddleware({
    context: {
      notes: services.notes,
    },
  })

  const middleware = applyMiddleware(sagaMiddleware)
  const store = createStore(reducer, {}, composeWithDevTools(middleware))
  sagaMiddleware.run(rootSaga)
  return {
    ReduxProvider: ({ children }: React.PropsWithChildren<unknown>) => (
      <Provider store={store}>{children}</Provider>
    ),
  }
}
