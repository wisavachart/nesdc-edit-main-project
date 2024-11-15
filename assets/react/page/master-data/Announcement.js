import React, {Component, useState, useEffect,useRef} from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import '@fontsource/roboto/100.css';
import Typography from '@mui/material/Typography';
import Paper from "@mui/material/Paper";
import AnnouncementTable from "./crud-table/AnnouncementTable";

const theme = createTheme();
const styles = {
    testBackground: {
        backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5))',
        backgroundSize: "cover",
        backgroundPosition: "center",
    }
};
function Anncuncement() {

    return(
        <>
            <Typography sx={{p: 1, fontSize:'22px'}} variant="h4" gutterBottom>ข่าวประชาสัมพันธ์</Typography>
            <AnnouncementTable/>
        </>
    )
}
export default Anncuncement;
