export interface Order{
    id: string;
    date: string;
    state: OrderStates;
    userId: string;
    boatId: string;
    userEmail: string;
}

export interface OrderSchema{
    ordersList?: Order[];
    isLoading?: boolean
}

export enum OrderStates{
    WAITING = "Заказ ожидает подверждения арендодателя",
    CONFIRMED = 'Заказ подтвержден арендодателем',
    FINISHED = 'Заказ завершен, вы можете оставить отзыв'
}