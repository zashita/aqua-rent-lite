import React, {memo, useState} from 'react';
import {classNames} from "shared/lib/classNames/classNames";
import cls from './AdminPage.module.scss'
import {Button} from "@mui/material";
import { BoatModeration } from '../BoatModeration/BoatModeration';
import {UserModeration} from "../UserModeration/UserModeration";


export interface AdminPageProps{
    className?: string;
}

export enum ModerationModes {
    BOATS = 'boats',
    USERS = 'users'
}
const AdminPage:React.FC<AdminPageProps> = memo(({className}) => {
    const [moderationMode, setModerationMode] = useState(ModerationModes.BOATS)

    return (
        <div className={classNames(cls.AdminPage, {}, [className])}>
            <Button onClick={() => setModerationMode(ModerationModes.BOATS)}>
                Boats
            </Button>
            <Button onClick ={() => setModerationMode(ModerationModes.USERS)}>
                Users
            </Button>
            <div>
                {moderationMode === ModerationModes.BOATS?
                    <BoatModeration/>:
                    <UserModeration/>
                }
            </div>
        </div>
    )
}
)
export default AdminPage