export interface Lake{
    id: string;
    name: string
}

export interface LakeSchema{
    lakesList?: Lake[];
    isLoading: boolean
}