import React from 'react';
import Typography from "@mui/material/Typography";
import EscapeTable from "./crud-table/EscapeTable";

export default function Escape() {
    return (
        <React.Fragment>
            <Typography sx={{p: 1,fontSize:'22px'}} variant="h4" gutterBottom>ตัวชี้วัดการหลุดพ้นความยากจน</Typography>
            <EscapeTable/>
        </React.Fragment>
    )
}