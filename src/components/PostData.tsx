import React,{ ChangeEvent, useEffect,useState } from 'react'
import { fetchPost } from '../../redux/actions/actionPostsType'
import { useSelector, connect, useDispatch } from 'react-redux'
import CircularProgress from '@material-ui/core/CircularProgress';
import styles from './PostData.module.scss'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Box, Container,Snackbar } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import Link from 'next/link';
import { Alert } from '@material-ui/lab'
import { SNACKBAR_SHOW } from '../../redux/type';

type postDetails = {
    title:string,
    id:number,
    body:string,
    userId:number
}

function PostData({fetchPosts}) {
    const postData = useSelector(state => state.postData)
    const dispatch = useDispatch()
    const [snackBarOpen, setSnackBarOpen] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [postsPerPage] = useState<number>(10);
    const indexOfLastPost = page * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = postData.posts.slice(indexOfFirstPost,indexOfLastPost);
    const posts = Math.ceil(postData.posts.length / postsPerPage)
    const handleChange = (event:ChangeEvent<HTMLButtonElement>,value:number) => {
        setPage(value);
      };
    const handleSnackBarClose = () => {
        setSnackBarOpen(false);
        dispatch({type:SNACKBAR_SHOW,payload:false});
    };

    useEffect(() =>{
        if(postData.posts.length <= 0){
            fetchPosts()
        }
        setSnackBarOpen(postData.messagePopUp)
        
    }, []);
    return postData.loading ? (
        <CircularProgress className={styles.testLoader}/>
    ) : (
        <Container className={styles.container}>
            <Typography variant="h2" component="h1">
                Articles
            </Typography>
            {/* <Grid container className={styles.cardContainer} spacing={3}> */}
            {currentPosts.map((e:postDetails,i:number) =>(
                // <Grid key={i} className={styles.card__item}>
                <Box my={4}  key={i}>
                        <Card >
                        <CardContent>
                            <Typography variant="h5" component="h2">
                            {e.title}
                            </Typography>
                            <Typography variant="body2" component="p">
                            {e.body}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Link href={`post/${e.id}`}
                            ><Button size="small">Learn More</Button></Link>
                        </CardActions>
                    </Card>
                 </Box>
            ))}
            <Box my={4} className={styles.paginationContainer}>
                <Pagination page={page} count={posts} onChange={ handleChange } color="primary" defaultPage={1}/>
            </Box>
            <Snackbar
                anchorOrigin={{ vertical:'bottom', horizontal:'left' }}
                open={snackBarOpen}
                onClose={handleSnackBarClose} 
            >
            <Alert onClose={handleSnackBarClose}  variant="filled" severity="success">
            {postData.message}
            </Alert>
      </Snackbar>
        </Container>
    
    )
}


const mapStateToProps = state => {
    return {
        postDatas: state.postData
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        fetchPosts: () => dispatch(fetchPost())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(PostData)