import React, {useMemo} from 'react';
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
import {OrderList} from "../../../entities/Order";


export interface ProfilePageProps{
    className?: string;
}
const ProfilePage:React.FC<ProfilePageProps> = ({className}) => {
    const dispatch = useDispatch<AppDispatch>();
    const profile = useSelector(getCurrentProfile)
    const { id} = useParams();
    const isMine = id === getMyId();
    useMemo(()=>{
        dispatch(fetchUserProfile(id))
    }, [dispatch, id])
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
            {isMine?
                <Typography className={cls.Title} variant={'h5'}>Мои заказы</Typography>
                : null
            }
            <Divider/>


            <div className={cls.ListWrapper}>
                {isMine && profile?.orders
                ?
                    <OrderList data={profile?.orders}/>
                :
                    <Typography variant={'h5'}>
                        Пока что нет заказов
                    </Typography>
                }
            </div>
            <Typography className={cls.Title} variant={'h5'}>
                {isMine?
                    `Мои объявления (${profile?.boats.length})`
                    :
                    `Объявления пользователя (${profile?.boats.length})`}
            </Typography>
            <Divider/>

            <div className={cls.ListWrapper}>
                {
                    profile?.boats
                        ?
                        <BoatList data={profile.boats} view={BoatListView.BOX}/>
                        : <Typography variant={'h4'}>
                            Пока что нет объявлений
                        </Typography>


                }
            </div>

        </div>
);
};
export default ProfilePage;