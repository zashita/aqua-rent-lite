import {Typography} from '@mui/material';
import React, {useCallback, useState} from 'react';
import {classNames} from "shared/lib/classNames/classNames";
import cls from './CreateOrderForm.module.scss'
import {createOrder} from "../../services/createOrder/createOrder";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "app/providers/storeProvider";
import {getOrderCreationData} from "../../model/selectors/getOrderCreationData/getOrderCreationData";
import {getCurrentBoat} from "../../../../entities/Boat";
import {createOrderActions} from "../../model/slice/createOrderSlice";
import {getMyInfo} from "../../../../entities/User";
import {DateTimePicker, LocalizationProvider} from "@mui/x-date-pickers";
import dayjs, {Dayjs} from "dayjs";
import {DemoContainer} from "@mui/x-date-pickers/internals/demo";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {Button, ButtonSize, ButtonThemes} from 'shared/ui/Button/Button';


import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { Message } from 'shared/ui/Message/Message';

dayjs.extend(utc)
dayjs.extend(timezone)


export interface CreateOrderFormProps{
    onClose: () => void
    className?: string;
}
export const CreateOrderForm:React.FC<CreateOrderFormProps> = ({className, onClose}) => {

    const dispatch = useDispatch<AppDispatch>();
    const {
        date,
        isLoading,
        error,
        message
    } = useSelector(getOrderCreationData);

    const myInfo = useSelector(getMyInfo)
    const userId = myInfo?.id;

    const {id} = useSelector(getCurrentBoat)


    const onChangeDate = useCallback((value: Dayjs) => {
        dispatch(createOrderActions.setDate(dayjs(value).tz('Europe/Minsk')));
        console.log(dayjs(date).tz('Europe/Minsk').toString())
    }, [date, dispatch]);



     const onSubmitClick = useCallback( () => {
         if(date && id && userId){
             dispatch(createOrder({userId, boatId: id, date}));
             // onClose();
             displayMessage();

             console.log(dayjs(date).tz)
         }
    }, [date, id, userId, dispatch, onClose]);

     const [messageOpen, setMessageOpen] = useState(false)
    const displayMessage = () => {
         setMessageOpen(true);
         setTimeout(() => {
             setMessageOpen(false)
         }, 2000)
    }

     const dateNow = new Date()
    console.log(`${dateNow.getFullYear()}-${dateNow.getMonth() + 1}-${dateNow.getDate()}`)

    return (
        <div className={classNames(cls.LoginForm, {}, [className])}>
            <Typography variant = {'h5'}>
                Оформление заказа
            </Typography>
            <Typography>
                Выберите дату и время:
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DateTimePicker']}>
                    <DateTimePicker
                        minDate={dayjs(`${dateNow.getFullYear()}-${dateNow.getMonth()+1}-${dateNow.getDate()}`)}
                        onChange={(value) => onChangeDate(value)}
                        timeSteps={{hours: 3}}
                        value={date}
                        ampm={false}
                    />
                </DemoContainer>
            </LocalizationProvider>
            <Button
                theme={ButtonThemes.PRIMARY_ACCENT}
                size = {ButtonSize.M}
                onClick={onSubmitClick}
                disabled={isLoading}
            >
                <Typography>
                    Заказать
                </Typography>
            </Button>
            <Message error={error} message={message} open={messageOpen}/>


        </div>
    );
};