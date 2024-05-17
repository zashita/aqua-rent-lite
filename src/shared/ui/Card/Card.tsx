import React, {Children} from 'react';
import {classNames} from "shared/lib/classNames/classNames";
import cls from './Card.module.scss'

export enum CardViewModes{
    LIST = 'list',
    GRID = 'grid'
}
export interface CardProps{
    className?: string;
    onClick?: () => void;
    viewMode?: CardViewModes;
    children: React.ReactNode
}
export const Card:React.FC<CardProps> = (props) => {
    const {
        className,
        onClick,
        viewMode = CardViewModes.LIST,
        children
    } = props
    return (
        <div
            className={classNames(cls.Card, {}, [className, cls[viewMode]])}
            onClick={onClick}
        >
            {children}
        </div>
);
};