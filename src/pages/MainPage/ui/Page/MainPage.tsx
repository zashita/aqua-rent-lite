import React, {useMemo} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "app/providers/storeProvider";
import {BoatList, BoatListView, fetchBoatList, getBoatIsLoading, getBoatList} from "entities/Boat";
import {MainPageSkeleton} from "../PageSkeleton/MainPageSkeleton";
import {getQuery} from "../../model/selectors/getQuery/getQuery";
import {fetchLakesList} from "entities/Lake";
import {InputBlock} from '../InputBlock/InputBlock';


const MainPage = () => {
    const dispatch = useDispatch<AppDispatch>()
    useMemo(() => {
        dispatch(fetchBoatList())
        dispatch(fetchLakesList())
    }, [dispatch]);




    const isLoading = useSelector(getBoatIsLoading)
    const {boatList} = useSelector(getQuery)


    if(isLoading){
        return (
            <MainPageSkeleton/>
        )
    }

    return (
        <div>
            <InputBlock/>
            {boatList
                ?
                <BoatList data={boatList} view={BoatListView.BOX}/>
                :
                null
            }
        </div>
    );
};

export default MainPage;
