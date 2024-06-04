import React, {useCallback, useState} from 'react';
import cls from './changePictureModal.module.scss'
import {Modal, Typography} from "@mui/material";
import Uploader from "../../../../shared/ui/Uploader";
import {Button, ButtonSize, ButtonThemes} from 'shared/ui/Button/Button';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../../../../app/providers/storeProvider";
import {changeUserPicture} from "../../services/changeUserPicture/changeUserPicture";
import {getMyInfo} from "../../../../entities/User";


export interface CreateBoatModalProps{
    open: boolean;
    onCLose: () => void;
}
export const ChangePictureModal:React.FC<CreateBoatModalProps> = (props) => {
    const {open, onCLose} = props;
    const dispatch = useDispatch<AppDispatch>();
    const myInfo = useSelector(getMyInfo);
    const id = myInfo?.id;
    const [image, setImage] = useState<File>(null)

    const onSubmitClick = useCallback(() => {
        if(image && id){
            dispatch(changeUserPicture({id, image}))
        }
    }, [dispatch, id, image])
    return (
        <Modal
            className={cls.Modal}
            open={open}
            onClose={onCLose}
        >
            <div className={cls.Content}>
                <Typography variant={'h5'}>Выберите изображение</Typography>
                <Uploader fileType={'image'} file={image} setFile={setImage}/>
                <Button
                    theme={ButtonThemes.PRIMARY_ACCENT}
                    size={ButtonSize.M}
                    onClick={onSubmitClick}>
                    Применить
                </Button>
            </div>
        </Modal>
    );
};