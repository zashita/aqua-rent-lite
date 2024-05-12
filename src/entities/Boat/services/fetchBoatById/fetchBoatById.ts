import {createAsyncThunk} from "@reduxjs/toolkit";
import {Boat} from "../../model/types/boat";
import axios from "axios";
import {$api} from "../../../../shared/api/api";
import {boatActions} from "../../model/slice/boatSlice";
import {ThunkConfig} from "../../../../app/providers/storeProvider/types/types";


export interface BoatId{
    id: string;
}

export const fetchBoatById = createAsyncThunk<Boat, string, ThunkConfig<string>>(
    'boats/fetchBoatById',
    async (boatId, thunkAPI)=>{
        const {dispatch, extra} = thunkAPI
        const response = await extra.api.get(`/boats/${boatId}`);
        if(!response.data){
            throw new Error();
        }
        dispatch(boatActions.setCurrentBoat(response.data))
        return response.data
    }
)