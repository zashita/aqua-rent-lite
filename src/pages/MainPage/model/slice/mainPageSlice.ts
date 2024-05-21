import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Boat, BoatListView, BoatTypes, MoveType} from "../../../../entities/Boat";
import {MainPageSchema} from "../types/mainPageTypes";

const initialState: MainPageSchema = {
    query: '',
    captain: false,
};

export const mainPageSlice = createSlice({
    name: 'mainPage',
    initialState,
    reducers: {
        setQuery: (state, action: PayloadAction<string>) => {
            state.query = action.payload;
        },
        setBoatList: (state, action: PayloadAction<Boat[]>) => {
            state.boatList = action.payload
        },

        setMoveType: (state, action: PayloadAction<MoveType>) =>{
            state.moveType = action.payload
        },
        setLakeName: (state, action: PayloadAction<string>) =>{
            state.lakeName = action.payload
        },


        setCaptain: (state, action: PayloadAction<boolean>) =>{
            state.captain = action.payload
        },
        setType: (state, action: PayloadAction<BoatTypes>) =>{
            state.type = action.payload
        }
    },

});

export const { actions: mainPageActions } = mainPageSlice;
export const { reducer: mainPageReducer } = mainPageSlice;