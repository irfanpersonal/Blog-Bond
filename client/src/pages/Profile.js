import styled from 'styled-components';
import {getUserSpecificPosts} from '../features/posts/postsThunk';
import {PostsList, PaginationBox} from '../components';
import {useDispatch, useSelector} from 'react-redux';
import React from 'react';
import {updateUser} from '../features/user/userThunk';

const Profile = () => {
    const dispatch = useDispatch();
    const {user} = useSelector(store => store.user);
    const [input, setInput] = React.useState({
        name: user?.name,
        email: user?.email
    });
    const handleChange = (event) => {
        setInput(currentState => {
            return {...currentState, [event.target.name]: event.target.value};
        });
    }
    const {totalPosts} = useSelector(store => store.posts);
    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(updateUser(input));
    }
    return (
        <Wrapper>
            <form onSubmit={handleSubmit}>
                <h1 style={{textAlign: 'center', backgroundColor: 'black', color: 'white'}}>Profile</h1>
                <div style={{marginTop: '1rem'}}>
                    <label htmlFor="name">Name</label>
                    <input id="name" type="text" name="name" style={{padding: '0.5rem', display: 'block', width: '100%'}} value={input.name} onChange={handleChange}/>
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input id="email" type="email" name="email" style={{padding: '0.5rem', display: 'block', width: '100%'}} value={input.email} onChange={handleChange}/>
                </div>
                <button type="submit" style={{padding: '0.5rem', width: '100%'}}>UDPATE</button>
            </form>
            <PostsList method={getUserSpecificPosts}/>
            {totalPosts > 10 && (
                <PaginationBox/>
            )}
        </Wrapper>
    );
}

const Wrapper = styled.div`
    form {
        border: 1px solid black;
        padding: 1rem;
        background-color: white;
        width: 50%;
        border-radius: 1rem;
        margin: 0 auto;
    }
    label {
        margin-top: 1rem;
    }
    input {
        margin-bottom: 1rem;
    }
    p {
        text-align: center;
    }
    span {
        background-color: lightgray;
        padding: 0.25rem 2rem;
        border-radius: 1rem;
        cursor: pointer;
        border: 1px solid black;
    }
    img {
        width: 10%;
        height: 10%;
    }
`;

export default Profile;