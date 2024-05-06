import React, { useEffect } from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "app/providers/storeProvider";
import {fetchBoatList} from "entities/Boat";
import {BoatList} from "entities/Boat";
import {getBoatState} from "entities/Boat";



const MainPage = () => {
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        dispatch(fetchBoatList())
    }, [dispatch]);
    const {boatList, isLoading} = useSelector(getBoatState)

    if(isLoading){
        return (
            <p>Loading</p>
        )
    }
    else
    return (
        <BoatList data={boatList}/>
    );
};

export default MainPage;
