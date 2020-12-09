import axios from 'axios';
import * as actions from '../type';


export const fetchPost = () => {
    return (dispatch:any) => {
        dispatch({
            type:actions.FETCH_POST_REQUEST,
        });
        axios.get('https://jsonplaceholder.typicode.com/posts')
        .then(response => {
            const posts = response.data
            dispatch({
                type:actions.FETCH_POST_SUCCESS,
                payload:posts
            })
           
        }).catch(error => {
            const errorMsg = error.message
            dispatch({
                type:actions.FETCH_POST_FAILURE,
                payload:errorMsg
            })
        })
    }
}
