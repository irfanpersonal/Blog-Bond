import {configureStore} from '@reduxjs/toolkit';
import userReducer from './features/user/userSlice.js';
import postsReducer from './features/posts/postsSlice.js';
import addPostReducer from './features/addPost/addPostSlice.js';

const store = configureStore({
    reducer: {
        user: userReducer,
        posts: postsReducer,
        addPost: addPostReducer
    }
});

export default store;