import { createStore, applyMiddleware } from "redux"
import logger from 'redux-logger'
import rootReducer from '../reducers/index'
import { persistStore } from "redux-persist";

// const middleWares = [logger]

export const store = createStore(rootReducer, applyMiddleware(logger))

export const persistor = persistStore(store)

// export {store}