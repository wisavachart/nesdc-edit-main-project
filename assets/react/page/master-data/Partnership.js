import React from 'react';
import Typography from "@mui/material/Typography";
import PartnershipTable from "./crud-table/PartnershipTable";

export default function Partnership() {
    return (
        <React.Fragment>
            <Typography sx={{p: 1,fontSize:'22px'}} variant="h4" gutterBottom>ตัวชี้วัดความเป็นหุ้นส่วนการพัฒนา</Typography>
            <PartnershipTable/>
        </React.Fragment>
    )
}