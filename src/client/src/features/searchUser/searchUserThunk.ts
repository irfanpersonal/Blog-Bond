import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from 'axios';
import {type useSelectorType} from "../../store";

export const getAllUsers = createAsyncThunk('searchUser/getAllUsers', async(_, thunkAPI) => {
    try {   
        const {searchUser: {search, page}} = thunkAPI.getState() as useSelectorType;
        const response = await axios.get(`/api/v1/user?search=${search}&page=${page}`);
        const data = response.data;
        return data;
    }
    catch(error: any) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});