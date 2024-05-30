import {createAsyncThunk} from "@reduxjs/toolkit";
import {Boat} from "../../model/types/boat";
import axios from "axios";
import {$api} from "../../../../shared/api/api";
import {boatActions} from "../../model/slice/boatSlice";
import {ThunkConfig} from "../../../../app/providers/storeProvider/types/types";


export interface BoatId{
    id: string;
}

export const confirmBoat = createAsyncThunk<Boat, string, ThunkConfig<string>>(
    'boats/confirmBoat',
    async (boatId, thunkAPI)=>{
        const { extra} = thunkAPI
        const response = await extra.api.put(`/boats/confirm/${boatId}`);
        if(!response.data){
            throw new Error();
        }
        return response.data
    }
)