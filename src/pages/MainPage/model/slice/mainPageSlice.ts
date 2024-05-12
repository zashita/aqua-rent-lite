import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {BoatListView} from "../../../../entities/Boat";
import {MainPageSchema} from "../types/mainPageTypes";

const initialState: MainPageSchema = {
    viewMode: BoatListView.BOX
};

export const mainPageSlice = createSlice({
    name: 'mainPage',
    initialState,
    reducers: {
        setBoatListView: (state, action: PayloadAction<BoatListView>) => {
            state.viewMode = action.payload;
        },
    },

});

export const { actions: mainPageActions } = mainPageSlice;
export const { reducer: mainPageReducer } = mainPageSlice;