import {createAsyncThunk} from "@reduxjs/toolkit";
import {ThunkConfig} from "app/providers/storeProvider/types/types";
import {User} from "../../model/types/user";

export const setStatusWaiting = createAsyncThunk<User, string, ThunkConfig<string>>(
    'user/setStatusWaiting',
    async (id, thunkAPI)=>{
        const {dispatch, extra} = thunkAPI
        const response = await extra.api.put(`/users/setStatusWaiting/${id}`);
        if(!response.data){
            throw new Error();
        }
        return response.data
    }
)