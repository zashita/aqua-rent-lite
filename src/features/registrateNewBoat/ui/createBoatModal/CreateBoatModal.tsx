import React from 'react';
import {classNames} from "shared/lib/classNames/classNames";
import cls from './CreateBoatModal.module.scss'
import {Modal} from "@mui/material";
import {CreateBoatForm} from "../createBoatForm/CreateBoatForm";


export interface CreateBoatModalProps{
    open: boolean;
    onCLose: () => void;
}
export const CreateBoatModal:React.FC<CreateBoatModalProps> = (props) => {
    const {open, onCLose} = props;

    return (
        <Modal
            className={cls.Modal}
            open={open}
            onClose={onCLose}
        >
        <CreateBoatForm/>
        </Modal>
);
};