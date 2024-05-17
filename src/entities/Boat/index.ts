import {findByRole} from "@testing-library/react";

export
    *
    from "./model/types/boat";


export {
    BoatList
} from "./ui/BoatList/BoatList"


export {
    boatSlice,
    boatActions,
    boatReducer
} from './model/slice/boatSlice'

export {
    fetchBoatList,
} from './services/fetchBoatList/fetchBoatList'

export {
    fetchBoatById
} from './services/fetchBoatById/fetchBoatById'

export {
    deleteBoatById
} from './services/deleteBoatById/deleteBoatById'

export {
    getBoatState
} from './model/selectors/getBoatState/getBoatState'