import React, {memo, useCallback, useMemo, useState} from 'react';
import {classNames} from 'shared/lib/classNames/classNames';
import cls from './Navbar.module.scss';
import {Link, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {getMyInfo, getUserAuthData, getWaiting, setStatusWaiting, userActions} from "entities/User";
import {LoginModal} from "features/authByEmail";
import {CreateBoatModal} from 'features/registrateNewBoat'
import {RoutePath} from "shared/config/routeConfig/routeConfig";

import {useNavigate} from "react-router-dom";
import {NavbarMenu} from './Menu';
import {Button, ButtonSize, ButtonThemes} from 'shared/ui/Button/Button';
import {AppDispatch} from "app/providers/storeProvider";
import Logo from 'shared/assets/images/logo/000.png'
import {fetchMyStatus} from "entities/User";

export interface NavbarProps{
    className?: string;
}
export const Navbar:React.FC<NavbarProps> = memo(({ className }) => {
    const dispatch = useDispatch<AppDispatch>();
    const authData = useSelector(getUserAuthData);
    const waiting = useSelector(getWaiting)
    const [authModal, setAuthModal] = useState(false);
    const toggleModal = useCallback(() => {
        setAuthModal((prevState) => !prevState);
    }, []);

    const myInfo = useSelector(getMyInfo)

    const id = myInfo?.id;
    const roles = myInfo?.roles

    useMemo(() => {
        dispatch(fetchMyStatus(id))
    }, [dispatch, id])



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

    const onBecomeSellerClick = useCallback(()=>{
        dispatch(setStatusWaiting(id));
    }, [dispatch, id])
    ;

    const navigateToMain = useCallback(() => {
        navigate(RoutePath.main)
    },[navigate])


    if (authData) {
        return (
            <div className={classNames(cls.Navbar, {}, [className])}>
                <div className = {cls.LogoBlock}>
                    <img
                        className={cls.LogoImg}
                        src={Logo} alt={'Aqua Rent'}
                        onClick={navigateToMain}/>
                </div>
                <div className={cls.Navigation}>
                    <Link
                        underline={'none'}
                        className={cls.link}
                        color={"#fff"}
                        href={RoutePath.ads_page}
                    >
                        <Typography>
                            Объявления
                        </Typography>
                    </Link>
                    <Link
                        underline={'none'}
                        className={cls.link}
                        href={RoutePath.about}
                        color={"#fff"}

                    >
                        <Typography>
                            О сайте
                        </Typography>
                    </Link>
                    {seller?
                        <Link
                            underline={'none'}
                            className={cls.link}
                            href={RoutePath.orders_page + id}
                            color={"#fff"}

                        >
                            <Typography>
                                Мои сделки
                            </Typography>
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
                        <Typography>
                            Мой профиль
                        </Typography>

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
                                <Typography>
                                    Панель администратора
                                </Typography>
                            </Link>
                            :
                            null
                    }
                </div>
                <div className={cls.Buttons}>
                    {seller
                        ?
                        <Button
                            theme={ButtonThemes.PRIMARY_ACCENT}
                            size={ButtonSize.M}
                            onClick={toggleBoatModal}
                            disabled={!seller}
                        >
                            <Typography>
                                Создать объявление
                            </Typography>
                        </Button>
                        :
                        <Button
                            theme={ButtonThemes.PRIMARY_ACCENT}
                            size={ButtonSize.M}
                            onClick={onBecomeSellerClick}
                            disabled={waiting}
                        >
                            <Typography>
                                Стать арендодателем
                            </Typography>
                        </Button>
                    }

                    <Button
                        theme={ButtonThemes.PRIMARY_ACCENT}
                        size={ButtonSize.M}
                        onClick={onLogout}
                    >
                        <Typography>
                            Выйти
                        </Typography>
                    </Button>
                    {/*<ProfileDropdown collapsed={false}/>*/}
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
                <img
                    className={cls.LogoImg}
                    src={Logo} alt={'Aqua Rent'}
                    onClick={navigateToMain}/>
            </div>
            <div className={cls.Navigation}>
                <Link
                    fontFamily={'Roboto'}
                    underline={'none'}
                    color={"#fff"}
                    className={cls.link}
                    href={RoutePath.ads_page}
                >
                    <Typography>
                        Обьявления
                    </Typography>
                </Link>
                <Link
                    fontFamily={'Roboto'}
                    underline={'none'}
                    color={"#fff"}
                    className={cls.link}
                    href="/about"
                >
                    <Typography>
                        О сайте
                    </Typography>
                </Link>
            </div>
            <div className = {cls.Buttons}>
                <Button
                    theme={ButtonThemes.PRIMARY_ACCENT}
                    size={ButtonSize.M}
                    className={cls.Button}
                    onClick={toggleModal}
                >
                    <Typography>
                        Войти
                    </Typography>

                </Button>
            </div>
            <LoginModal
                open={authModal}
                onCLose={toggleModal}
            />


        </div>
    );
})
