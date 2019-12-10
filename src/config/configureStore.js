import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'remote-redux-devtools'

import reducers from '../redux/reducers'

  const persistConfig = {
    key: 'root',
    storage,
  }

  const middlewares = [thunk]
  const persistedReducer = persistReducer(persistConfig, reducers)

  export default () => {
    let store = createStore(
      persistedReducer,
      composeWithDevTools(applyMiddleware(...middlewares))
    )
    let persistor = persistStore(store)
    return { store, persistor }
  }
