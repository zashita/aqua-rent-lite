import {createAsyncThunk} from "@reduxjs/toolkit";
import {Boat} from "../../model/types/boat";

import {boatActions} from "../../model/slice/boatSlice";
import {ThunkConfig} from "app/providers/storeProvider/types/types";

export const fetchBoatList = createAsyncThunk<Boat[], void, ThunkConfig<string>>(
    'boats/fetchBoatList',
    async (_, thunkAPI)=>{
        const {dispatch, extra} = thunkAPI
        const response = await extra.api.get('/boats');
        if(!response.data){
            throw new Error();
        }
        dispatch(boatActions.setBoatList(response.data))
        return response.data
    }
)