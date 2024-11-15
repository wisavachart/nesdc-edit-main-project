import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import React from 'react';
export default function PageLoading(props) {
    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={props.isLoading}
        >
        <CircularProgress color="inherit" />
        </Backdrop>);
}