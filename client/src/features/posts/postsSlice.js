import {createSlice} from '@reduxjs/toolkit';
import {getAllPosts, deleteSinglePost, getUserSpecificPosts} from './postsThunk.js';
import {toast} from 'react-toastify';

const initialState = {
    isLoading: false,
    posts: [],
    totalPosts: '',
    numberOfPages: '',
    page: 1,
    search: ''
};

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        updateSearch: (state, action) => {
            state.page = 1;
            state.search = action.payload;
        },
        updatePage: (state, action) => {
            state.page = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllPosts.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(getAllPosts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.posts = action.payload.posts;
            state.totalPosts = action.payload.totalPosts;
            state.numberOfPages = action.payload.numberOfPages;
        }).addCase(getAllPosts.rejected, (state, action) => {
            state.isLoading = false;
            toast.error(action.payload);
        }).addCase(deleteSinglePost.fulfilled, (state, action) => {
            state.isLoading = false;
            toast.success('Deleted Post!');
        }).addCase(deleteSinglePost.rejected, (state, action) => {
            state.isLoading = false;
            toast.error(action.payload);
        }).addCase(getUserSpecificPosts.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(getUserSpecificPosts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.posts = action.payload.posts;
            state.totalPosts = action.payload.totalPosts;
            state.numberOfPages = action.payload.numberOfPages;
        }).addCase(getUserSpecificPosts.rejected, (state, action) => {
            state.isLoading = false;
            toast.error(action.payload);
        })
    }
});

export const {updateSearch, updatePage} = postsSlice.actions;

export default postsSlice.reducer;