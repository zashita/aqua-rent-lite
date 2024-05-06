import {Button, Input, TextField} from '@mui/material';
import React, {useCallback} from 'react';
import {classNames} from "shared/lib/classNames/classNames";
import cls from './LoginForm.module.scss'
import {loginByEmail} from "../../services/loginByEmail/loginByEmail";
import {loginActions} from "../../model/slice/loginSlice";
import {useDispatch, useSelector} from "react-redux";
import {getLoginState} from "../../model/selectors/getLoginState/getLoginState";
import {AppDispatch} from "app/providers/storeProvider";


export interface LoginFormProps{
    className?: string;
}
export const LoginForm:React.FC<LoginFormProps> = ({className}) => {

    const dispatch = useDispatch<AppDispatch>();
    const {
        email,
        password,
        isLoading,
        error,
    } = useSelector(getLoginState);

    const onChangeEmail = useCallback((value: string) => {
        dispatch(loginActions.setEmail(value));
    }, [dispatch]);

    const onChangePassword = useCallback((value: string) => {
        dispatch(loginActions.setPassword(value));
    }, [dispatch]);

     const onSubmitClick = useCallback( () => {
         dispatch(loginByEmail({email, password}));
    }, [dispatch, email, password]);

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
                onChange={event => onChangeEmail(event.target.value)}
                value={email}
            />
            <Input
                // color = 'secondary'
                onChange={event => onChangePassword(event.target.value)}
                value={password}
                placeholder={'Пароль'}
            />
            <Button
                onClick={onSubmitClick}
                disabled={isLoading}
            >
                Войти
            </Button>

        </div>
    );
};