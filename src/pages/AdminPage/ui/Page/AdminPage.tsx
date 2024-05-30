import React, {memo, useState} from 'react';
import {classNames} from "shared/lib/classNames/classNames";
import cls from './AdminPage.module.scss'
import {Typography} from "@mui/material";
import {BoatModeration} from '../BoatModeration/BoatModeration';
import {UserModeration} from "../UserModeration/UserModeration";
import {NotConfirmedUsers} from "../NotConfirmedUsers/NotConfirmedUsers";
import {Button, ButtonSize, ButtonThemes} from 'shared/ui/Button/Button';


export interface AdminPageProps{
    className?: string;
}

export enum ModerationModes {
    BOATS = 'boats',
    USERS = 'users',
    CONFIRMAION = 'not_confirmed_users',
}
const AdminPage:React.FC<AdminPageProps> = memo(({className}) => {
    const [moderationMode, setModerationMode] = useState(ModerationModes.BOATS)

    return (
        <div className={classNames(cls.AdminPage, {}, [className])}>
            <Button
                onClick={() => setModerationMode(ModerationModes.BOATS)}
                theme={ButtonThemes.GHOST_ACCENT}
                size={ButtonSize.M}
            >
                <Typography>
                    Объявления
                </Typography>
            </Button>
            <Button
                onClick ={() => setModerationMode(ModerationModes.USERS)}
                theme={ButtonThemes.GHOST_ACCENT}
                size={ButtonSize.M}
            >
                <Typography>
                    Пользователи
                </Typography>
            </Button>
            <Button
                onClick ={() => setModerationMode(ModerationModes.CONFIRMAION)}
                theme={ButtonThemes.GHOST_ACCENT}
                size={ButtonSize.M}
            >
                <Typography>
                    Запросы на роль арендодателя
                </Typography>
            </Button>
            <div>
                {moderationMode === ModerationModes.BOATS?
                    <BoatModeration/>:null
                }
                {
                    moderationMode === ModerationModes.USERS?
                        <UserModeration/>: null
                }
                {
                    moderationMode === ModerationModes.CONFIRMAION?
                        <NotConfirmedUsers/>: null
                }
            </div>
        </div>
    )
}
)
export default AdminPage