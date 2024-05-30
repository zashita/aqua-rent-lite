import React, {useMemo} from 'react';
import {classNames} from "shared/lib/classNames/classNames";
import cls from './OrdersPage.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "app/providers/storeProvider";
import {orderPageActions} from "../model/slice/ordersPageSlice";
import {getUserBoatsOrders} from "../model/selectors/getUserBoatsOrders/getUserBoatsOrders";
import { OrderList } from 'entities/Order';
import {getMyRoles} from "shared/lib/getMyRoles/getMyRoles";
import {fetchUserBoatsOrders} from "../services/fetchUserBoatsOrders/fetchUserBoatsOrders";
import {useParams} from "react-router-dom";
import {getMyInfo} from "../../../entities/User";


export interface OrdersPageProps{
    className?: string;
}
const OrdersPage:React.FC<OrdersPageProps> = ({className}) => {
    const {id} = useParams()
    const dispatch = useDispatch<AppDispatch>()
    const {
        ordersList
    } = useSelector(getUserBoatsOrders)
    useMemo(()=>{
        dispatch(fetchUserBoatsOrders(id))
    }, [dispatch, id])

    const myInfo = useSelector(getMyInfo)
    const roles = myInfo?.roles
    return (
        <div className={classNames(cls.OrdersPage, {}, [className])}>
            <OrderList data={ordersList} roles={roles}/>
        </div>
);
};

export default OrdersPage