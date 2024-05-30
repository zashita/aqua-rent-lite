import React from 'react';
import {classNames} from "shared/lib/classNames/classNames";
import cls from './Message.module.scss'
import {Typography} from "@mui/material";


export interface MessageProps{
    className?: string;
    message?: string;
    error?: boolean;
    open?: boolean;
}
export const Message:React.FC<MessageProps> = (props) => {
    const {
        className,
        message,
        error,
        open
    } = props

    const mods: Record<string, boolean> = {
        [cls.error]: error,
        [cls.open]: open,
    };
    console.log(message)
    return (
        <div className={classNames(cls.Message, mods, [className])}>
            <Typography>
                {message}
            </Typography>
        </div>
);
};