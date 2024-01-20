import {createSlice} from "@reduxjs/toolkit";
import {type BlogType} from '../user/userSlice';
import {getAllBlogs, getUserFeed} from "./blogsThunk";

interface IBlogs {
    blogsLoading: boolean,
    blogs: BlogType[],
    page: number,
    search: string, 
    totalBlogs: number | null,
    numberOfPages: number | null
}

const initialState: IBlogs = {
    blogsLoading: true,
    blogs: [],
    page: 1,
    search: '',
    totalBlogs: null,
    numberOfPages: null
};

const blogsSlice = createSlice({
    name: 'blogs',
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
        builder.addCase(getAllBlogs.pending, (state) => {
            state.blogsLoading = true;
        }).addCase(getAllBlogs.fulfilled, (state, action) => {
            state.blogsLoading = false;
            state.blogs = action.payload.blogs;
            state.totalBlogs = action.payload.totalBlogs;
            state.numberOfPages = action.payload.numberOfPages;
        }).addCase(getAllBlogs.rejected, (state) => {
            state.blogsLoading = false;
        }).addCase(getUserFeed.pending, (state) => {
            state.blogsLoading = true;
        }).addCase(getUserFeed.fulfilled, (state, action) => {
            state.blogsLoading = false;
            state.blogs = action.payload.blogs;
            state.totalBlogs = action.payload.totalBlogs;
            state.numberOfPages = action.payload.numberOfPages;
        }).addCase(getUserFeed.rejected, (state) => {
            state.blogsLoading = false;
        });
    }
});

export const {setPage, setSearch} = blogsSlice.actions;

export default blogsSlice.reducer;