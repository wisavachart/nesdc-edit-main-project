import React from 'react';
import Typography from "@mui/material/Typography";
import StabilityTable from "./crud-table/StabilityTable";

export default function Stability() {
    return (
        <React.Fragment>
            <Typography sx={{p: 1,fontSize:'22px'}} variant="h4" gutterBottom>ผลกระทบปัจจัยด้านสถานการณ์ความมั่นคง</Typography>
            <StabilityTable/>
        </React.Fragment>
    )
}