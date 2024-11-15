import React from 'react';
import Typography from "@mui/material/Typography";
import EnvironmentTable from "./crud-table/EnvironmentTable";

export default function Environment() {
    return (
        <React.Fragment>
            <Typography sx={{p: 1,fontSize:'22px'}} variant="h4" gutterBottom>ตัวชี้วัดการพัฒนาสิ่งแวดล้อม</Typography>
            <EnvironmentTable/>
        </React.Fragment>
    )
}