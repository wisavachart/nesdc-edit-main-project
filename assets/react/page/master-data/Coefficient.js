import React, {Component, useState, useEffect,useRef} from 'react';
import Typography from '@mui/material/Typography';
import CoefficientTable from "./crud-table/CoefficientTable";
import Paper from "@mui/material/Paper";

function Coefficient() {

    return(
        <>
            <Typography sx={{p: 1,fontSize:'22px'}} variant="h4" gutterBottom>สัมประสิทธิ์</Typography>
            <CoefficientTable/>
        </>

    )
}
export default Coefficient;
