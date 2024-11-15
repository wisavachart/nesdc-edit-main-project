import React from 'react';
import Typography from "@mui/material/Typography";
import HousesTable from "./crud-table/HousesTable";

export default function Houses() {
    return (
        <React.Fragment>
            <Typography sx={{p: 1,fontSize:'22px'}} variant="h4" gutterBottom>จำนวนบ้านเรือน</Typography>
            <HousesTable/>
        </React.Fragment>
    )
}