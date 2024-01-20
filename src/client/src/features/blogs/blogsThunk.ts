import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from 'axios';
import {type useSelectorType} from '../../store';

export const getAllBlogs = createAsyncThunk('blogs/getAllBlogs', async(_, thunkAPI) => {
    try {
        const {blogs: {page, search}} = thunkAPI.getState() as useSelectorType;
        const response = await axios.get(`/api/v1/blog?search=${search}&page=${page}`);
        const data = response.data;
        return data;
    }
    catch(error: any) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});

export const getUserFeed = createAsyncThunk('blogs/getUserFeed', async(_, thunkAPI) => {
    try {
        const {blogs: {page, search}} = thunkAPI.getState() as useSelectorType;
        const response = await axios.get(`/api/v1/blog/getUserFeed?search=${search}&page=${page}`);
        const data = response.data;
        return data;
    }
    catch(error: any) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});