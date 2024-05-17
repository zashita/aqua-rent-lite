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
        const formData = new FormData();
        formData.append('name', boat.name);
        formData.append('userId', boat.userId);
        formData.append('description', boat.description);
        formData.append('image', boat.image);
        const {dispatch, extra} = thunkAPI
        const response = await extra.api.post( '/boats', formData)
        console.log(boat)
        if(!response.data){
            throw new Error()
        }
        return response.data;
    }
)