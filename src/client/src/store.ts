import {configureStore} from "@reduxjs/toolkit";
import userReducer from './features/user/userSlice';
import navigationReducer from './features/navigation/navigationSlice';
import blogReducer from './features/blog/blogSlice';
import singleBlogReducer from './features/singleBlog/singleBlog';
import searchUserReducer from './features/searchUser/searchUserSlice';
import singleUserReuder from './features/singleUser/singleUserSlice';
import blogsReducer from './features/blogs/blogsSlice';

const store = configureStore({
    reducer: {
        navigation: navigationReducer,
        user: userReducer,
        blog: blogReducer,
        singleBlog: singleBlogReducer,
        searchUser: searchUserReducer,
        singleUser: singleUserReuder,
        blogs: blogsReducer
    }
});

// useDispatchType 
export type useDispatchType = typeof store.dispatch;

// useSelectorType
export type useSelectorType = ReturnType<typeof store.getState>

export default store;