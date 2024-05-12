import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localStorage';
import { Boat, BoatSchema } from '../types/boat';
import {fetchBoatList} from "../../services/fetchBoatList/fetchBoatList";
import {fetchBoatById} from "../../services/fetchBoatById/fetchBoatById"

const initialState: BoatSchema = {};

export const boatSlice = createSlice({
    name: 'boat',
    initialState,
    reducers: {
        setBoatList: (state, action: PayloadAction<Boat[]>) => {
            state.boatList = action.payload;
        },
        setCurrentBoat: (state, action: PayloadAction<Boat>) =>{
            state.currentBoat = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchBoatList.pending, state =>{
            state.isLoading = true
        })
        builder.addCase(fetchBoatList.fulfilled, (state, action) => {
            state.isLoading = false;
            state.boatList = action.payload
        })
        builder.addCase(fetchBoatById.pending, state => {
                state.isLoading = true
            }
        )
        builder.addCase(fetchBoatById.fulfilled, (state, action) =>{
            state.isLoading = false;
            state.currentBoat = action.payload
        })
    }
});

export const { actions: boatActions } = boatSlice;
export const { reducer: boatReducer } = boatSlice;