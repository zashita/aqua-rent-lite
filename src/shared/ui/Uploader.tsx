import React, {useEffect, useRef} from 'react';
import {Container, Grid} from "@mui/material";
import Card from "@mui/material/Card";
import {any} from "prop-types";
import Typography from "@mui/material/Typography";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

export interface IUploaderProps{
    fileType: string;
    file: any;
    setFile: any;
}

const Uploader:React.FC<IUploaderProps> = ({fileType, setFile, file}) => {
    const ref = useRef<HTMLInputElement>(null);
    const input_click = () => {
        if(ref.current) ref.current.click();
    }
    const change = (e: React.ChangeEvent<HTMLInputElement>) =>{
        if(e.target.files) setFile(e.target.files[0]);
    }

    const clear = () =>{
        setFile(null);
    }
    return (
        <>
            <Grid
                display = {'flex'}
                justifyContent={'space-between'}
                alignItems={'center'}
                >
                <Grid
                    onClick={input_click}
                    sx={{width: '90%', height: '55px', margin: '0',
                        borderRadius: '4px', border: '0.5px dotted gray',
                        backgroundColor: '#ffffff',
                        paddingLeft: '13px'}}
                    display={'flex'}
                    alignItems={'center'}
                    // justifyContent = 'center'
                >
                        <Typography
                            color={'gray'}>
                            {
                                file!==null?
                                file.name:
                                    `Изображение`
                            }

                        </Typography>


                </Grid>
                {file!== null?<CheckCircleIcon htmlColor={'green'}/>: <CancelIcon htmlColor={'red'}/>}
            </Grid>
            <Grid
                onClick={clear}
                sx={{width: '35%', height: '35px',
                    borderRadius: '4px', border: '0.5px dotted gray',
                    backgroundColor: '#ffffff', paddingLeft: '13px'}}
                display={'flex'}
                alignItems={'center'}
                >
                    <Typography color = {'gray'}>
                        Clear
                    </Typography>
            </Grid>
            <Container>
                <input type={"file"} accept={fileType + '/*'} ref={ref} hidden={true} onChange={change}/>
            </Container>
            {console.log(file)}
        </>

    );
};

export default Uploader;
