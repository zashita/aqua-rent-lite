import {createAsyncThunk} from "@reduxjs/toolkit";
import {ThunkConfig} from "../../../../app/providers/storeProvider/types/types";
import {User} from "../../model/types/user";
import {fetchUsersList} from "../fetchUsersList/fetchUsersList";


export interface BoatId{
    id: string;
}

export const deleteUserById = createAsyncThunk<User, string, ThunkConfig<string>>(
    'users/deleteUserById',
    async (userId, thunkAPI)=>{
        const {extra, dispatch} = thunkAPI
        const response = await extra.api.delete(`/users/${userId}`);
        if(!response.data){
            throw new Error();
        }
        dispatch(fetchUsersList())

        return response.data
    }
)