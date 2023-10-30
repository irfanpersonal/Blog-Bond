import {createSlice} from '@reduxjs/toolkit';
import {createPost, updateSinglePost} from './addPostThunk.js';
import {toast} from 'react-toastify';

const initialState = {
    isLoading: false,
    editPostValues: {
        name: '',
        content: '',
        coverImage: '',
        _id: ''
    },
    isEditing: false
};

const addPostSlice = createSlice({
    name: 'addPost',
    initialState,
    reducers: {
        isEditingTrue: (state, action) => {
            state.isEditing = true;
        },
        isEditingFalse: (state, action) => {
            state.isEditing = false;
        },
        setEditPostValues: (state, action) => {
            state.editPostValues = action.payload;
        },
        onChangeEditPostValues: (state, action) => {
            state.editPostValues[action.payload.name] = action.payload.value;
        },
        resetEditPostValues: (state, action) => {
            state.editPostValues = {
                name: '',
                content: '',
                coverImage: '',
                _id: ''
            };
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createPost.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(createPost.fulfilled, (state, action) => {
            state.isLoading = false;
            toast.success('Created Post!');
        }).addCase(createPost.rejected, (state, action) => {
            state.isLoading = false;
            toast.error(action.payload);
        }).addCase(updateSinglePost.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(updateSinglePost.fulfilled, (state, action) => {
            state.isLoading = false;
            toast.success('Edited Post!');
        }).addCase(updateSinglePost.rejected, (state, action) => {
            state.isLoading = false;
            toast.error(action.payload);
        })
    }
});

export const {isEditingTrue, isEditingFalse, setEditPostValues, onChangeEditPostValues, resetEditPostValues} = addPostSlice.actions;

export default addPostSlice.reducer;