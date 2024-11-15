import React from 'react';
import Typography from "@mui/material/Typography";
import EconomicTable from "./crud-table/EconomicTable";

export default function Economic() {
    return (
        <React.Fragment>
            <Typography sx={{p: 1,fontSize:'22px'}} variant="h4" gutterBottom>ตัวชี้วัดการพัฒนาเศรษฐกิจและ ความมั่นคง</Typography>
            <EconomicTable/>
        </React.Fragment>
    )
}