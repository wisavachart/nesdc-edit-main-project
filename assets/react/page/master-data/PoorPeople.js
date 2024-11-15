import React from 'react';
import Typography from "@mui/material/Typography";
import PoorPeopleTable from "./crud-table/PoorPeopleTable";

export default function PoorPeople() {
    return (
        <React.Fragment>
            <Typography sx={{p: 1,fontSize:'22px'}} variant="h4" gutterBottom>จำนวนคนจน, ค่า GPP</Typography>
            <PoorPeopleTable/>
        </React.Fragment>
    )
}