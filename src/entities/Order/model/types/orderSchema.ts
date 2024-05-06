export interface Order{
    id: string;
    date: string;
    state: string;
    userId: string;
    boatId: string;
}

export interface OrderSchema{
    ordersList?: Order[];
    isLoading?: boolean
}