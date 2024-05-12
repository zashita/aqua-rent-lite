export {
    MainPageAsync as MainPage
} from "./ui/Page/MainPage.async"

export {
    mainPageActions,
    mainPageReducer
} from './model/slice/mainPageSlice'

export * from './model/types/mainPageTypes'

export {getMainPageViewMode} from './model/selectors/getMainPageViewMode/getMainPageViewMode'
