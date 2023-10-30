import {Link, redirect, useLoaderData} from 'react-router-dom';
import customFetch from '../utils';
import styled from 'styled-components';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import {isEditingTrue, setEditPostValues} from '../features/addPost/addPostSlice.js';
import {deleteSinglePost} from '../features/posts/postsThunk';

export const loader = async({context, params, request}) => {
    try {
        const {id} = params;
        const response = await customFetch.get(`/post/${id}`);
        const data = response.data;
        return data.post;
    }
    catch(error) {
        return redirect('/');
    }
}

const Post = () => {
    const data = useLoaderData();
    const dispatch = useDispatch();
    const {user} = useSelector(store => store.user);
    const {_id: id, name, content, coverImage, createdAt, createdBy, createdBy: {name: author}} = data;
    const humanReadableDate = moment(createdAt).format('MMMM Do YYYY, h:mm:ss a');
    return (
        <Wrapper>
            <h1>{name}</h1>
            <h1>by: {author}</h1>
            <img src={coverImage}/>
            <h1>{humanReadableDate}</h1>
            {user?.email === createdBy.email && (
                <>
                    <Link to='/add-post'><button onClick={() => {
                        dispatch(isEditingTrue());
                        dispatch(setEditPostValues(data));
                    }}>Edit Post</button></Link>
                    <Link to='/'><button onClick={() => dispatch(deleteSinglePost(id))}>Delete Post</button></Link>
                </>
            )}
            <p>{content}</p>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    text-align: center;
    img {
        width: 25%;
        height: 25%;
    }
`;

export default Post;