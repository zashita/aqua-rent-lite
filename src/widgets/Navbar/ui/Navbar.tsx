import React, {useCallback, useState} from 'react';
import {classNames} from 'shared/lib/classNames/classNames';
// import { useTranslation } from 'react-i18next';
// import { CreateOrderModal } from 'features/AuthByUsername';
// import { useDispatch, useSelector } from 'react-redux';
// import { getUserAuthData, userActions } from 'entities/User';
import cls from './Navbar.module.scss';
import {Link, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {getMyInfo, getUserAuthData, userActions} from "entities/User";
import {LoginModal} from "features/authByEmail";
import {CreateBoatModal} from 'features/registrateNewBoat'
import {RoutePath} from "../../../shared/config/routeConfig/routeConfig";

import {useNavigate} from "react-router-dom";
import {NavbarMenu} from './Menu';
import {Button, ButtonSize, ButtonThemes} from 'shared/ui/Button/Button';

export interface NavbarProps{
    className?: string;
}
export const Navbar:React.FC<NavbarProps> = ({ className }) => {
    const dispatch = useDispatch();
    const authData = useSelector(getUserAuthData);
    const [authModal, setAuthModal] = useState(false);
    const toggleModal = useCallback(() => {
        setAuthModal((prevState) => !prevState);
    }, []);


    const myInfo = useSelector(getMyInfo)

    const id = myInfo?.id;
    const roles = myInfo?.roles

    const admin = !!roles?.find((role) => role === 'ADMIN')
    const seller = !!roles?.find((role) => role === 'SELLER')



    const [createBoatModal, setCreateBoatModal] = useState(false);
    const toggleBoatModal = useCallback(() => {
        setCreateBoatModal((prevState) => !prevState);
    }, []);

    const navigate = useNavigate()
    const onLogout = () => {
        dispatch(userActions.logout());
        navigate(RoutePath.main)
    };

    const navigateToMain = useCallback(() => {
        navigate(RoutePath.main)
    },[navigate])


    if (authData) {
        return (
            <div className={classNames(cls.Navbar, {}, [className])}>
                <div className = {cls.LogoBlock}>
                    <Typography
                        variant={'h4'}
                        className={cls.LogoText}
                        onClick={navigateToMain}
                    >
                        aquaRent
                    </Typography>
                </div>
                <div className={cls.Navigation}>
                    <Link
                        underline={'none'}
                        className={cls.link}
                        color={"#fff"}
                        href={RoutePath.ads_page}
                    >
                        Обьявления
                    </Link>
                    <Link
                        underline={'none'}
                        className={cls.link}
                        href={RoutePath.about}
                        color={"#fff"}

                    >
                        О нас
                    </Link>
                    {seller?
                        <Link
                            underline={'none'}
                            className={cls.link}
                            href={RoutePath.orders_page + id}
                            color={"#fff"}

                        >
                            Мои сделки
                        </Link>
                        :
                        null
                    }

                    <Link
                        underline={'none'}
                        className={cls.link}
                        color={"#fff"}
                        href={RoutePath.profile + id}
                    >
                        Мой профиль
                    </Link>
                    {
                        admin?
                            <Link
                                fontFamily={'Roboto'}
                                underline={'none'}
                                color={"#fff"}
                                className={cls.link}
                                href={RoutePath.admin_page}
                            >
                                Панель администратора
                            </Link>
                            :
                            null
                    }
                </div>
                <div className={cls.Buttons}>
                    <Button
                        theme={ButtonThemes.GHOST_ACCENT_INVERTED}
                        size={ButtonSize.M}
                        onClick={toggleBoatModal}
                        disabled={!seller}
                    >
                        Создать обьявление
                    </Button>
                    <Button
                        theme={ButtonThemes.GHOST_ACCENT_INVERTED}
                        size={ButtonSize.M}
                        onClick={onLogout}
                    >
                        Logout
                    </Button>
                    <CreateBoatModal open={createBoatModal} onCLose={toggleBoatModal}/>
                </div>



                <div className = {cls.Dropdown}>
                    <NavbarMenu/>
                </div>
            </div>
        );
    }

    return (
        <div className={classNames(cls.Navbar, {}, [className])}>
            <div className={cls.LogoBlock}>
                <Typography
                    variant={'h4'}
                    className={cls.LogoText}
                    onClick={navigateToMain}
                >
                    aquaRent
                </Typography>
            </div>
            <div className={cls.Navigation}>
                <Link
                    fontFamily={'Roboto'}
                    underline={'none'}
                    color={"#fff"}
                    className={cls.link}
                    href={RoutePath.ads_page}
                >
                    Обьявления
                </Link>
                <Link
                    fontFamily={'Roboto'}
                    underline={'none'}
                    color={"#fff"}
                    className={cls.link}
                    href="/about"
                >
                    О нас
                </Link>
            </div>
            <div className = {cls.Buttons}>
                <Button
                    theme={ButtonThemes.PRIMARY_INVERTED}
                    size={ButtonSize.M}
                    className={cls.Button}
                    onClick={toggleModal}
                >
                    Войти
                </Button>
            </div>
            <LoginModal
                open={authModal}
                onCLose={toggleModal}
            />


        </div>
    );
};
