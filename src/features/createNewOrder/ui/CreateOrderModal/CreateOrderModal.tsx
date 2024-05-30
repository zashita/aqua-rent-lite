import React from 'react';
import {classNames} from "shared/lib/classNames/classNames";
import cls from './CreateOrderModal.module.scss'
import {Modal} from "@mui/material";
import {CreateOrderForm} from "../CreateOrderForm/CreateOrderForm";


export interface CreateOrderModalProps{
    open: boolean;
    onClose: () => void;
}
export const CreateOrderModal:React.FC<CreateOrderModalProps> = (props) => {
    const {open, onClose} = props;

    return (
        <Modal
            className={cls.Modal}
            open={open}
            onClose={onClose}
            >
            <CreateOrderForm onClose={onClose}/>
        </Modal>
);
};