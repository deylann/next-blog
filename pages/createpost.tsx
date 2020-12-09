import Navbar from '../src/components/Navbar'
import { NextPage } from 'next'
import BlogSchema from '../src/yup/BlogSchema'
import { MypostVal , ICreatePost} from '../Interface/ICreatePost'
import { Container  } from '@material-ui/core'
import { Formik } from 'formik'
import { useDispatch,useSelector } from 'react-redux'
import FormBlog from '../src/components/FormBlog'
import axios from 'axios'
import { useState } from 'react'
import Router from 'next/router'
import { CREATE_POST_SUCCESS, FETCH_POST_FAILURE} from '../redux/type'



const createpost:NextPage<ICreatePost> = () => {
    // const classes = useStyles();
    const dispatch = useDispatch()
    const posts = useSelector(state => state.postData.posts)
   
    const initialValues: MypostVal = {
        userId:'',
        body:'',
        title:''
    };
    return(
        <>
        <Navbar />
        <Container>
         <h1>Create Post</h1>
         <Formik
      initialValues={initialValues}
      validationSchema={BlogSchema}
      onSubmit={(values) => {
   
        axios.post(`https://jsonplaceholder.typicode.com/posts/`,values)
                .then(response =>{
                    let id = posts[posts.length - 1].id ? posts[posts.length - 1].id : 100
                    response.data.id = id + 1
                    const res  = response.data;

                   dispatch({
                        type:CREATE_POST_SUCCESS,
                        payload: {
                            data:res,
                            message:'Successfully Created!',
                        }
                    })
                    Router.push('/');
                }).catch( err => {
                    const error = err.message;
                    dispatch({
                        type:FETCH_POST_FAILURE,
                        payload: error
                    })
                }) 
      }}
    >
      {() => {
        return (
            <FormBlog />
        );
      }}
    </Formik>
        </Container>
        </>
    )
}
export default createpost
