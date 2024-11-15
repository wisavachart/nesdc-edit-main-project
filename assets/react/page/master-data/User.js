import React, {Component, useState, useEffect,useRef} from 'react';
import Typography from '@mui/material/Typography';
import UserTable from "./crud-table/UserTable";
import Paper from "@mui/material/Paper";

function User() {

    return(
        <>
            <Typography sx={{p: 1,fontSize:'22px'}} variant="h4" gutterBottom>ข้อมูลผู้ใช้</Typography>
            <UserTable/>
        </>

    )
}
export default User;
