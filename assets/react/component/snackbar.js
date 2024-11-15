import React, {Component, useState, useEffect,useRef} from 'react';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {Alert} from "@mui/material";

export default function SnackbarCom(props) {
    // const [,set] = useState();
    const { open, message, handleClose,severity } = props;

    return(
        <Snackbar
            sx={{mt:'50px'}}
            open={open}
            autoHideDuration={6000}
            anchorOrigin={{ vertical: 'top', horizontal: 'center'}}
            key={"top" + "center"}
            onClose={handleClose}
            // action={action}
        >
            <Alert
                severity={severity}
                action={
                    <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                        <CloseIcon fontSize="small" />
                    </IconButton>
                }
            >
                {message}
            </Alert>
        </Snackbar>
    )
}