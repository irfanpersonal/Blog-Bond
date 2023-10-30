import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getAllPosts} from '../features/posts/postsThunk.js';
import PostsListItem from './PostsListItem.js';

const PostsList = ({method}) => {
    const dispatch = useDispatch();
    const {isLoading, posts, totalPosts} = useSelector(store => store.posts);
    React.useEffect(() => {
        dispatch(method());
    }, []);
    if (isLoading) {
        return (
            <h1 style={{textAlign: 'center', margin: '1rem 0', backgroundColor: 'black', color: 'white'}}>Loading...</h1>
        );
    }
    if (!posts.length) {
        return (
            <h1 style={{textAlign: 'center', margin: '1rem 0', backgroundColor: 'black', color: 'white'}}>No Blog Posts Found...</h1>
        );
    }
    return (
        <section>
            <h1 style={{margin: '1rem 0', borderBottom: '1px solid black'}}>{totalPosts} Post{totalPosts > 1 && 's'} Found</h1>
            {posts.map(post => {
                return <PostsListItem key={post._id} data={post}/>
            })}
        </section>
    );
}

export default PostsList;