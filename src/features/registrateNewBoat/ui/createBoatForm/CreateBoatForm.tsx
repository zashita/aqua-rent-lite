import {
    Checkbox,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography
} from '@mui/material';
import React, {useCallback, useMemo} from 'react';
import {classNames} from "shared/lib/classNames/classNames";
import cls from './CreateBoatForm.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "app/providers/storeProvider";
import {jwtDecode} from "jwt-decode";
import {USER_LOCALSTORAGE_KEY} from "shared/const/localStorage";
import {getBoatCreationData} from "../../model/selectors/getBoatCreationData/getBoatCreationData";
import {createBoatActions} from "../../model/slice/createBoatSlice";
import {createBoat} from "../../services/createBoat/createBoat";
import Uploader from 'shared/ui/Uploader';
import {BoatTypes, MoveType} from "entities/Boat";
import {getLakesList} from "entities/Lake";
import {fetchLakesList} from "entities/Lake";
import {Button, ButtonSize, ButtonThemes} from 'shared/ui/Button/Button';


export interface CreateOrderFormProps{
    className?: string;
    onClose?: () => void;
}
export const CreateBoatForm:React.FC<CreateOrderFormProps> = ({className, onClose}) => {

    const dispatch = useDispatch<AppDispatch>();
    const {
        name,
        isLoading,
        description,
        image,
        type,
        price,
        moveType,
        captain,
        passengerCapacity,
        lakeId,
        error
    } = useSelector(getBoatCreationData);

    useMemo(()=>{
        dispatch(fetchLakesList())
    },[dispatch])

    const jwtToken = localStorage.getItem(USER_LOCALSTORAGE_KEY);
    const decoded = jwtDecode(jwtToken)

    // @ts-ignore
    const userId = decoded.id

    const onChangeName = useCallback((value: string) => {
        dispatch(createBoatActions.setName(value));
    }, [dispatch]);

    const onChangeDescription = useCallback((value: string) => {
        dispatch(createBoatActions.setDescription(value));
    }, [dispatch]);

    const onChangeImage = useCallback((value: File) => {
        console.log(value)
        dispatch(createBoatActions.setImage(value));
    }, [dispatch]);

    const onChangePrice = useCallback((value: number) => {
        dispatch(createBoatActions.setPrice(value));
    }, [dispatch]);

    const onChangeCapacity = useCallback((value: number) => {
        dispatch(createBoatActions.setPassengerCapacity(value));
    }, [dispatch]);

    const onChangeLake = useCallback((value: string) => {
        dispatch(createBoatActions.setLakeId(value));
    }, [dispatch]);

    const onChangeCaptain = useCallback((value: boolean) => {
        dispatch(createBoatActions.setCaptain(value));
    }, [dispatch]);

    const onChangeMoveType = useCallback((value: MoveType) => {
        dispatch(createBoatActions.setMoveType(value));
    }, [dispatch]);

    const onChangeType = useCallback((value: BoatTypes) =>{
        dispatch(createBoatActions.setType(value))
    }, [dispatch])

    // price: number;
    // lakeName: string;
    // passengerCapacity: number;
    // moveType: string;
    // captain: boolean;

    const onSubmitClick = useCallback( () => {
        if(name && userId && type && description && image && price && lakeId && passengerCapacity &&moveType){
            dispatch(createBoat({
                name,
                userId,
                type,
                description,
                image,
                price,
                lakeId,
                passengerCapacity,
                moveType,
                captain
            }));
            setTimeout(() =>{
                if(!isLoading){
                    onClose();
                }
            }, 500, )
        }
        
        console.log(image)
    }, [name, userId, type, description, image, price, lakeId, passengerCapacity, moveType, dispatch, captain]);
    const lakeList = useSelector(getLakesList)
    return (
        <div className={classNames(cls.CreateBoatForm, {}, [className])}>
            {error && (
                <div>
                    {' '}
                    Ошибка при создании лодки
                </div>
            )}
            <Typography variant={'h5'}>
                Введите данные судна
            </Typography>
            <TextField
                // color={'secondary'}
                label={'Название судна'}
                type={'text'}
                onChange={event => onChangeName(event.target.value)}
                value={name}
            />
            <TextField
                // color={'secondary'}
                label={'Цена за час, BYN'}
                type={'number'}
                onChange={event => onChangePrice(Number(event.target.value))}
                value={price}
            />
            <TextField
                // color={'secondary'}
                label={'Количиество пассажиров'}
                type={'number'}
                onChange={event => onChangeCapacity(Number(event.target.value))}
                value={passengerCapacity}
            />
            <TextField
                // color={'secondary'}
                label={'Описание судна'}
                type={'text'}
                onChange={event => onChangeDescription(event.target.value)}
                value={description}
            />
            <FormControl>
                <InputLabel id="demo-simple-select-label">Тип судна</InputLabel>
                <Select
                    value={type}
                    label = {'Тип судна'}
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
                <InputLabel id="demo-simple-select-label">Приводится в движение с помощью</InputLabel>
                <Select
                    label={'Приводится в движение с помощью'}
                    value={moveType}
                    // @ts-ignore
                    onChange={(event) => onChangeMoveType(event.target.value)}
                >
                    <MenuItem value={MoveType.ENGINE}>Двигателя</MenuItem>
                    <MenuItem value={MoveType.WIND}>Силы ветра</MenuItem>
                    <MenuItem value={MoveType.HAND}>Ручной силы</MenuItem>
                </Select>
            </FormControl>
            <FormControl>
                <InputLabel id="demo-simple-select-label">Озеро</InputLabel>
                <Select
                    label={'Озеро'}
                    value={lakeId}
                    // @ts-ignore
                    onChange={(event) => onChangeLake(event.target.value)}
                >
                    {lakeList?.map((lake)=>{
                        return(
                            <MenuItem value={lake.id}>{lake.name}</MenuItem>
                        )
                    })}
                </Select>
            </FormControl>
            <FormControlLabel control=
                {
                    <Checkbox
                        checked={captain}
                        //@ts-ignore
                        onChange={(e) => onChangeCaptain(e.target.checked)}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
            } label="Наличие капитана" />



            <Uploader file={image} setFile={onChangeImage} fileType={'image'}/>
            <Button
                theme={ButtonThemes.PRIMARY_ACCENT}
                size={ButtonSize.M}
                onClick={onSubmitClick}
                disabled={isLoading}
            >
                Зарегистрировать судно
            </Button>

        </div>
    );
};