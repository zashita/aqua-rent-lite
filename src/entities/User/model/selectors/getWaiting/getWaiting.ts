import {RootState} from "app/providers/storeProvider";

export const getWaiting = (state: RootState) => state.user.waiting;