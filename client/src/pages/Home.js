import {useSelector} from 'react-redux';
import {SearchBox, PostsList, PaginationBox} from '../components';
import {getAllPosts} from '../features/posts/postsThunk';

const Home = () => {
    const {totalPosts} = useSelector(store => store.posts);
    return (
        <>
            <SearchBox/>
            <PostsList method={getAllPosts}/>
            {totalPosts > 10 && (
                <PaginationBox/>
            )}
        </>
    );
}

export default Home;