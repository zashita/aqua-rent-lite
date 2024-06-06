import {createAsyncThunk} from "@reduxjs/toolkit";
import {ThunkConfig} from "app/providers/storeProvider/types/types";
import {userActions} from "../../model/slice/userSlice";
import {User} from "../../model/types/user";


export interface BoatId{
    id: string;
}

export const fetchMyStatus = createAsyncThunk<User, string, ThunkConfig<string>>(
    'users/fetchUserStatus',
    async (userId, thunkAPI)=>{
        const {dispatch, extra} = thunkAPI
        const response = await extra.api.get(`/users/${userId}`);
        if(!response.data){
            throw new Error();
        }
        dispatch(userActions.setWaiting(response.data.waitingForStatusConfirmation))
        return response.data
    }
)