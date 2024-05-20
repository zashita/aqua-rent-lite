import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localStorage';
import {MyInfo, User, UserSchema} from '../types/user';
import {jwtDecode} from "jwt-decode";

const initialState: UserSchema = {};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAuthData: (state, action: PayloadAction<string>) => {
            state.authData = action.payload;
            const decoded: MyInfo = jwtDecode(action.payload)
            state.myInfo = {
                id: decoded.id,
                roles: decoded.roles
            }
        },
        initAuthData: (state) => {
            const user = localStorage.getItem(USER_LOCALSTORAGE_KEY);
            if (user) {
                state.authData = JSON.parse(user);
                const decoded: any = jwtDecode(user)
                state.myInfo = {
                    id: decoded.id,
                    roles: decoded.roles
                }
            }
        },
        logout: (state) => {
            state.authData = undefined;
            localStorage.removeItem(USER_LOCALSTORAGE_KEY);
            state.myInfo = undefined
        },
        setUsersList: (state, action: PayloadAction<User[]>) => {
            state.usersList = action.payload
        },
        setCurrentProfile: (state, action: PayloadAction<User>)=>{
            state.currentProfile = action.payload;
        },
    },
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;