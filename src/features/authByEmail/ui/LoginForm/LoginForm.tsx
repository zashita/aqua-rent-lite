import {Link, TextField, Typography} from '@mui/material';
import React, {useCallback, useState} from 'react';
import {classNames} from "shared/lib/classNames/classNames";
import cls from './LoginForm.module.scss'
import {loginByEmail} from "../../services/loginByEmail/loginByEmail";
import {AuthModes, loginActions} from "../../model/slice/loginSlice";
import {useDispatch, useSelector} from "react-redux";
import {getLoginState} from "../../model/selectors/getLoginState/getLoginState";
import {AppDispatch} from "app/providers/storeProvider";
import {registrate} from "../../services/registrate/registrate";
import {Button, ButtonSize, ButtonThemes} from 'shared/ui/Button/Button';


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
        mode, name
    } = useSelector(getLoginState);
    const [verifyPassword, setVerifyPassword] = useState('')

    const validateEmail = (value: string): boolean => {
        const reg = new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$");
        return reg.test(value)
    }

    const validatePassword = (value: string): boolean => {
        // const reg = new RegExp("/(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/g");
        return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{6,}$/.test(value)
    }

    const onChangeEmail = useCallback((value: string) => {
        dispatch(loginActions.setEmail(value));
    }, [dispatch]);

    const onChangeMode = useCallback((value: AuthModes)=>{
        dispatch(loginActions.setAuthMode(value))
    }, [dispatch])

    const onChangePassword = useCallback((value: string) => {
        dispatch(loginActions.setPassword(value));
    }, [dispatch]);

    const onChangeName = useCallback((value: string) => {
        dispatch(loginActions.setName(value));
    }, [dispatch]);

     const onSubmitClick = useCallback( () => {
         if(email && password){
             dispatch(loginByEmail({email, password}));
         }
    }, [dispatch, email, password]);

    const onSubmitClickRegistration = useCallback( () => {
        if(
            password === verifyPassword
            && name
            && validateEmail(email)
            && validatePassword(password)
        ){
            dispatch(registrate({email, name, password}));
        }
    }, [dispatch, email, name, password, verifyPassword]);


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
                <TextField
                    // color={'secondary'}
                    label={'Введите электронную почту'}

                    type={'email'}
                    color = {validateEmail(email)? 'primary': 'warning'}
                    onChange={event => onChangeEmail(event.target.value)}
                    value={email}
                />
                <TextField
                    // color = 'secondary'
                    onChange={event => onChangePassword(event.target.value)}
                    value={password}
                    color = 'primary'
                    label={'Введите пароль'}
                    type={'password'}

                />
                <Button
                    size={ButtonSize.L}
                    theme={ButtonThemes.PRIMARY_ACCENT}
                    onClick={onSubmitClick}
                    disabled={isLoading}
                >
                    <Typography>
                        Войти
                    </Typography>

                </Button>
                <Link
                    textAlign={'center'}
                    onClick={() => onChangeMode(AuthModes.REGISTRATION)}
                    color={'#0b9378'}
                    underline={'hover'}
                    width={"200px"}
                >
                    <Typography>
                        У меня еще нет аккаунта.

                    </Typography>
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
            <TextField
                // color={'secondary'}
                label={'Введите электронную почту'}
                color = {validateEmail(email)? 'primary': 'warning'}
                onChange={event => onChangeEmail(event.target.value)}
                value={email}
            />

            <TextField
                // color={'secondary'}
                label={'Введите свое имя'}
                color = 'primary'
                onChange={event => onChangeName(event.target.value)}
                value={name}
            />
            <TextField
                // color = 'secondary'
                onChange={event => onChangePassword(event.target.value)}
                value={password}
                color = {validatePassword(password)? 'primary': 'warning'}
                label={'Введите пароль'}
                type={'password'}

            />
            <TextField
                // color = 'secondary'
                onChange={event => onChangeVerify(event.target.value)}
                color = {verifyPassword === password? 'primary': 'warning'}
                value={verifyPassword}
                label={'Подтвердите пароль'}
                type = {'password'}
            />
            <Button
                onClick={onSubmitClickRegistration}
                disabled={isLoading}
                theme={ButtonThemes.PRIMARY_ACCENT}
                size={ButtonSize.L}
            >
                <Typography>
                    Зарегистрироваться
                </Typography>
            </Button>
            <Link
                textAlign={'center'}
                onClick={() => onChangeMode(AuthModes.LOGIN)}
                underline={'hover'}
                color = {'#0b9378'}
            >
                <Typography>
                    У меня уже есть аккаунт.
                </Typography>
            </Link>
        </div>
    );
};