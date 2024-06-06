import {Review} from "../../../Review/model/types/review";
import {User} from "../../../User";
import {Order} from "../../../Order";

export interface Boat{
    id: string;
    name: string;
    type?: BoatTypes;
    userId: string;
    description: string;
    image: string;
    views?: string;
    price: number;
    lakeName: string;
    passengerCapacity: number;
    moveType: MoveType;
    captain: boolean;
    createdAt: string;
    updatedAt: string;
    userEmail: string;
    reviews?: Review[];
    confirmed?: boolean;
    owner?: User;
    orders?: Order[];
}

export enum MoveType{
    WIND = 'Парус',
    ENGINE = 'Двигатель',
    HAND = 'Мышечная сила',
}

export enum BoatTypes{
    YACHT = 'Яхта',
    BOAT = 'Катер',
    KATAMARAN = 'Катамаран',
    HYDROCYCLE= 'Гидроцикл'
}

export interface BoatSchema{
    boatList?: Boat[];
    currentBoat?: Boat;
    isLoading?: boolean;
}

export enum BoatListView{
    BOX= 'box',
    LIST = 'list'
}