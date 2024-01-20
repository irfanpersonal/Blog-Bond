import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from 'axios';

export const createBlog = createAsyncThunk('blog/createBlog', async(blogData: FormData, thunkAPI) => {
    try {
        const response = await axios.post('/api/v1/blog', blogData);
        const data = response.data;
        return data.blog;
    }
    catch(error: any) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});