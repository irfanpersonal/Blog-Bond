import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from 'axios';

export const getSingleBlog = createAsyncThunk('singleBlog/getSingleBlog', async(blogID: string, thunkAPI) => {
    try {
        const response = await axios.get(`/api/v1/blog/${blogID}`);
        const data = response.data;
        return data.blog;
    }
    catch(error: any) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});

export const deleteSingleBlog = createAsyncThunk('user/deleteSingleBlog', async(blogID: string, thunkAPI) => {
    try {
        const response = await axios.delete(`/api/v1/blog/${blogID}`);
        const data = response.data;
        return data;
    }
    catch(error: any) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});

export const editSingleBlog = createAsyncThunk('user/editSingleBlog', async(blogData: {blogID: string, data: FormData}, thunkAPI) => {
    try {
        const response = await axios.patch(`/api/v1/blog/${blogData.blogID}`, blogData.data);
        const data = response.data;
        return data.blog;
    }
    catch(error: any) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});