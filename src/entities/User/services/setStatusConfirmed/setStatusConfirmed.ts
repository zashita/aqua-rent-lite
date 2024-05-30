import {createAsyncThunk} from "@reduxjs/toolkit";
import {ThunkConfig} from "app/providers/storeProvider/types/types";
import {User} from "../../model/types/user";

export const setStatusConfirmed = createAsyncThunk<User, string, ThunkConfig<string>>(
    'user/setStatusConfirmed',
    async (id, thunkAPI)=>{
        const {dispatch, extra} = thunkAPI
        const response = await extra.api.put(`/users/setStatusWaitingFalse/${id}`);
        if(!response.data){
            throw new Error();
        }
        return response.data
    }
)