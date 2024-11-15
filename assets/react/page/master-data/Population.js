import React from 'react';
import Typography from "@mui/material/Typography";
import PopulationTable from "./crud-table/PopulationTable";

function Population() {
    return(
        <React.Fragment>
            <Typography sx={{p: 1,fontSize:'22px'}} variant="h4" gutterBottom>จำนวนประชากร</Typography>
            <PopulationTable/>
        </React.Fragment>
    )
}
export default Population;