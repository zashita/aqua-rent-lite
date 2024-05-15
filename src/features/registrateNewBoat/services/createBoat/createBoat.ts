import {createAsyncThunk} from "@reduxjs/toolkit";
import {User, userActions} from "entities/User";
import axios from "axios";
import {$api} from "shared/api/api";
import {AppDispatch} from "app/providers/storeProvider/config/store";
import {USER_LOCALSTORAGE_KEY} from "shared/const/localStorage";
import {ThunkConfig} from "../../../../app/providers/storeProvider/types/types";
import {Boat} from "../../../../entities/Boat";

export interface CreateBoat{
    name: string
    userId: string;
    description: string
    image: File;
}
export const createBoat = createAsyncThunk<Boat, CreateBoat, ThunkConfig<string>>(
    'create/createBoat',
    async (boat, thunkAPI)=>{
        const {dispatch, extra} = thunkAPI
        const response = await extra.api.post( '/boats', boat)
        if(!response.data){
            throw new Error()
        }
        return response.data;
    }
)