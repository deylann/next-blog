import styles from '../../src/components/PostData.module.scss'
import {GetServerSideProps  } from 'next'
import { Box, Button, Card,CardContent,Typography, Container, Modal, Fade, Backdrop} from '@material-ui/core' 
import Navbar from '../../src/components/Navbar'
import axios from 'axios';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Router ,{  useRouter } from 'next/router'
import Link from 'next/link'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { DELETE_POST_SUCCESS, FETCH_POST_REQUEST } from '../../redux/type'

import DeleteIcon from '@material-ui/icons/Delete';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import EditIcon from '@material-ui/icons/Edit';
import { useSelector } from 'react-redux'

// import { route } from 'next/dist/next-server/server/router'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    button: {
        marginRight:"10px"
    }
  }),
);


type commentType = {
    postId:number,
    id:number,
    name:string
    email:string,
    body:string
}   

function SinglePost({comments}) {
        const router = useRouter();
        const classes = useStyles();
        const [openModal, setOpenModal] = useState<boolean>(false);

        const dispatch = useDispatch()
        console.log(comments);
        const posts = useSelector(state => state.postData.posts)
        const post = posts.find(post=> post.id == router.query.id )
        
        const deleteForm = async () => {
           axios.delete(`https://jsonplaceholder.typicode.com/posts/${post.id}`)
           .then(()=>{
            const deleted = posts.filter(post => {return post.id != router.query.id})
            dispatch({type: DELETE_POST_SUCCESS,payload:{data:deleted,message:"Deleted Successfully"}});
            setOpenModal(false)
            Router.push('/');
           }).catch((err) =>{
               const message = err.message;
           })
           
      
         
        }

        const handleOpen = () => {
            setOpenModal(true);
          };
        
          const handleClose = () => {
            setOpenModal(false);
          };

      
        
        return (<div>
           <Navbar/>
           <Container className={styles.container}>
           <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={openModal}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                }}
        >
        <Fade in={openModal}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Message Alert</h2>
            <p id="transition-modal-description">Are you sure you want to delete this?</p>
            <Box display="flex" justifyContent="flex-end">
                <Button className={classes.button} onClick={deleteForm} variant="contained" color="primary">Yes</Button>
                <Button onClick={handleClose} variant="contained" color="primary">No</Button>
            </Box>
          </div>
        </Fade>
  
      </Modal>
     
        <Box display="flex" justifyContent="space-between" p={2} my={3}>
            <Link href="/">
                <Button className={styles.back__button} variant="contained" startIcon={<KeyboardBackspaceIcon/>} color="primary">Back</Button>
            </Link>
            <Link href={`${router.query.id}/edit`}>
                <Button className={styles.back__button} variant="contained" startIcon={<EditIcon />} color="primary">Edit</Button>
            </Link>
        </Box>
       
       { post && <Card className={styles.card__post}>
           <CardContent>
               <Box display="flex" justifyContent="space-between">
               <Typography color="textSecondary">
                   Post #{post.id}
               </Typography>
               <Button variant="contained"  onClick={handleOpen} color="secondary" startIcon={<DeleteIcon />}>Delete</Button>
               </Box>
   
               <Typography variant="h5">
                   {post.title}
               </Typography>
               <Typography>
                   {post.body}
               </Typography>
              
               <Box my={4}>
                <hr/>
              {comments.length >= 1 ? <h3>All Comments</h3> : <h3>No Comment Available</h3> }
               {
                  comments.map((comment:commentType, index:number) => (
                       <Box my={5} key={index}> 
                           <Card>
                               <CardContent>
                                   <Typography variant="h6">
                                   {comment.name}
                                   </Typography>
                                   <Typography className={styles.comment__body}>
                                       {comment.body}
                                   </Typography>
                               </CardContent>
                           </Card>
                       </Box>
                   ))
               }
               </Box>
           </CardContent>
       </Card>
       }
        </Container> 
           </div>)
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { query } = context;
    const res2 = await axios.get(`https://jsonplaceholder.typicode.com/posts/${query.id}/comments`)
    const result2:commentType  = await res2.data;

    return result2 ? { props:{comments:result2}} : undefined
}

// SinglePost.getInitialProps = async (ctx) => {
//     const { query } = ctx;
//     const res = await axios.get(`https://jsonplaceholder.typicode.com/posts/${query.id}`)
//     const res2 = await axios.get(`https://jsonplaceholder.typicode.com/posts/${query.id}/comments`)
//     const result = await res.data;
//     const result2 = await res2.data;

//     return{
//         post:result,
//         comments:result2
//     }
// }

export default SinglePost;
// function SinglePost({post,comments}){
//     // const dispatch = useDispatch();
//     // const router = useRouter();
//     // const { id } = router.query
//     // useEffect(() => {
//     //     if(id != undefined){
//     //         dispatch(fetchSinglePost(id));
//     //     }

//     // }, [router])
//     return (
//         <div>
//             <Navbar/>
//             <Post post={post} comments={comments}/>
//         </div>
//     )
// }



// export const getStaticPaths: GetStaticPaths = async () => {
//     const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
//     const posts = await res.data;

//     const paths = posts.map((post:PostType) => ({
//         params: {id: post.id.toString()}
//     }))


//     return {
//         paths,
//         fallback:true
//     }
// }

// export const getStaticProps: GetStaticProps = async ({params}) => {

//     const res = await axios.get(`https://jsonplaceholder.typicode.com/posts/${params.id}`)
//     const res2 = await axios.get(`https://jsonplaceholder.typicode.com/posts/${params.id}/comments`)
//     const post = await res.data;
//     const comments = await res2.data;

//     return {
//         props:{
//             post:post,
//             comments:comments
//         }
//     }
// }



// SinglePost.getInitialProps = ctx => {

//     const dispatch = useDispatch(function)
//     return {
//         fetchSinglePost: () => dispatch(fetchSinglePost())
//     }
// }

// const mapStateToProps = state => {
//     return {
//         post: state.singlePost
//     }
// }

// const mapDispatchToProps =  dispatch => {
//     return {
//         fetchSinglePost: () => dispatch(fetchSinglePost())
//     }
// }
    



