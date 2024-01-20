import {createSlice} from "@reduxjs/toolkit";
import {followUser, getSingleUser, getSingleUserBlogs, unfollowUser} from "./singleUserThunk";
import {type UserType, type BlogType} from '../user/userSlice';
import {toast} from 'react-toastify';

interface ISingleUser {
    singleUserLoading: boolean,
    singleUserBlogsLoading: boolean,
    followUserLoading: boolean,
    unfollowUserLoading: boolean,
    user: UserType | null,
    singleUserBlogs: BlogType[],
    page: number,
    search: string,
    totalBlogs: number | null,
    totalNumberOfPagesForBlogs: number | null
}

const initialState: ISingleUser = {
    singleUserLoading: true,
    singleUserBlogsLoading: true,
    followUserLoading: false,
    unfollowUserLoading: false,
    user: null,
    singleUserBlogs: [],
    page: 1,
    search: '',
    totalBlogs: null,
    totalNumberOfPagesForBlogs: null
};

const singleUser = createSlice({
    name: 'singleUser',
    initialState,
    reducers: {
        setPage: (state, action) => {
            state.page = action.payload;
        },
        setSearch: (state, action) => {
            state.search = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getSingleUser.pending, (state) => {
            state.singleUserLoading = true;
        }).addCase(getSingleUser.fulfilled, (state, action) => {
            state.singleUserLoading = false;
            state.user = action.payload;
        }).addCase(getSingleUser.rejected, (state) => {
            state.singleUserLoading = true;
        }).addCase(getSingleUserBlogs.pending, (state) => {
            state.singleUserBlogsLoading = true;
        }).addCase(getSingleUserBlogs.fulfilled, (state, action) => {
            state.singleUserBlogsLoading = false;
            state.singleUserBlogs = action.payload.blogs;
            state.totalBlogs = action.payload.totalBlogs;
            state.totalNumberOfPagesForBlogs = action.payload.numberOfPages;
        }).addCase(getSingleUserBlogs.rejected, (state) => {
            state.singleUserBlogsLoading = true;
        }).addCase(followUser.pending, (state) => {
            state.followUserLoading = true;
        }).addCase(followUser.fulfilled, (state, action) => {
            state.followUserLoading = false;
            state.user!.followers = action.payload.user.followers;
            state.user!.following = action.payload.user.following;
            // toast.success('Followed User!');
        }).addCase(followUser.rejected, (state, action) => {
            state.followUserLoading = false;
            toast.error(action.payload as string);
        }).addCase(unfollowUser.pending, (state) => {
            state.unfollowUserLoading = true;
        }).addCase(unfollowUser.fulfilled, (state, action) => {
            state.unfollowUserLoading = false;
            state.user!.followers = action.payload.user.followers;
            state.user!.following = action.payload.user.following;
            // toast.success('Unfollowed User!');
        }).addCase(unfollowUser.rejected, (state, action) => {
            state.unfollowUserLoading = false;
            toast.error(action.payload as string);
        })
    }
});

export const {setPage, setSearch} = singleUser.actions;

export default singleUser.reducer;