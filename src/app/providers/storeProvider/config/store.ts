import { configureStore } from '@reduxjs/toolkit'
import {userReducer} from "entities/User";
import {loginReducer} from "features/authByEmail";
import {boatReducer} from "entities/Boat";
import {ThunkExtraArg} from "../types/types";
import {$api} from "shared/api/api";
import {mainPageReducer} from "pages/MainPage";
import {createOrderReducer} from "features/createNewOrder";
import {createBoatReducer} from "features/registrateNewBoat";
import {lakeReducer} from "entities/Lake";

const extraArg: ThunkExtraArg = {
    api: $api
}

export const store = configureStore({
    reducer: {
        user: userReducer,
        loginForm: loginReducer,
        boats: boatReducer,
        mainPage: mainPageReducer,
        createOrder: createOrderReducer,
        createBoat: createBoatReducer,
        lakes: lakeReducer,
    },
    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware({
            thunk:{
                extraArgument: extraArg
            }
        })



})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
