import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localStorage';
import { Boat, BoatSchema } from '../types/boat';
import {fetchBoatList} from "../../services/fetchBoatList/fetchBoatList";

const initialState: BoatSchema = {};

export const boatSlice = createSlice({
    name: 'boat',
    initialState,
    reducers: {
        setBoatList: (state, action: PayloadAction<Boat[]>) => {
            state.boatList = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchBoatList.pending, state =>{
            state.isLoading = true
        })
        builder.addCase(fetchBoatList.fulfilled, (state, action) => {
            state.isLoading = false;
            state.boatList = action.payload
        })
    }
});

export const { actions: boatActions } = boatSlice;
export const { reducer: boatReducer } = boatSlice;