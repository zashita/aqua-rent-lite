export interface Boat{
    id: string;
    name: string;
    type?: BoatTypes;
    userId: string;
    description: string;
    image: string;
    views?: string;
    createdAt: string;
    updatedAt: string;
}

export enum BoatTypes{
    YACHT = 'yacht',
    BOAT = 'boat',
    KATAMARAN = 'katamaran',
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