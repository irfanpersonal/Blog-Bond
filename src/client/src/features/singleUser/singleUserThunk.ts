import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from 'axios';
import {type useSelectorType} from '../../store';

export const getSingleUser = createAsyncThunk('user/getSingleUser', async(userID: string, thunkAPI) => {
    try {
        const response = await axios.get(`/api/v1/user/${userID}`);
        const data = response.data;
        return data.user;
    }
    catch(error: any) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});

export const getSingleUserBlogs = createAsyncThunk('user/getSingleUserBlogs', async(name: string, thunkAPI) => {
    try {
        const {singleUser: {page, search}} = thunkAPI.getState() as useSelectorType;
        const response = await axios.get(`/api/v1/blog?username=${name}&search=${search}&page=${page}`);
        const data = response.data;
        return data;
    }
    catch(error: any) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});

export const followUser = createAsyncThunk('user/followUser', async(userID: string, thunkAPI) => {
    try {
        const response = await axios.post(`/api/v1/user/${userID}/followUser`);
        const data = response.data;
        return data;
    }
    catch(error: any) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});

export const unfollowUser = createAsyncThunk('user/unfollowUser', async(userID: string, thunkAPI) => {
    try {
        const response = await axios.delete(`/api/v1/user/${userID}/unfollowUser`);
        const data = response.data;
        return data;
    }
    catch(error: any) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});