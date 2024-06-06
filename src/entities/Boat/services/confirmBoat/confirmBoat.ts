import {createAsyncThunk} from "@reduxjs/toolkit";
import {Boat} from "../../model/types/boat";

import {ThunkConfig} from "app/providers/storeProvider/types/types";
import {fetchAdminBoatList} from "../fetchAdminBoatList/fetchAdminBoatList";



export const confirmBoat = createAsyncThunk<Boat, string, ThunkConfig<string>>(
    'boats/confirmBoat',
    async (boatId, thunkAPI)=>{
        const { extra, dispatch} = thunkAPI
        const response = await extra.api.put(`/boats/confirm/${boatId}`);
        if(!response.data){
            throw new Error();
        }
        dispatch(fetchAdminBoatList())

        return response.data
    }
)