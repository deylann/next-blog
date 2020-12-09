import { createStore ,applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import rootReducer from './reducers'
import { composeWithDevTools } from 'redux-devtools-extension';



const store = createStore(
    rootReducer
    ,composeWithDevTools(applyMiddleware(logger,thunk)))

export default store;