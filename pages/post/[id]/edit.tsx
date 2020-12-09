import { NextPage,GetServerSideProps } from 'next'
import { Box, Button, Container } from '@material-ui/core';
import { useRouter } from 'next/router'
import { useDispatch,useSelector } from 'react-redux'
import Navbar from '../../../src/components/Navbar'
import Link from 'next/link'
import styles from '../../../src/components/PostData.module.scss'
import axios from 'axios'
import { Formik } from 'formik'
import BlogSchema from '../../../src/yup/BlogSchema'
import FormBlog from '../../../src/components/FormBlog';
import {MypostVal} from '../../../Interface/ICreatePost'
import {  EDIT_POST_SUCCESS, FETCH_POST_FAILURE } from '../../../redux/type'
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import Router from 'next/router'

interface PostVal {
    postData:
    {
        [key: string]:{
            userId:number,
            id:number,
            title:string,
            body:string
        }
    }
}

const EditPage:NextPage<PostVal> = ({postData}) => {
    const router = useRouter();
    const posts = useSelector(state => state.postData.posts)
    const post = posts.find(post=> post.id == router.query.id ) ?  posts.find(post=> post.id == router.query.id ) : postData ;
    const { query } = router;
    const dispatch = useDispatch()
    // dispatch({type: EDIT_POST_REQUEST, payload:{data:[],message:'',openAlert:false}})

    const initialValues: MypostVal = {
        userId:String(post.userId),
        body:String(post.body),
        title:String(post.title)
    };
    return(
    <>
    <Navbar />
    <Container  className={styles.container}>
        <Box display="flex" p={2} my={3}>
            <Link href={`/post/${ query.id }`}>
                <Button startIcon={<KeyboardBackspaceIcon/>} className={styles.back__button} variant="contained" color="primary">
                    Back
                </Button>
            </Link>
        </Box>
        
        {/* <h1>Edit Post # { query.id }</h1> */}
        <Formik
           initialValues={initialValues}
           validationSchema={BlogSchema}
           onSubmit={(values) => {
           
            axios.put(`https://jsonplaceholder.typicode.com/posts/${ query.id }`,values)
                    .then(response =>{
                        const {title,body,userId, id}  = response.data;
                        const newPosts = posts.map(post =>{
                            if(id !== post.id) return post;
                            return {
                                ...post,title,body,userId
                            };
                        })
                       dispatch({
                            type:EDIT_POST_SUCCESS,
                            payload: {
                                data:newPosts,
                                message:'Update Successfully!',
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
                return( <FormBlog />)
            }}
        </Formik>
    </Container>
    
    </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { params } = context
    const res = await axios.get(`https://jsonplaceholder.typicode.com/posts/${params.id}`)
    const postData = await res.data;

    return {
        props: {
            postData
        }
    }
  }

  export default EditPage;