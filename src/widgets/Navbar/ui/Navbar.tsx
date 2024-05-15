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

    const [createBoatModal, setCreateBoatModal] = useState(false);
    const toggleBoatModal = useCallback(() => {
        setCreateBoatModal((prevState) => !prevState);
    }, []);


    const onLogout = () => {
        dispatch(userActions.logout());
    };

    if (authData) {
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
                <Link
                    href="/about"
                >
                    Orders
                </Link>
                <Link
                    href="/profile"
                >
                    Profile
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
