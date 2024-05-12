import {RootState} from "app/providers/storeProvider";

export const getMainPageViewMode = (state: RootState) => state.mainPage.viewMode;
