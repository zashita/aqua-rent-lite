import React from 'react';
import {classNames} from "shared/lib/classNames/classNames";
import cls from './OrderList.module.scss'
import {Order} from "../../model/types/orderSchema";
import {OrderListItem} from "../OrderListItem/OrderListItem";
import {Simulate} from "react-dom/test-utils";
import submit = Simulate.submit;


export interface OrderListProps{
    className?: string;
    data: Order[];
    roles?: string[];
}
export const OrderList:React.FC<OrderListProps> = (props) => {
    const {
        className,
        data,
        roles
    } = props
    return (
        <div className={classNames(cls.OrderList, {}, [className])}>
            {data?.map((order)=>{
                return(
                    <OrderListItem
                    order={order}
                    roles={roles}
                    />
                )
            })}
        </div>
);
};