import {createAsyncThunk} from '@reduxjs/toolkit';
import customFetch from '../../utils';
import {logout} from '../user/userSlice.js';

export const createPost = createAsyncThunk('addPost/createPost', async(post, thunkAPI) => {
    try {
        const response = await customFetch.post('/post', post);
        const data = response.data;
        return data.post;
    }
    catch(error) {
        if (error.response.status === 401) {
            thunkAPI.dispatch(logout());
        }
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});

export const updateSinglePost = createAsyncThunk('addPost/updateSinglePost', async({postID, post}, thunkAPI) => {
    try {
        const response = await customFetch.patch(`/post/${postID}`, post);
        const data = response.data;
        return data.post;
    }
    catch(error) {
        if (error.response.status === 401) {
            thunkAPI.dispatch(logout());
        }
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});