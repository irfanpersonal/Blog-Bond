import {createSlice} from "@reduxjs/toolkit";
import {deleteSingleBlog, editSingleBlog, getSingleBlog} from "./singleBlogThunk";
import {type BlogType} from '../user/userSlice';
import {toast} from 'react-toastify';

interface ISingleBlog {
    singleBlogLoading: boolean,
    deleteSingleBlogLoading: boolean,
    editSingleBlogLoading: boolean,
    singleBlog: BlogType | null
}

const initialState: ISingleBlog = {
    singleBlogLoading: true,
    deleteSingleBlogLoading: false,
    editSingleBlogLoading: false,
    singleBlog: null
};  

const singleBlog = createSlice({
    name: 'singleBlog',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getSingleBlog.pending, (state) => {
            state.singleBlogLoading = true;
        }).addCase(getSingleBlog.fulfilled, (state, action) => {
            state.singleBlogLoading = false;
            state.singleBlog = action.payload;
        }).addCase(getSingleBlog.rejected, (state) => {
            state.singleBlogLoading = true;
        }).addCase(deleteSingleBlog.pending, (state) => {
            state.deleteSingleBlogLoading = true;
        }).addCase(deleteSingleBlog.fulfilled, (state) => {
            state.deleteSingleBlogLoading = false;
            toast.success('Deleted Blog!');
        }).addCase(deleteSingleBlog.rejected, (state, action) => {
            state.deleteSingleBlogLoading = false;
            toast.error(action.payload as string);
        }).addCase(editSingleBlog.pending, (state) => {
            state.editSingleBlogLoading = true;
        }).addCase(editSingleBlog.fulfilled, (state, action) => {
            state.editSingleBlogLoading = false;
            state.singleBlog = action.payload;
            toast.success('Edited Blog!');
        }).addCase(editSingleBlog.rejected, (state, action) => {
            state.editSingleBlogLoading = false;
            toast.error(action.payload as string);
        });
    }
});

export const {} = singleBlog.actions;

export default singleBlog.reducer;