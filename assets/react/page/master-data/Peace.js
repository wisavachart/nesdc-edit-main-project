import React from 'react';
import Typography from "@mui/material/Typography";
import PeaceTable from "./crud-table/PeaceTable";

export default function Peace() {
    return (
        <React.Fragment>
            <Typography sx={{p: 1,fontSize:'22px'}} variant="h4" gutterBottom>สันติและความยุติธรรม</Typography>
            <PeaceTable/>
        </React.Fragment>
    )
}