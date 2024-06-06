import React, {useCallback, useMemo} from 'react';
import cls from './InputBlock.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {getLakesList} from "entities/Lake";
import {mainPageActions} from "../../model/slice/mainPageSlice";
import {BoatTypes, MoveType} from "entities/Boat";
import {
    Checkbox,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Select,
    Typography
} from "@mui/material";
import {Button, ButtonSize, ButtonThemes} from "shared/ui/Button/Button";
import {AppDispatch} from "app/providers/storeProvider";
import {getQuery} from "../../model/selectors/getQuery/getQuery";
import {fetchBoatFilteredList} from "../../services/fetchFilteredBoatList/fetchFilteredBoatList";


export interface InputBlockProps{
    className?: string;
}
export const InputBlock:React.FC<InputBlockProps> = ({className}) => {
    const {
        type,
        captain,
        moveType,
        lakeName,
        query
    } = useSelector(getQuery)
    const dispatch = useDispatch<AppDispatch>()
    useMemo(()=>{
        dispatch(
            mainPageActions.setQuery(`type=${type}&lakeName=${lakeName}&captain=${captain}&moveType=${moveType}`)
        )
    }, [captain, dispatch, lakeName, moveType, type])

    const onSubmitClick = useCallback(()=>{
        if(moveType && type && lakeName){
            dispatch(fetchBoatFilteredList(query))

        }
    }, [dispatch, lakeName, moveType, query, type])
    const lakeList = useSelector(getLakesList)






    const onChangeLake = useCallback((value: string) => {
        dispatch(mainPageActions.setLakeName(value));
    }, [dispatch]);
    const onChangeMoveType = useCallback((value: MoveType) => {
        dispatch(mainPageActions.setMoveType(value));
    }, [dispatch]);

    const onChangeCaptain = useCallback((value: boolean) => {
        dispatch(mainPageActions.setCaptain(value));
    }, [dispatch]);

    const onChangeType = useCallback((value: BoatTypes) =>{
        dispatch(mainPageActions.setType(value))
    }, [dispatch])
    return (
        <div className={cls.FilterContainer}>
            <Typography className={cls.Title} variant={'h3'}>
                Сервис для аренды водного транспорта
            </Typography>
            <Typography className={cls.SubTitle}>
                Введите параметры для поиска судна
            </Typography>
            <div className={cls.Inputs}>
                <FormControl>
                    <InputLabel id="demo-simple-select-label">Тип судна</InputLabel>
                    <Select
                        value={type}
                        className={cls.Input}
                        label={'Тип судна'}
                        // @ts-ignore
                        onChange={(event) => onChangeType(event.target.value)}
                    >
                        <MenuItem value={BoatTypes.BOAT}>Катер</MenuItem>
                        <MenuItem value={BoatTypes.YACHT}>Яхта</MenuItem>
                        <MenuItem value={BoatTypes.HYDROCYCLE}>Гидроцикл</MenuItem>
                        <MenuItem value={BoatTypes.KATAMARAN}>Катамаран</MenuItem>

                    </Select>
                </FormControl>
                <FormControl>
                    <InputLabel id="demo-simple-select-label">Озеро</InputLabel>
                    <Select
                        label={'Озеро'}
                        value={lakeName}
                        className={cls.Input}
                        // @ts-ignore
                        onChange={(event) => onChangeLake(event.target.value)}
                    >
                        {lakeList?.map((lake) => {
                            return (
                                <MenuItem value={lake.name}>{lake.name}</MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>
                <FormControl>
                    <InputLabel id="demo-simple-select-label">Приводится в движение с помощью</InputLabel>
                    <Select
                        label={'Приводится в движение с помощью'}
                        value={moveType}
                        className={cls.Input}
                        // @ts-ignore
                        onChange={(event) => onChangeMoveType(event.target.value)}
                    >
                        <MenuItem value={MoveType.ENGINE}>Двигателя</MenuItem>
                        <MenuItem value={MoveType.WIND}>Силы ветра</MenuItem>
                        <MenuItem value={MoveType.HAND}>Ручной силы</MenuItem>
                    </Select>
                </FormControl>
                <Button
                    size={ButtonSize.L}
                    theme={ButtonThemes.PRIMARY_INVERTED}
                    onClick={onSubmitClick}
                >
                    <Typography>
                        Найти
                    </Typography>

                </Button>


            </div>
            <div className={cls.CheckBox}>
                <FormControlLabel
                    color={'primary'}
                    control={
                        <Checkbox
                            checked={captain}
                            color={'info'}
                            //@ts-ignore
                            onChange={(e) => onChangeCaptain(e.target.checked)}
                            inputProps={{'aria-label': 'controlled'}}
                        />
                    }
                    label="Наличие капитана"/>
            </div>

        </div>
    );
};