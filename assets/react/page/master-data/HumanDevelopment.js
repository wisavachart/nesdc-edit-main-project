import React from 'react';
import Typography from "@mui/material/Typography";
import HumanDevelopmentTable from "./crud-table/HumanDevelopmentTable";

export default function HumanDevelopment() {
    return (
        <React.Fragment>
            <Typography sx={{p: 1,fontSize:'22px'}} variant="h4" gutterBottom>ตัวชี้วัดการพัฒนาคน</Typography>
            <HumanDevelopmentTable/>
        </React.Fragment>
    )
}