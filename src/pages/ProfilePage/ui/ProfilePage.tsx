import React, {memo, useMemo, useState} from 'react';
import {classNames} from "shared/lib/classNames/classNames";
import cls from './ProfilePage.module.scss'
import ProfileImage from 'shared/assets/images/user/User-avatar.png'
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "app/providers/storeProvider";
import {fetchUserProfile} from "entities/User";
import {getCurrentProfile} from "entities/User/model/selectors/getCurrentProfile/getCurrentProfile";
import {Divider, Typography} from "@mui/material";
import {getMyId} from "shared/lib/getMyId/getMyId";
import {Card} from "shared/ui/Card/Card";
import {BoatList, BoatListView} from "entities/Boat";
import {OrderList} from "entities/Order";
import {Button, ButtonSize, ButtonThemes} from "shared/ui/Button/Button";



export interface ProfilePageProps{
    className?: string;
}
export enum ProfileModes {
    BOATS = 'boats',
    ORDERS = 'orders',
}
const ProfilePage:React.FC<ProfilePageProps> = ({className}) => {
    const dispatch = useDispatch<AppDispatch>();
    const profile = useSelector(getCurrentProfile)
    const { id} = useParams();
    const isMine = id === getMyId();
    useMemo(()=>{
        dispatch(fetchUserProfile(id))
    }, [dispatch, id])

    const [profileMode, setProfileMode] = useState(ProfileModes.BOATS)
    return (
        <div className={classNames(cls.ProfilePage, {}, [className])}>
            <div className={cls.InfoWrapper}>
                <img src={ProfileImage} className={cls.ProfileImage}/>
                <div>
                    <Typography>
                        Электронная почта: <b>{profile?.email}</b>
                    </Typography>
                    <Typography>
                        Имя: <b>{profile?.name}</b>
                    </Typography>
                </div>
            </div>

            <Divider/>
            <div className={cls.Buttons}>
                <Button
                    onClick={() => setProfileMode(ProfileModes.ORDERS)}
                    theme={ButtonThemes.GHOST_NEUTRAL}
                    size={ButtonSize.L}
                    disabled={profileMode === ProfileModes.ORDERS}
                >
                    <Typography>
                        Заказы
                    </Typography>

                </Button>
                <Button
                    onClick={() => setProfileMode(ProfileModes.BOATS)}
                    theme={ButtonThemes.GHOST_NEUTRAL}
                    size={ButtonSize.L}
                    disabled={profileMode === ProfileModes.BOATS}

                >
                    <Typography>
                        Объявления
                    </Typography>

                </Button>
            </div>

            <div className={cls.ListWrapper}>
                {profileMode === ProfileModes.ORDERS && profile?.orders
                ?
                    <OrderList data={profile?.orders}/>
                :
                    null
                }
            </div>

            <div className={cls.ListWrapper}>
                {
                    profileMode === ProfileModes.BOATS && profile?.boats
                        ?
                        <BoatList data={profile.boats} view={BoatListView.BOX}/>
                        : null

                }
            </div>

        </div>
);
};
export default ProfilePage;