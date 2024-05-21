import {Boat, BoatListView, BoatTypes, MoveType} from "../../../../entities/Boat";

export interface MainPageSchema{
    query?: string;
    boatList?: Boat[];
    type?: BoatTypes,
    moveType?: MoveType
    captain?: boolean;
    lakeName?: string

}

export interface QueryItem{
    id: number;
    value: any;
}