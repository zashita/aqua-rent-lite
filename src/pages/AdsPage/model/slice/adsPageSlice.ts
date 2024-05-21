import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {BoatListView} from "../../../../entities/Boat";
import {AdsPageSchema} from "../types/adsPageTypes";

const initialState: AdsPageSchema = {
    viewMode: BoatListView.BOX
};

export const adsPageSlice = createSlice({
    name: 'adsPage',
    initialState,
    reducers: {
        setBoatListView: (state, action: PayloadAction<BoatListView>) => {
            state.viewMode = action.payload;
        },
    },

});

export const { actions: adsPageActions } = adsPageSlice;
export const { reducer: adsPageReducer } = adsPageSlice;