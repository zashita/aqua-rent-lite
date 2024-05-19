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
    type: string
    userId: string;
    description: string
    image: File;
    price: number;
    lakeId: string;
    passengerCapacity: number;
    moveType: string;
    captain: boolean;
}
// price: number;
// lakeName: string;
// passengerCapacity: number;
// moveType: string;
// captain: boolean;
export const createBoat = createAsyncThunk<Boat, CreateBoat, ThunkConfig<string>>(
    'create/createBoat',
    async (boat, thunkAPI)=>{
        const captainString = boat.captain? 'true' : '';
        const formData = new FormData();
        formData.append('name', boat.name);
        formData.append('type', boat.type)
        formData.append('userId', boat.userId);
        formData.append('description', boat.description);
        formData.append('image', boat.image);
        formData.append('price', boat.price.toString());
        formData.append('lakeId', boat.lakeId);
        formData.append('passengerCapacity', boat.passengerCapacity.toString());
        formData.append('moveType', boat.moveType);
        formData.append('captain', captainString)


        const {dispatch, extra} = thunkAPI
        const response = await extra.api.post( '/boats', formData)
        console.log(boat)
        if(!response.data){
            throw new Error()
        }
        return response.data;
    }
)