import {RootState} from "app/providers/storeProvider";

export const getBoatList = (state: RootState) => state.boats.boatList;