import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {BoatTypes, MoveType} from "../../../../entities/Boat";

export interface BoatCreationState {
    isLoading: boolean,
    name: string,
    userId: string,
    type: BoatTypes,
    description: string,
    image: File,
    price: number;
    lakeId: string;
    passengerCapacity: number;
    moveType: string;
    captain: boolean;
}

const initialState: BoatCreationState = {
    isLoading: false,
    name: '',
    userId: '',
    type: null,
    description: '',
    image: null,
    price: null,
    lakeId: '',
    passengerCapacity: null,
    moveType: null,
    captain: false,
}

export const createBoatSlice = createSlice({
        name: 'createBoat',
        initialState,
        reducers: {
            setUserId: (state, action: PayloadAction<string>) => {
                state.userId = action.payload;
            },
            setName: (state, action: PayloadAction<string>) => {
                state.name = action.payload;
            },
            setDescription: (state, action: PayloadAction<string>) => {
                state.description = action.payload;
            },
            setImage: (state, action: PayloadAction<File>) =>{
                state.image = action.payload
                console.log(action.payload)
            },
            setPrice: (state, action: PayloadAction<number>) =>{
                state.price = action.payload
            },
            setLakeId: (state, action: PayloadAction<string>) =>{
                state.lakeId = action.payload
            },
            setPassengerCapacity: (state, action: PayloadAction<number>) =>{
                state.passengerCapacity = action.payload
            },
            setMoveType: (state, action: PayloadAction<MoveType>) =>{
                state.moveType = action.payload;
            },
            setCaptain: (state, action: PayloadAction<boolean>) =>{
                state.captain = action.payload
            },
            setType: (state, action: PayloadAction<BoatTypes>) =>{
                state.type = action.payload
            }


        },
        // extraReducers: (builder) => {
        //     builder
        //         .addCase(loginByEmail.pending, (state) => {
        //             state.error = undefined;
        //             state.isLoading = true;
        //         })
        //         .addCase(loginByEmail.fulfilled, (state) => {
        //             state.isLoading = false;
        //         })
        //         .addCase(loginByEmail.rejected, (state, action) => {
        //             state.isLoading = false;
        //         });
        // },
    }
)

// Action creators are generated for each case reducer function
export const {actions: createBoatActions} = createBoatSlice

export const {reducer: createBoatReducer} = createBoatSlice