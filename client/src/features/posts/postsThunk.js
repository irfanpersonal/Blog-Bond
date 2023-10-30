import {createAsyncThunk} from '@reduxjs/toolkit';
import customFetch from '../../utils';
import {logout} from '../user/userSlice';

export const getAllPosts = createAsyncThunk('posts/getAllPosts', async(_, thunkAPI) => {
    try {
        const {search, page} = thunkAPI.getState().posts;
        const response = await customFetch.get(`/post?search=${search}&page=${page}`);
        const data = response.data;
        return data;
    }   
    catch(error) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});

export const deleteSinglePost = createAsyncThunk('posts/deleteSinglePost', async(postID, thunkAPI) => {
    try {
        const response = await customFetch.delete(`/post/${postID}`);
        const data = response.data;
        thunkAPI.dispatch(getAllPosts());
        return data;
    }
    catch(error) {
        if (error.response.status === 401) {
            thunkAPI.dispatch(logout());
        }
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});

export const getUserSpecificPosts = createAsyncThunk('post/getUserSpecificPosts', async(_, thunkAPI) => {
    try {
        const response = await customFetch.get('/post/user');
        const data = response.data;
        return data;
    }
    catch(error) {
        if (error.response.status === 401) {
            thunkAPI.dispatch(logout());
        }
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});