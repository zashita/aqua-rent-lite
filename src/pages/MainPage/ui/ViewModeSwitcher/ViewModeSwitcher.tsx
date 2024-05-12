import React, {useCallback} from 'react';
import {classNames} from "shared/lib/classNames/classNames";
import cls from './ViewModeSwitcher.module.scss'
import {GridView, ViewHeadline} from "@mui/icons-material";
import {BoatListView} from "../../../../entities/Boat";
import {mainPageActions} from "../../model/slice/mainPageSlice";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../../../app/providers/storeProvider";


export interface ViewModeSwitcherProps{
    className?: string;
    viewMode: BoatListView
}
export const ViewModeSwitcher:React.FC<ViewModeSwitcherProps> = ({className, viewMode}) => {
    const dispatch = useDispatch<AppDispatch>()

    const changeViewModeToList = useCallback(() => {
        dispatch(mainPageActions.setBoatListView(BoatListView.LIST))
    }, [dispatch])
    const changeViewModeToBox = useCallback(() => {
        dispatch(mainPageActions.setBoatListView(BoatListView.BOX))
    }, [dispatch])
    return (
        <div className={classNames(cls.ViewModeSwitcher, {}, [className])}>
            <GridView
                color={viewMode === BoatListView.BOX? 'primary': 'disabled'}
                onClick={changeViewModeToBox}
                className={cls.IconBox}
            />
            <ViewHeadline
                color={viewMode === BoatListView.LIST? 'primary': 'disabled'}
                onClick={changeViewModeToList}
                className={cls.IconList}
            />
        </div>
);
};