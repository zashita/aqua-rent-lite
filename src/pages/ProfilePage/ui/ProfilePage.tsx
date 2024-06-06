import React, {memo, useCallback, useMemo, useState} from 'react';
import {classNames} from "shared/lib/classNames/classNames";
import cls from './ProfilePage.module.scss'
import ProfileImage from 'shared/assets/images/user/User-avatar.png'
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "app/providers/storeProvider";
import {fetchUserProfile, getMyInfo, getUserIsLoading, getCurrentProfile} from "entities/User";
import {Divider, Typography} from "@mui/material";
import {getMyId} from "shared/lib/getMyId/getMyId";
import {BoatList, BoatListView} from "entities/Boat";
import {OrderList} from "entities/Order";
import {Button, ButtonSize, ButtonThemes} from "shared/ui/Button/Button";
import {ChangePictureModal} from "../../../features/changeUserPicture";
import {baseUrl} from "shared/api/api";
import { ProfilePageSkeleton } from './ProfilePageSkeleton';



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
    const isLoading = useSelector(getUserIsLoading)
    const { id} = useParams();
    const isMine = id === getMyId();
    useMemo(()=>{
        dispatch(fetchUserProfile(id))
    }, [dispatch, id])
    const myInfo = useSelector(getMyInfo)
    const myId = myInfo?.id;
    const [pictureModal, setPictureModal] = useState(false)

    const onPictureToggle = useCallback(() => {
        if(id === myId){
            setPictureModal(!pictureModal)
        }
    }, [id, myId, pictureModal])

    const [profileMode, setProfileMode] = useState(ProfileModes.ORDERS)
    if(isLoading){
        return (
            <ProfilePageSkeleton/>
        )
    }
    return (
        <div className={classNames(cls.ProfilePage, {}, [className])}>
            <div className={cls.InfoWrapper}>
                <img
                    src={profile?.picture?`${baseUrl}/${profile?.picture}` : ProfileImage}
                    className={cls.ProfileImage}
                    onClick={onPictureToggle}
                />
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
                <ChangePictureModal open={pictureModal} onCLose={onPictureToggle}/>
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