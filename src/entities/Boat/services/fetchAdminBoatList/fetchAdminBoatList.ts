import {createAsyncThunk} from "@reduxjs/toolkit";
import {Boat} from "../../model/types/boat";

import {boatActions} from "../../model/slice/boatSlice";
import {ThunkConfig} from "app/providers/storeProvider/types/types";

export const fetchAdminBoatList = createAsyncThunk<Boat[], void, ThunkConfig<string>>(
    'boats/fetchAdminBoatList',
    async (_, thunkAPI)=>{
        const {dispatch, extra} = thunkAPI
        const response = await extra.api.get('/boats/admin');
        if(!response.data){
            throw new Error();
        }
        dispatch(boatActions.setBoatList(response.data))
        return response.data
    }
)