import {Button, Input, TextField} from '@mui/material';
import React, {useCallback} from 'react';
import {classNames} from "shared/lib/classNames/classNames";
import cls from './CreateBoatForm.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "app/providers/storeProvider";
import {jwtDecode, JwtPayload} from "jwt-decode";
import {USER_LOCALSTORAGE_KEY} from "../../../../shared/const/localStorage";
import {getBoatCreationData} from "../../model/selectors/getBoatCreationData/getBoatCreationData";
import {createBoatActions} from "../../model/slice/createBoatSlice";
import {createBoat} from "../../services/createBoat/createBoat";
import Uploader from 'shared/ui/Uploader';


export interface CreateOrderFormProps{
    className?: string;
}
export const CreateBoatForm:React.FC<CreateOrderFormProps> = ({className}) => {

    const dispatch = useDispatch<AppDispatch>();
    const {
        name,
        isLoading,
        description,
        image
    } = useSelector(getBoatCreationData);
    const jwtToken = localStorage.getItem(USER_LOCALSTORAGE_KEY);
    const decoded = jwtDecode(jwtToken)

    // @ts-ignore
    const userId = decoded.id

    const onChangeName = useCallback((value: string) => {
        dispatch(createBoatActions.setName(value));
    }, [dispatch]);

    const onChangeDescription = useCallback((value: string) => {
        dispatch(createBoatActions.setDescription(value));
    }, [dispatch]);

    const onChangeImage = useCallback((value: File) => {
        console.log(value)
        dispatch(createBoatActions.setImage(value));
    }, [dispatch]);


    const onSubmitClick = useCallback( () => {
        dispatch(createBoat({name, userId, description, image}));
        console.log(image)
    }, [dispatch, name, userId, description, image]);

    return (
        <div className={classNames(cls.CreateBoatForm, {}, [className])}>
            {/*{false && (*/}
            {/*    <div>*/}
            {/*        {' '}*/}
            {/*        Ошибка авторизации*/}
            {/*    </div>*/}
            {/*)}*/}
            <Input
                // color={'secondary'}
                placeholder={'Название судна'}
                type={'text'}
                onChange={event => onChangeName(event.target.value)}
                value={name}
            />
            <Input
                // color={'secondary'}
                placeholder={'Описание судна'}
                type={'text'}
                onChange={event => onChangeDescription(event.target.value)}
                value={description}
            />
            <Uploader file={image} setFile={onChangeImage} fileType={'image'}/>
            <Button
                onClick={onSubmitClick}
                disabled={isLoading}
            >
                Зарегистрировать судно
            </Button>

        </div>
    );
};