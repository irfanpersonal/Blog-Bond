import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';
import {createPost, updateSinglePost} from '../features/addPost/addPostThunk.js';
import {isEditingFalse, onChangeEditPostValues, resetEditPostValues} from '../features/addPost/addPostSlice.js';

const AddPost = () => {
    const dispatch = useDispatch();
    const {isLoading, isEditing, editPostValues} = useSelector(store => store.addPost);
    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('name', event.target.elements.name.value);
        formData.append('content', event.target.elements.content.value);
        formData.append('image', event.target.image.files[0]);
        if (isEditing) {
            dispatch(updateSinglePost({postID: editPostValues._id, post: formData}));
            return;
        }
        dispatch(createPost(formData));
    }
    if (isLoading) {
        return (
            <h1 style={{textAlign: 'center', margin: '1rem 0', backgroundColor: 'black', color: 'white'}}>Loading...</h1>
        );
    }
    return (
        <Wrapper>
            <form onSubmit={handleSubmit}>
                <h1>{isEditing ? 'Edit Post' : 'Add Post'}</h1>
                <div>
                    <label htmlFor="name">Name</label>
                    <input id="name" type="text" name="name" style={{padding: '0.5rem'}} value={editPostValues.name} onChange={(event) => dispatch(onChangeEditPostValues({name: event.target.name, value: event.target.value}))}/>
                </div>
                <div>
                    <label htmlFor="content">Content</label>
                    <textarea id="content" name="content" style={{width: '100%', height: '400px'}} value={editPostValues.content} onChange={(event) => dispatch(onChangeEditPostValues({name: event.target.name, value: event.target.value}))}/>
                </div>
                <div>
                    <label htmlFor="image">Cover Image</label>
                    <input id="image" type="file" name="image"/>
                    {isEditing && (
                        <>
                            <small>Current Image: </small><img src={editPostValues.coverImage}/>
                        </>
                    )}
                </div>
                {isEditing && (
                    <button type="button" style={{padding: '0.5rem'}} onClick={() => {
                        dispatch(isEditingFalse());
                        dispatch(resetEditPostValues());
                    }}>CLEAR</button>
                )}
                <button type="submit" style={{padding: '0.5rem'}} disabled={isLoading}>{isLoading ? 'SUBMITTING' : 'SUBMIT'}</button>
            </form>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    h1 {
        border-bottom: 1px solid black;
        text-align: center;
    }
    form {
        border: 1px solid black;
        padding: 1rem;
        background-color: white;
        width: 50%;
        border-radius: 1rem;
    }
    label, input, button {
        display: block;
        width: 100%;
    }
    label, button {
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

export default AddPost;