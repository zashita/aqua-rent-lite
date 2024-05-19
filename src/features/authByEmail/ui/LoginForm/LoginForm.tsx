import {Button, Input, Link, Typography} from '@mui/material';
import React, {useCallback, useState} from 'react';
import {classNames} from "shared/lib/classNames/classNames";
import cls from './LoginForm.module.scss'
import {loginByEmail} from "../../services/loginByEmail/loginByEmail";
import {AuthModes, loginActions} from "../../model/slice/loginSlice";
import {useDispatch, useSelector} from "react-redux";
import {getLoginState} from "../../model/selectors/getLoginState/getLoginState";
import {AppDispatch} from "app/providers/storeProvider";
import {registrate} from "../../services/registrate/registrate";


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
        mode
    } = useSelector(getLoginState);
    const [verifyPassword, setVerifyPassword] = useState('')

    const onChangeEmail = useCallback((value: string) => {
        dispatch(loginActions.setEmail(value));
    }, [dispatch]);

    const onChangeMode = useCallback((value: AuthModes)=>{
        dispatch(loginActions.setAuthMode(value))
    }, [dispatch])

    const onChangePassword = useCallback((value: string) => {
        dispatch(loginActions.setPassword(value));
    }, [dispatch]);

     const onSubmitClick = useCallback( () => {
         dispatch(loginByEmail({email, password}));
    }, [dispatch, email, password]);

    const onSubmitClickRegistration = useCallback( () => {
        if(password === verifyPassword){
            dispatch(registrate({email, password}));
        }
    }, [dispatch, email, password, verifyPassword]);


    const onChangeVerify = (value: string) =>{
        setVerifyPassword(value)
    }

    if(mode === AuthModes.LOGIN){
        return (
            <div className={classNames(cls.LoginForm, {}, [className])}>
                {error && (
                    <div>
                        {' '}
                        Ошибка авторизации
                    </div>
                )}
                <Typography variant={'h5'}>
                    Вход в аккаунт
                </Typography>
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
                    type={'password'}

                />
                <Button
                    onClick={onSubmitClick}
                    disabled={isLoading}
                >
                    Войти
                </Button>
                <Link
                    textAlign={'center'}
                    onClick={() => onChangeMode(AuthModes.REGISTRATION)}
                >
                    У меня еще нет аккаунта.
                </Link>



            </div>
        )
    }
    return (
        <div className={classNames(cls.LoginForm, {}, [className])}>
            {error && (
                <div>
                    {' '}
                    Ошибка авторизации
                </div>
            )}
            <Typography variant={'h5'}>
                Регистрация
            </Typography>
            <Input
                // color={'secondary'}
                placeholder={'Имя пользователя'}
                onChange={event => onChangeEmail(event.target.value)}
                value={email}
                type = {'email'}
            />
            <Input
                // color = 'secondary'
                onChange={event => onChangePassword(event.target.value)}
                value={password}
                placeholder={'Пароль'}
                type = {'password'}
            />
            <Input
                // color = 'secondary'
                onChange={event => onChangeVerify(event.target.value)}
                value={verifyPassword}
                placeholder={'Подтвердите пароль'}
                type = {'password'}
            />
            <Button
                onClick={onSubmitClickRegistration}
                disabled={isLoading}
            >
                Зарегистрироваться
            </Button>
            <Link
                textAlign={'center'}
                onClick={() => onChangeMode(AuthModes.LOGIN)}
            >
                У меня уже есть аккаунт.
            </Link>

        </div>
    );
};