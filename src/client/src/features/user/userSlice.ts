import {createSlice} from "@reduxjs/toolkit";
import {registerUser, loginUser, showCurrentUser, logoutUser, getProfileData, updateUser, getProfileBlogs, deleteAccount} from "./userThunk";
import {toast} from 'react-toastify';

export type UserType = {_id: string, name: string, email: string, profilePicture: string, bio: string, location: string, dateOfBirth: string, followers: UserType[], following: UserType[], createdAt: string};

export type BlogType = {_id: string, name: string, content: string, coverImage: string, user: UserType, createdAt: string};

interface IUser {
    globalLoading: boolean,
    authLoading: boolean,
    logoutLoading: boolean,
    profileDataLoading: boolean,
    editUserLoading: boolean,
    getProfileBlogsLoading: boolean,
    deleteAccountLoading: boolean,
    wantsToRegister: boolean,
    user: {userID: string, name: string, email: string} | null,
    search: string,
    page: number,
    profileData: UserType | null,
    profileBlogs: BlogType[],
    profileTotalBlogs: number | null,
    profileTotalNumberOfPagesForBlogs: number | null
}

const initialState: IUser = {
    globalLoading: true,
    authLoading: false,
    logoutLoading: false,
    profileDataLoading: true,
    editUserLoading: false,
    getProfileBlogsLoading: false,
    deleteAccountLoading: false,
    wantsToRegister: true,
    user: null,
    search: '',
    page: 1,
    profileData: null,
    profileBlogs: [],
    profileTotalBlogs: null,
    profileTotalNumberOfPagesForBlogs: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        toggleWantsToRegister: (state) => {
            state.wantsToRegister = !state.wantsToRegister;
        },
        setProfilePage: (state, action) => {
            state.page = action.payload;
        },
        setSearch: (state, action) => {
            state.search = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(registerUser.pending, (state) => {
            state.authLoading = true;
        }).addCase(registerUser.fulfilled, (state, action) => {
            state.authLoading = false;
            state.user = action.payload;
            toast.success('Successfully Created User!');
        }).addCase(registerUser.rejected, (state, action) => {
            state.authLoading = false;
            toast.error(action.payload as string);
        }).addCase(loginUser.pending, (state) => {
            state.authLoading = true;
        }).addCase(loginUser.fulfilled, (state, action) => {
            state.authLoading = false;
            state.user = action.payload;
            toast.success('Successfully Logged In!');
        }).addCase(loginUser.rejected, (state, action) => {
            state.authLoading = false;
            toast.error(action.payload as string);
        }).addCase(showCurrentUser.pending, (state) => {
            state.globalLoading = true;
        }).addCase(showCurrentUser.fulfilled, (state, action) => {
            state.globalLoading = false;
            state.user = action.payload;
        }).addCase(showCurrentUser.rejected, (state) => {
            state.globalLoading = false;
        }).addCase(logoutUser.pending, (state) => {
            state.logoutLoading = true;
        }).addCase(logoutUser.fulfilled, (state, action) => {
            state.logoutLoading = false;
            state.user = null;
        }).addCase(logoutUser.rejected, (state) => {
            state.logoutLoading = false;
        }).addCase(getProfileData.pending, (state) => {
            state.profileDataLoading = true;
        }).addCase(getProfileData.fulfilled, (state, action) => {
            state.profileDataLoading = false;
            state.profileData = action.payload;
        }).addCase(getProfileData.rejected, (state) => {
            state.profileDataLoading = false;
        }).addCase(updateUser.pending, (state) => {
            state.editUserLoading = true;
        }).addCase(updateUser.fulfilled, (state, action) => {
            state.editUserLoading = false;
            state.profileData = action.payload;
            toast.success('Edited User!');
        }).addCase(updateUser.rejected, (state, action) => {
            state.editUserLoading = false;
            toast.error(action.payload as string);
        }).addCase(getProfileBlogs.pending, (state) => {
            state.getProfileBlogsLoading = true;
        }).addCase(getProfileBlogs.fulfilled, (state, action) => {
            state.getProfileBlogsLoading = false;
            state.profileBlogs = action.payload.blogs;
            state.profileTotalBlogs = action.payload.totalBlogs;
            state.profileTotalNumberOfPagesForBlogs = action.payload.numberOfPages;
        }).addCase(getProfileBlogs.rejected, (state) => {
            state.getProfileBlogsLoading = false;
        }).addCase(deleteAccount.pending, (state) => {
            state.deleteAccountLoading = true;
        }).addCase(deleteAccount.fulfilled, (state) => {
            state.deleteAccountLoading = false;
            toast.success('Successfully Deleted Account!');
        }).addCase(deleteAccount.rejected, (state, action) => {
            state.deleteAccountLoading = false;
            toast.error(action.payload as string);
        });
    }
});

export const {toggleWantsToRegister, setProfilePage, setSearch} = userSlice.actions;

export default userSlice.reducer;