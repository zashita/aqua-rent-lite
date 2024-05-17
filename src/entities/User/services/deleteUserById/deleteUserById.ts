import {createAsyncThunk} from "@reduxjs/toolkit";
import {ThunkConfig} from "../../../../app/providers/storeProvider/types/types";
import {User} from "../../model/types/user";


export interface BoatId{
    id: string;
}

export const deleteUserById = createAsyncThunk<User, string, ThunkConfig<string>>(
    'users/deleteUserById',
    async (userId, thunkAPI)=>{
        const {extra} = thunkAPI
        const response = await extra.api.delete(`/users/${userId}`);
        if(!response.data){
            throw new Error();
        }
        return response.data
    }
)