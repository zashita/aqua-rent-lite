export {
    AdsPageAsync as MainPage
} from "./ui/Page/AdsPage.async"

export {
    adsPageActions,
    adsPageReducer
} from './model/slice/adsPageSlice'

export * from './model/types/adsPageTypes'

export {getAdsPageViewMode} from './model/selectors/getAdsPageViewMode/getAdsPageViewMode'
