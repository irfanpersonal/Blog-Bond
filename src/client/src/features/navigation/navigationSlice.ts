import {createSlice} from "@reduxjs/toolkit";
import {getCurrentPageLocation} from "../../utils";
import {createBlog} from "../blog/blogThunk";
import {deleteSingleBlog, getSingleBlog} from "../singleBlog/singleBlogThunk";
import {getSingleUser} from "../singleUser/singleUserThunk";
import {deleteAccount, logoutUser} from "../user/userThunk";

interface INavigate {
    location: string
}

const initialState: INavigate = {
    location: getCurrentPageLocation()
};

const navigationSlice = createSlice({
    name: 'navigation',
    initialState,
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder.addCase(logoutUser.fulfilled, (state) => {
            state.location = state.location === '/landing' ? '/landing#' : '/landing';
        }).addCase(createBlog.fulfilled, (state) => {
            state.location = state.location === '/profile' ? '/profile#' : '/profile';
        }).addCase(deleteSingleBlog.fulfilled, (state) => {
            state.location = state.location === '/blog' ? '/blog#' : '/blog';
        }).addCase(getSingleBlog.rejected, (state) => {
            state.location = state.location === '/blog' ? '/blog#' : '/blog';
        }).addCase(getSingleUser.rejected, (state) => {
            state.location = state.location === '/user' ? '/user#' : '/user';
        }).addCase(deleteAccount.fulfilled, (state) => {
            state.location = state.location === '/landing' ? '/landing#' : '/landing';
        });
    }
});

export const {} = navigationSlice.actions;

export default navigationSlice.reducer;