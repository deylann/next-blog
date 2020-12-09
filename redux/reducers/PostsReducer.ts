import * as actions from '../type'
import { produce } from 'immer';
import { IBlog } from '../../Interface/IBlogReducer'

const initialState = {
    loading: false,
    posts: [],
    error:'',
    message:'',
    messagePopUp:false
};

const PostReducer = (state:IBlog = initialState ,action:any) => {
    switch(action.type){
        case actions.FETCH_POST_REQUEST:
            return produce(state,draftState => {
                draftState.loading = true
                draftState.posts = []
            })
        case actions.FETCH_POST_FAILURE:
                return produce(state,draftState => {
                    draftState.loading = false
                    draftState.error = action.payload
                })
        case actions.FETCH_POST_SUCCESS:
            return produce(state,draftState => {
                draftState.loading = false
                draftState.posts = action.payload
            })
        case actions.CREATE_POST_SUCCESS:
            return produce(state,draftState =>{
                draftState.posts.push(action.payload.data)
                draftState.messagePopUp = true
               draftState.message = action.payload.message
            })
        case actions.DELETE_POST_SUCCESS:
                return produce(state,draftState =>{
                    draftState.posts = action.payload.data
                    draftState.message = action.payload.message
                    draftState.messagePopUp = true
            })
            case actions.EDIT_POST_SUCCESS:
                return produce(state,draftState =>{
                    draftState.posts = action.payload.data
                    draftState.message = action.payload.message
                    draftState.messagePopUp = true
            })
            case actions.SNACKBAR_SHOW:
                return produce(state,draftState =>{
                    draftState.messagePopUp = action.payload
            })
            default:return state;
        
    }
}

export default PostReducer;

