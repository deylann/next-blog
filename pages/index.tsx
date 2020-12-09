import Navbar from '../src/components/Navbar'
import PostData from '../src/components/PostData'
import { NextPage } from 'next'

const Home: NextPage = () => {
  return (
    <>
    <Navbar/>
    <PostData />
    </>
  )
}
export default Home;