import React from 'react';
import {classNames} from "shared/lib/classNames/classNames";
import cls from './LoginModal.module.scss'
import {Modal} from "@mui/material";
import {LoginForm} from "../LoginForm/LoginForm";


export interface LoginModalProps{
    open: boolean;
    onCLose: () => void;
}
export const LoginModal:React.FC<LoginModalProps> = (props) => {
    const {open, onCLose} = props;

    return (
        <Modal
            className={cls.Modal}
            open={open}
            onClose={onCLose}
            >
            <LoginForm/>
        </Modal>
);
};