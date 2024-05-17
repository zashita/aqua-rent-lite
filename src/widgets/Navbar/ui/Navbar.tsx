import React, {useCallback, useState} from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
// import { useTranslation } from 'react-i18next';
// import { CreateOrderModal } from 'features/AuthByUsername';
// import { useDispatch, useSelector } from 'react-redux';
// import { getUserAuthData, userActions } from 'entities/User';
import cls from './Navbar.module.scss';
import {Button, Link} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {getUserAuthData} from "entities/User";
import {userActions} from "entities/User";
import {LoginModal} from "features/authByEmail";
import {CreateBoatModal} from 'features/registrateNewBoat'
import {AppRoutes, RoutePath} from "../../../shared/config/routeConfig/routeConfig";
import {USER_LOCALSTORAGE_KEY} from "../../../shared/const/localStorage";
import {jwtDecode} from "jwt-decode";
import {getMyId} from "../../../shared/lib/getMyId/getMyId";
import {useNavigate} from "react-router-dom";

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


    const userId = getMyId()

    const [createBoatModal, setCreateBoatModal] = useState(false);
    const toggleBoatModal = useCallback(() => {
        setCreateBoatModal((prevState) => !prevState);
    }, []);

    const navigate = useNavigate()
    const onLogout = () => {
        dispatch(userActions.logout());
        navigate(RoutePath.main)
    };


    if (authData) {
        return (
            <div className={classNames(cls.Navbar, {}, [className])}>
                <Link
                    href={RoutePath.main}
                >
                    Main

                </Link>
                <Link
                    href={RoutePath.about}
                >
                    About
                </Link>
                <Link
                    href={RoutePath.about}
                >
                    Orders
                </Link>
                <Link
                    href={RoutePath.profile + userId}
                >
                    Profile
                </Link>
                <Link
                    href={RoutePath.admin_page}
                >
                    Administrator panel
                </Link>
                <Button
                    onClick={toggleBoatModal}
                >
                    Create boat
                </Button>
                <Button
                    onClick={onLogout}
                >
                    Logout
                </Button>
                <CreateBoatModal
                    open={createBoatModal}
                    onCLose={toggleBoatModal}
                />

            </div>
        );
    }

    return (
        <div className={classNames(cls.Navbar, {}, [className])}>
            <Link
                href="/"
            >
                Main
            </Link>
            <Link
                href="/about"
            >
                About
            </Link>
            <Button
                className={cls.Button}
                onClick={toggleModal}
            >
                Login
            </Button>
            <LoginModal
                open={authModal}
                onCLose={toggleModal}
            />


        </div>
    );
};
