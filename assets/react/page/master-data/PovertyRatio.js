import React, {Component, useState, useEffect,useRef} from 'react';
import Typography from '@mui/material/Typography';
import PovertyTable from "./crud-table/PovertyTable";
import Paper from "@mui/material/Paper";

function PovertyRatio() {

    return(
        <>
            <Typography sx={{p: 1,fontSize:'22px'}} variant="h4" gutterBottom>สัดส่วนความยากจน และตัวแปรต่างๆ</Typography>
            <PovertyTable/>
        </>

    )
}
export default PovertyRatio;
