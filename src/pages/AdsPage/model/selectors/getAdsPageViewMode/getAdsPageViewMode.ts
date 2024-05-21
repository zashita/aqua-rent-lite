import {RootState} from "app/providers/storeProvider";

export const getAdsPageViewMode = (state: RootState) => state.adsPage.viewMode;
