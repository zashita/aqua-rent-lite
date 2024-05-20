import React, {useCallback} from 'react';
import {classNames} from "shared/lib/classNames/classNames";
import cls from './OrderListItem.module.scss'
import {Order, OrderStates} from "../../model/types/orderSchema";
import {Button, Link, Typography} from "@mui/material";
import {Card} from "../../../../shared/ui/Card/Card";
import ProfileImage from 'shared/assets/images/user/User-avatar.png'
import {useNavigate} from "react-router-dom";
import {RoutePath} from "../../../../shared/config/routeConfig/routeConfig";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../../../../app/providers/storeProvider";
import {updateOrderState} from "../../services/updateOrderState/updateOrderState";
import {fetchUserBoatsOrders} from "../../../../pages/OrdersPage/services/fetchUserBoatsOrders/fetchUserBoatsOrders";
import {getMyInfo} from "../../../User";


export interface OrderListItemProps{
    className?: string;
    order: Order;
    roles?: string[]
}
export const OrderListItem:React.FC<OrderListItemProps> = (props) => {
    const {
        order,
        roles,
        className
    } = props
    const navigate = useNavigate()
    const navigateToUser = useCallback(()=>{
        navigate(RoutePath.profile+ order.userId)
    }, [navigate, order.userId])

    const {id} = useSelector(getMyInfo)
    
    const dispatch = useDispatch<AppDispatch>()
    
    const onUpdateOrderState = useCallback(()=>{
        dispatch(fetchUserBoatsOrders(id))
        dispatch(updateOrderState(order.id))
    },[dispatch, order.id])

    const seller = !!roles?.find((role) => role === 'SELLER')


    const navigateToBoat = useCallback(()=>{
        navigate(RoutePath.boat_page+ order.boatId)
    }, [navigate, order.boatId])
    return (
        <div className={classNames(cls.OrderListItem, {}, [className])}>
            <div className={cls.TitleAndContent}>
                <div className={cls.DateAndUser}>
                    <Typography variant='h5'>
                        Сделка от {order.date}
                    </Typography>
                    <Card onClick={navigateToUser}>
                        <img src={ProfileImage} className={cls.ProfileImage}/>
                        <Typography>
                            {order.userEmail}
                        </Typography>
                    </Card>
                    <Link onClick={navigateToBoat}>
                        Посмотреть объявление
                    </Link>
                </div>

                <div className={cls.SpecList}>
                    <div className={cls.Parameter}>
                        <Typography>
                            Статус сделки
                        </Typography>
                        <div className={cls.ParamLine}/>
                        <Typography>
                            {order?.state}
                        </Typography>
                    </div>
                </div>

                {seller?
                    <Button
                        disabled={order.state === OrderStates.FINISHED}
                        onClick={onUpdateOrderState}
                    >
                        {
                            order.state === OrderStates.WAITING
                            ?
                                "Подтвердить сделку"
                                :
                                'Завершить сделку'
                        }
                    </Button>
                    :
                    null
                }

            </div>
        </div>
    );
};