import { combineReducers,Reducer } from 'redux' 
import PostReducer from '../reducers/PostsReducer'
const rootReducer = combineReducers({
    postData:PostReducer,
    // editPost:EditPostReducer,
})

export default rootReducer