

import {createAsyncThunk} from "@reduxjs/toolkit";
import {User} from "../../model/types/user";
import {userActions} from "../../model/slice/userSlice";
import {ThunkConfig} from "../../../../app/providers/storeProvider/types/types";

export const fetchNotConfirmedUsers = createAsyncThunk<User[], void, ThunkConfig<string>>(
    'users/fetchNotConfirmedUsers',
    async (_, thunkAPI)=>{
        const {dispatch, extra} = thunkAPI
        const response = await extra.api.get('/users/notConfirmed');
        if(!response.data){
            throw new Error();
        }
        dispatch(userActions.setUsersList(response.data))
        return response.data
    }
)