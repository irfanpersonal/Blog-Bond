import {createSlice} from "@reduxjs/toolkit";
import {createBlog} from "./blogThunk";
import {toast} from 'react-toastify';

interface IBlog {
    createBlogLoading: boolean
}

const initialState: IBlog = {
    createBlogLoading: false
};

const blogSlice = createSlice({
    name: 'blog',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(createBlog.pending, (state) => {
            state.createBlogLoading = true;
        }).addCase(createBlog.fulfilled, (state, action) => {
            state.createBlogLoading = false;
            toast.success('Created Blog!');
        }).addCase(createBlog.rejected, (state, action) => {
            state.createBlogLoading = false;
            toast.error(action.payload as string);
        })
    }
});

export const {} = blogSlice.actions;

export default blogSlice.reducer;