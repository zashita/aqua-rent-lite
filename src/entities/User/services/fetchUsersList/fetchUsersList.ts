import {createAsyncThunk} from "@reduxjs/toolkit";
import {User} from "../../model/types/user";
import axios from "axios";
import {$api} from "../../../../shared/api/api";
import {userActions} from "../../model/slice/userSlice";
import {ThunkConfig} from "../../../../app/providers/storeProvider/types/types";

export const fetchUsersList = createAsyncThunk<User[], void, ThunkConfig<string>>(
    'users/fetchUsersList',
    async (_, thunkAPI)=>{
        const {dispatch, extra} = thunkAPI
        const response = await extra.api.get('/users');
        if(!response.data){
            throw new Error();
        }
        dispatch(userActions.setUsersList(response.data))
        return response.data
    }
)