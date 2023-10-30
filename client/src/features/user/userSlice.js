import {createSlice} from '@reduxjs/toolkit';
import {addUserToLocalStorage, getUserFromLocalStorage, removeUserFromLocalStorage} from '../../utils';
import {toast} from 'react-toastify';
import {registerUser, loginUser, updateUser} from './userThunk.js';

const initialState = {
    isLoading: false,
    user: getUserFromLocalStorage()
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state, action) => {
            state.user = null;
            removeUserFromLocalStorage();
            toast.success('Logged Out!');
        }
    },
    extraReducers: (builder) => {
        builder.addCase(registerUser.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(registerUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload;
            addUserToLocalStorage(action.payload);
            toast.success('Successfully Created Account!');
        }).addCase(registerUser.rejected, (state, action) => {
            state.isLoading = false;
            toast.error(action.payload);
        }).addCase(loginUser.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(loginUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload;
            addUserToLocalStorage(action.payload);
            toast.success('Successfully Logged In!');
        }).addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false;
            toast.error(action.payload);
        }).addCase(updateUser.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(updateUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload;
            addUserToLocalStorage(action.payload);
            toast.success('Updated Profile!');
        }).addCase(updateUser.rejected, (state, action) => {
            state.isLoading = false;
            toast.error(action.payload);
        });
    }
});

export const {logout} = userSlice.actions;

export default userSlice.reducer;