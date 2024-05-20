import {createAsyncThunk} from "@reduxjs/toolkit";
import {User, userActions} from "entities/User";
import axios from "axios";
import {$api} from "shared/api/api";
import {AppDispatch} from "app/providers/storeProvider/config/store";
import {USER_LOCALSTORAGE_KEY} from "shared/const/localStorage";
import {ThunkConfig} from "../../../../app/providers/storeProvider/types/types";

export interface LoginByEmail{
    email: string;
    password: string;
}
export const loginByEmail = createAsyncThunk<string, LoginByEmail, ThunkConfig<string>>(
    'login/loginByEmail',
    async (user, thunkAPI)=>{
        const {dispatch, extra} = thunkAPI
        const response = await extra.api.post( '/auth/login', user)
        if(!response.data){
            throw new Error()
        }
        dispatch(userActions.setAuthData(response.data.token))

        localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data.token));

        return response.data.token;
    }
)