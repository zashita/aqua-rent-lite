import {Button, Input, TextField} from '@mui/material';
import React, {useCallback} from 'react';
import {classNames} from "shared/lib/classNames/classNames";
import cls from './CreateOrderForm.module.scss'
import {createOrder} from "../../services/createOrder/createOrder";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "app/providers/storeProvider";
import {getOrderCreationData} from "../../model/selectors/getOrderCreationData/getOrderCreationData";
import {getBoatState} from "../../../../entities/Boat";
import {jwtDecode, JwtPayload} from "jwt-decode";
import {USER_LOCALSTORAGE_KEY} from "../../../../shared/const/localStorage";
import {createOrderActions} from "../../model/slice/createOrderSlice";


export interface CreateOrderFormProps{
    className?: string;
}
export const CreateOrderForm:React.FC<CreateOrderFormProps> = ({className}) => {

    const dispatch = useDispatch<AppDispatch>();
    const {
        date,
        isLoading,
        error,
    } = useSelector(getOrderCreationData);

    const {currentBoat} = useSelector(getBoatState)
    const boatId = currentBoat.id;
    const jwtToken = localStorage.getItem(USER_LOCALSTORAGE_KEY);
    const decoded = jwtDecode(jwtToken)

    // @ts-ignore
    const userId = decoded.id

    const onChangeDate = useCallback((value: string) => {
        dispatch(createOrderActions.setDate(value));
    }, [dispatch]);


     const onSubmitClick = useCallback( () => {
         dispatch(createOrder({userId, boatId, date}));
    }, [dispatch, boatId, date]);

    return (
        <div className={classNames(cls.LoginForm, {}, [className])}>
            {error && (
                <div>
                    {' '}
                    Ошибка авторизации
                </div>
            )}
            <Input
                // color={'secondary'}
                placeholder={'Имя пользователя'}
                type={'date'}
                onChange={event => onChangeDate(event.target.value)}
                value={date}
            />
            <Button
                onClick={onSubmitClick}
                disabled={isLoading}
            >
                Заказать
            </Button>

        </div>
    );
};