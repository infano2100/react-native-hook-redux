import React, { Component } from 'react'
import { Provider } from 'react-redux'
import configureStore from './src/config/configureStore'
import { PersistGate } from 'redux-persist/integration/react'
import TabLists from './src/components/TabLists'

const { store, persistor } = configureStore()

export default App = () => {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <TabLists />
        </PersistGate>
      </Provider>
    )
}