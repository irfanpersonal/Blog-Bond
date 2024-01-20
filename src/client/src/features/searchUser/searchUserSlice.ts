import {createSlice} from "@reduxjs/toolkit";
import {getAllUsers} from "./searchUserThunk";

export type UserType = {_id: string, name: string, email: string, profilePicture: string, bio: string, location: string, dateOfBirth: string, following: UserType[], followers: UserType[], createdAt: string};

interface ISearchUser {
    getAllUsersLoading: boolean,
    users: UserType[],
    page: number,
    search: string,
    totalUsers: number | null,
    totalNumberOfPagesForUsers: number | null
}

const initialState: ISearchUser = {
    getAllUsersLoading: true,
    users: [],
    page: 1,
    search: '',
    totalUsers: null,
    totalNumberOfPagesForUsers: null
};

const searchUser = createSlice({
    name: 'searchUser',
    initialState,
    reducers: {
        setSearch: (state, action) => {
            state.search = action.payload;
        },
        setPage: (state, action) => {
            state.page = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllUsers.pending, (state) => {
            state.getAllUsersLoading = true;
        }).addCase(getAllUsers.fulfilled, (state, action) => {
            state.getAllUsersLoading = false;
            state.users = action.payload.users;
            state.totalUsers = action.payload.totalUsers;
            state.totalNumberOfPagesForUsers = action.payload.numberOfPages;
        }).addCase(getAllUsers.rejected, (state) => {
            state.getAllUsersLoading = false;
        })
    }
});

export const {setSearch, setPage} = searchUser.actions;

export default searchUser.reducer;