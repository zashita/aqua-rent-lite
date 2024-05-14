import React from 'react';
import {classNames} from "shared/lib/classNames/classNames";
import cls from './BoatList.module.scss'
import {Grid, List} from "@mui/material";
import {BoatListItem} from "../BoatListItem/BoatListItem";
import {useSelector} from "react-redux";
import {getBoatState} from "../../model/selectors/getBoatState/getBoatState";
import {Boat, BoatListView} from "../../model/types/boat";


export interface BoatListProps{
    className?: string;
    data?: Boat[];
    view?: BoatListView;
    isLoading?: boolean
}
export const BoatList:React.FC<BoatListProps> = (props) => {
    const {
        data,
        view = BoatListView.BOX,
        className,
        isLoading
    } = props

    const mods: Record<string, boolean> = {
        [cls[view]]: true
    }


    const renderBoat = (boat: Boat) =>{
        return <BoatListItem
            boat={boat}
            view={view}
            className = {cls.card}
        />
    }




    return (
        <div className={classNames(cls.BoatList, mods, [className])}>
                {data?.map(
                    (boat, index) =>
                renderBoat(boat)
                    )
                }
        </div>
);
};