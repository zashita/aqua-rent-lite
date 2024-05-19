import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {Lake, LakeSchema} from "../types/lake";

const initialState: LakeSchema = {
    isLoading: false
};

export const lakeSlice = createSlice({
    name: 'lake',
    initialState,
    reducers: {
        setLakeList: (state, action: PayloadAction<Lake[]>) => {
            state.lakesList = action.payload;
        },
    },
    // extraReducers: (builder) => {
    //     builder.addCase(fetchBoatList.pending, state =>{
    //         state.isLoading = true
    //     })
    //     builder.addCase(fetchBoatList.fulfilled, (state, action) => {
    //         state.isLoading = false;
    //         state.ordersList = action.payload
    //     })
    // }
});

export const { actions: lakeActions } = lakeSlice;
export const { reducer: lakeReducer } = lakeSlice;