import React, { Component, useState, useEffect, useRef ,useContext} from 'react';
import PropTypes from 'prop-types';
import axios from "axios";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import Typography from "@mui/material/Typography";
import SaveIcon from '@mui/icons-material/Save';
import UserApi from "/assets/react/api/UserApi";
import TextField from '@mui/material/TextField';
import LinearProgress from '@mui/material/LinearProgress';
import Autocomplete from '@mui/material/Autocomplete';
import Dialog from '@mui/material/Dialog';
import { GridRowModes, DataGrid, GridToolbarContainer, GridActionsCellItem } from "@mui/x-data-grid";

import Swal from "sweetalert2";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";

import KuPovertyRatioApi from "/assets/react/api/KuPovertyRatioApi";
import { AuthContext } from '/assets/react-app';

const initialRows = [];
function EditToolbar(props) {
    const { auth, setAuth, identity, setIdentity } = useContext(AuthContext);
    const { setRows, setRowModesModel, rowModesModel, setDialog_insert, setDialog } = props;

    const handleClick = () => {
        setDialog(dialog => ({ ...dialog, ...{ mode: 'insert' } }))
        setDialog_insert(true)
    };

    const isRowModesModel = Object.keys(rowModesModel).length === 0;

    return (
        <Box width="100%" flexDirection="row" justifyContent="flex-end" display="flex" alignItems="center" sx={{ mb: '10px' }}>
            <Button disabled={!isRowModesModel} color="primary" startIcon={<AddIcon />} onClick={handleClick} style={{ backgroundColor: '#01696A', color: '#fff' }}>
                เพิ่มข้อมูลใหม่
            </Button>
        </Box>
    );
}

EditToolbar.propTypes = {
    setRowModesModel: PropTypes.func.isRequired,
    setRows: PropTypes.func.isRequired,
};

export default function CoefficientTable() {
    const { identity } = useContext(AuthContext);
    const [rows, setRows] = useState(initialRows);
    const [rowModesModel, setRowModesModel] = useState({});
    const [pageSize, setPageSize] = useState(10);
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [loading, setLoading] = useState(true);
    const [faculty, setFaculty] = useState({
        id: null,
        value: 'ทั้งหมด',
        input: '',
        option: [{
            faculty_id: null,
            faculty_name: "ทั้งหมด",
            faculty_no: null
        }],
    });
    const [masterFaculty, setMasterFaculty] = useState([]);
    const [masterCurriculum, setMasterCurriculum] = useState([]);

    const [selectedRole, setSelectedRole] = useState({
        id: null,
        value: 'ทั้งหมด',
        input: '',
        option: [{
            faculty_id: null,
            faculty_name: "ทั้งหมด",
            faculty_no: null
        }],
    });

    const [masterRole, setMasterRole] = useState([
        { name: 'ทั้งหมด', role: '' },
        { name: 'Admin', role: 'ROLE_ADMIN' },
        { name: 'User', role: 'ROLE_USER' },
        // { name: 'HR', role:'ROLE_HR'},
        // { name: 'Register', role:'ROLE_Register'},
    ]);

    const [dialog_insert, setDialog_insert] = useState(false);
    const [dialog, setDialog] = useState({
        mode: null,
        email: '',
        name: '',
        password: '',
        id: null,
        role: null,
        roleName: '',
        roleDropDownInput: null,
        roleDropDownValue: '',
    });

    useEffect(() => {
        getMaster();
        const result = fetchData().catch(console.error);
    }, []);

    const fetchData = async () => {
        let users = await UserApi.getData();
        users = users.data.map(({ id, email, role, roleName, name, status }) => {
            return {
                id: id,
                email: email,
                role: role,
                roleName: roleName,
                name: name,
                status: status ? 'active' : 'non-active',
                isEnabled: status,
            }
        });

        let masterData = await KuPovertyRatioApi.getMaster();
        //console.log(masterData.data.coefficient1['b0'])   
        setRows([{
            id: masterData.data.coefficient1['id'],
            b0: masterData.data.coefficient1['b0'],
            b1: masterData.data.coefficient1['b1'],
            b2: masterData.data.coefficient1['b2'],
            b3: masterData.data.coefficient1['b3'],
            b4: masterData.data.coefficient1['b4'],
            b5: masterData.data.coefficient1['b5'],
            b6: masterData.data.coefficient1['b6'],
            b7: masterData.data.coefficient1['b7']
        }]);
        setEditBodyVal( v => ({
            ...v,
            ...{
                id: masterData.data.coefficient1['id'],
                b0: masterData.data.coefficient1['b0'],
                b1: masterData.data.coefficient1['b1'],
                b2: masterData.data.coefficient1['b2'],
                b3: masterData.data.coefficient1['b3'],
                b4: masterData.data.coefficient1['b4'],
                b5: masterData.data.coefficient1['b5'],
                b6: masterData.data.coefficient1['b6'],
                b7: masterData.data.coefficient1['b7'],
                email: identity.email,
            }
        }))
        setLoading(false)
    }

    const [search, setSearch] = useState({
        province: {
            provinceId: 215,
            province: 'ตาก',
            d: 1
        },
        year: {
            year: '2560'
        }
    })
    const [configData, setConfigData] = useState([{
        province: {
            province_id: 215,
            province: "ตาก",
            d: 1
        },
        years: {
            year: "2560"
        }
    }]);
    const getMaster = async () => {
        let masterData = await KuPovertyRatioApi.getMaster();
        setConfigData(configData => ({ ...configData, ...{ province: masterData.data.province } }))
        setConfigData(configData => ({ ...configData, ...{ year: masterData.data.year } }))
    }
    const editData = async () => {
        await setLoading(true)
        let data = {
            id: dialogPvt.id,
            email: identity.email,
            year: dialogPvt.year,
            provinceId: dialogPvt.provinceId,
            y: dialogPvt.y,
            x1: dialogPvt.x1,
            x2: dialogPvt.x2,
            x3: dialogPvt.x3,
            x4: dialogPvt.x4,
            x5: dialogPvt.x5,
            x6: dialogPvt.x6,
        }
        await KuPovertyRatioApi.updateInsert(data);
        await fetchData();
        await setLoading(false);
    }

    // const resetDialog = (params, event) => {
    //     setDialog(dialog=>({...dialog,...{
    //             mode: null,
    //             email: '',
    //             name: '',
    //             password: '',
    //             id: null,
    //             role:null,
    //             roleName:'',
    //             roleDropDownInput:null,
    //             roleDropDownValue:'',
    //         }}))
    // };

    // const handleChange = async (isEnabled,id) => {
    //     // console.log(isEnabled);
    //     // setChecked(event.target.checked);
    //     await setLoading(true)
    //     if (isEnabled){
    //         await UserApi.disableData(id)
    //     }
    //     if (!isEnabled){
    //         await UserApi.enableData(id)
    //     }
    //     let users = await UserApi.getData();
    //     users = users.data.map(({id, email, role, roleName, name, status}) => {
    //         return {
    //             id: id,
    //             email: email,
    //             role: role,
    //             roleName: roleName,
    //             name: name,
    //             status: status ? 'active' : 'non-active',
    //             isEnabled: status,
    //         }
    //     });
    //     setRows(users)
    //     resetDialog();
    //     await setLoading(false)
    // };
    const handleChange = async (isEnabled, id) => {
        await setLoading(true)
        let data = {
            id: id,
            email: identity.email
        }
        if (isEnabled) {
            await KuPovertyRatioApi.disableData(data)
        }
        if (!isEnabled) {
            await KuPovertyRatioApi.enableData(data)
        }
        let povertyRatio = await KuPovertyRatioApi.getDataByProvinceAndYear();
        povertyRatio = povertyRatio.data.map(({ id
            , province
            , provinceId
            , year
            , y
            , x1
            , x2
            , x3
            , x4
            , x5
            , x6
            , enabled, d }) => {
            return {
                id: id,
                province: province,
                provinceId: provinceId,
                year: year,
                y: y.toFixed(4),
                x1: x1.toFixed(4),
                x2: x2.toFixed(4),
                x3: x3.toFixed(4),
                x4: x4.toFixed(4),
                x5: x5.toFixed(4),
                x6: x6.toFixed(4),
                enabled: enabled,
                d: d
            }
        });
        setRows(povertyRatio);
        resetDialog();
        resetDialogPvt();
        await setLoading(false)
    };
    const [opDialog, setOpDialog] = useState(false);
    const [dialogPvt, setDialogPvt] = useState({
        id: null,
        province: null,
        provinceId: null,
        x1: null,
        x2: null,
        x3: null,
        x4: null,
        x5: null,
        x6: null,
        y: null,
        year: null,
        d: null
    });
    const resetDialogPvt = () => {
        setDialogPvt(dialog => ({
            ...dialog, ...{
                id: null,
                province: null,
                provinceId: null,
                x1: null,
                x2: null,
                x3: null,
                x4: null,
                x5: null,
                x6: null,
                y: null,
                year: null,
                d: null
            }
        }))
        console.log('reset dialog');
    };

    const [editBodyVal, setEditBodyVal] = useState({
        id: '',
        b0: '',
        b1: '',
        b2: '',
        b3: '',
        b4: '',
        b5: '',
        b6: '',
        b7: '',
        email: '',
    });
    const [editColumn, setEditColumn] = useState(false);
    const columns = [
        //{ field: 'id', headerName: 'ลำดับที่' , width: 80,editable:false, renderCell: (index) => index.api.getRowIndex(index.row.id) + 1,headerClassName: 'super-app-theme--header', },
        {
            field: 'b0',
            headerClassName: 'super-app-theme--header',
            headerName: 'b0',
            flex: 1,
            align: 'center',
            headerAlign: 'center',
            renderCell: () => (
                <React.Fragment>
                    <TextField
                        value={editBodyVal.b0}
                        disabled={!editColumn}
                        fullWidth
                        size="small"
                        inputProps={{min: 0, style: { textAlign: 'center' }}}
                        error={editBodyVal.b0.length <= 0 }
                        helperText={editBodyVal.b0.length <= 0}
                        onChange={(e)=>{
                            const value = e.target.value;
                            if (/^-?\d*\.?\d*$/.test(value) || value === '') {
                                setEditBodyVal(v => ({
                                    ...v,
                                    ...{
                                        b0: e.target.value,
                                    }
                                }))
                            }
                        }}
                    />
                </React.Fragment>
            )
        },
        {
            field: 'b1',
            headerClassName: 'super-app-theme--header',
            headerName: 'b1',
            flex: 1,
            align: 'center',
            headerAlign: 'center',
            renderCell: () => (
                <React.Fragment>
                    <TextField
                        value={editBodyVal.b1}
                        disabled={!editColumn}
                        fullWidth
                        size="small"
                        inputProps={{min: 0, style: { textAlign: 'center' }}}
                        error={editBodyVal.b1.length <= 0 }
                        helperText={editBodyVal.b1.length <= 0}
                        onChange={(e)=>{
                            const value = e.target.value;
                            if (/^-?\d*\.?\d*$/.test(value) || value === '') {
                                setEditBodyVal(v => ({
                                    ...v,
                                    ...{
                                        b1: e.target.value,
                                    }
                                }))
                            }
                        }}
                    />
                </React.Fragment>
            )
        },
        {
            field: 'b2',
            headerClassName: 'super-app-theme--header',
            headerName: 'b2',
            flex: 1,
            align: 'center',
            headerAlign: 'center',
            renderCell: () => (
                <React.Fragment>
                    <TextField
                        value={editBodyVal.b2}
                        disabled={!editColumn}
                        fullWidth
                        size="small"
                        inputProps={{min: 0, style: { textAlign: 'center' }}}
                        error={editBodyVal.b2.length <= 0 }
                        helperText={editBodyVal.b2.length <= 0}
                        onChange={(e)=>{
                            const value = e.target.value;
                            if (/^-?\d*\.?\d*$/.test(value) || value === '') {
                                setEditBodyVal(v => ({
                                    ...v,
                                    ...{
                                        b2: e.target.value,
                                    }
                                }))
                            }
                        }}
                    />
                </React.Fragment>
            )
        },
        {
            field: 'b3',
            headerClassName: 'super-app-theme--header',
            headerName: 'b3',
            flex: 1,
            align: 'center',
            headerAlign: 'center',
            renderCell: () => (
                <React.Fragment>
                    <TextField
                        value={editBodyVal.b3}
                        disabled={!editColumn}
                        fullWidth
                        size="small"
                        inputProps={{min: 0, style: { textAlign: 'center' }}}
                        error={editBodyVal.b3.length <= 0 }
                        helperText={editBodyVal.b3.length <= 0}
                        onChange={(e)=>{
                            const value = e.target.value;
                            if (/^-?\d*\.?\d*$/.test(value) || value === '') {
                                setEditBodyVal(v => ({
                                    ...v,
                                    ...{
                                        b3: e.target.value,
                                    }
                                }))
                            }
                        }}
                    />
                </React.Fragment>
            )
        },
        {
            field: 'b4',
            headerClassName: 'super-app-theme--header',
            headerName: 'b4',
            flex: 1,
            align: 'center',
            headerAlign: 'center',
            renderCell: () => (
                <React.Fragment>
                    <TextField
                        value={editBodyVal.b4}
                        disabled={!editColumn}
                        fullWidth
                        size="small"
                        inputProps={{min: 0, style: { textAlign: 'center' }}}
                        error={editBodyVal.b4.length <= 0 }
                        helperText={editBodyVal.b4.length <= 0}
                        onChange={(e)=>{
                            const value = e.target.value;
                            if (/^-?\d*\.?\d*$/.test(value) || value === '') {
                                setEditBodyVal(v => ({
                                    ...v,
                                    ...{
                                        b4: e.target.value,
                                    }
                                }))
                            }
                        }}
                    />
                </React.Fragment>
            )
        },
        {
            field: 'b5',
            headerClassName: 'super-app-theme--header',
            headerName: 'b5',
            flex: 1,
            align: 'center',
            headerAlign: 'center',
            renderCell: () => (
                <React.Fragment>
                    <TextField
                        value={editBodyVal.b5}
                        disabled={!editColumn}
                        fullWidth
                        size="small"
                        inputProps={{min: 0, style: { textAlign: 'center' }}}
                        error={editBodyVal.b5.length <= 0 }
                        helperText={editBodyVal.b5.length <= 0}
                        onChange={(e)=>{
                            const value = e.target.value;
                            if (/^-?\d*\.?\d*$/.test(value) || value === '') {
                                setEditBodyVal(v => ({
                                    ...v,
                                    ...{
                                        b5: e.target.value,
                                    }
                                }))
                            }
                        }}
                    />
                </React.Fragment>
            )
        },
        {
            field: 'b6',
            headerClassName: 'super-app-theme--header',
            headerName: 'b6',
            flex: 1,
            align: 'center',
            headerAlign: 'center',
            renderCell: () => (
                <React.Fragment>
                    <TextField
                        value={editBodyVal.b6}
                        disabled={!editColumn}
                        fullWidth
                        size="small"
                        inputProps={{min: 0, style: { textAlign: 'center' }}}
                        error={editBodyVal.b6.length <= 0 }
                        helperText={editBodyVal.b6.length <= 0}
                        onChange={(e)=>{
                            const value = e.target.value;
                            if (/^-?\d*\.?\d*$/.test(value) || value === '') {
                                setEditBodyVal(v => ({
                                    ...v,
                                    ...{
                                        b6: e.target.value,
                                    }
                                }))
                            }
                        }}
                    />
                </React.Fragment>
            )
        },
        {
            field: 'b7',
            headerClassName: 'super-app-theme--header',
            headerName: 'b7',
            flex: 1,
            align: 'center',
            headerAlign: 'center',
            renderCell: () => (
                <React.Fragment>
                    <TextField
                        value={editBodyVal.b7}
                        disabled={!editColumn}
                        fullWidth
                        size="small"
                        inputProps={{min: 0, style: { textAlign: 'center' }}}
                        error={editBodyVal.b7.length <= 0 }
                        helperText={editBodyVal.b7.length <= 0}
                        onChange={(e)=>{
                            const value = e.target.value;
                            if (/^-?\d*\.?\d*$/.test(value) || value === '') {
                                setEditBodyVal(v => ({
                                    ...v,
                                    ...{
                                        b7: e.target.value,
                                    }
                                }))
                            }
                        }}
                    />
                </React.Fragment>
            )
        },
        {
            field: 'actions',
            headerClassName: 'super-app-theme--header',
            type: 'actions',
            headerName: 'แก้ไข',
            width: 100,
            cellClassName: 'actions',
            getActions: (params) => [
                <GridActionsCellItem
                    icon={ editColumn ? <SaveIcon/> :  <EditIcon /> }
                    label="Edit"
                    className="textPrimary"
                    onClick={async () => {
                        const obj = rows.find(rows => rows.id === params.id);
                        // console.log(identity);
                        setEditColumn(!editColumn);
                        if (obj.id && editColumn) {
                            setEditBodyVal(v => ({
                                ...v,
                                ...{
                                    id: obj.id,
                                    email: identity.email,
                                }
                            }))
                            // console.log(editBodyVal);
                            await updateCoefficient(editBodyVal)
                        }
                    }}
                    color="inherit"
                    disabled={loading}
                />
            ]
        }
    ];

    const updateCoefficient = async (data) => {
        setLoading(true)
        if (
            data.b0.length <= 0 ||
            data.b1.length <= 0 ||
            data.b2.length <= 0 ||
            data.b3.length <= 0 ||
            data.b4.length <= 0 ||
            data.b5.length <= 0 ||
            data.b6.length <= 0 ||
            data.b7.length <= 0
        ){
            Swal.fire({
                title: 'กรุณากรอกข้อมูลให้ครบถ้วน',
                // text:  '',
                icon: 'error',
                // showCancelButton: true,
                // cancelButtonText: 'ยกเลิก',
                confirmButtonColor: '#3085d6',
                // cancelButtonColor: '#d33',
                confirmButtonText: 'ตกลง'
            }).then(async (result) => {
                if (result.isConfirmed) {
                } else if (result.dismiss === Swal.DismissReason.cancel){

                }
            })
        }else {
            let res = await KuPovertyRatioApi.updateCoefficient(data);
            setRows([{
                id: res.data.id,
                b0: res.data.b0,
                b1: res.data.b1,
                b2: res.data.b2,
                b3: res.data.b3,
                b4: res.data.b4,
                b5: res.data.b5,
                b6: res.data.b6,
                b7: res.data.b7,
            }]);
            setEditBodyVal(v => ({
                ...v,
                ...{
                    id: res.data.id,
                    b0: res.data.b0,
                    b1: res.data.b1,
                    b2: res.data.b2,
                    b3: res.data.b3,
                    b4: res.data.b4,
                    b5: res.data.b5,
                    b6: res.data.b6,
                    b7: res.data.b7,
                }
            }))
        }
        setLoading(false)
    }

    function getRoleName(params) {

        if (params.row.role === undefined) {
            return '';
        }

        if (params.row.role[0] === 'ROLE_USER') {
            return 'User';
        }

        if (params.row.role[0] === 'ROLE_ADMIN') {
            return 'Admin';
        }

        if (params.row.role[0] === 'ROLE_HR') {
            return 'HR';
        }

        if (params.row.role[0] === 'ROLE_Register') {
            return 'Register';
        }

        // return params.row.role[0] === 'ROLE_USER' ? 'User' : 'Admin';
    }

    function getData(params) {
        if (params.row.role === undefined) {
            return '';
        }
        return params.row.role[0] === 'ROLE_USER' ? params.value : '-';
    }


    return (
        <>
            <Box
                sx={{
                    '& .actions': {
                        color: 'text.secondary',
                    },
                    '& .textPrimary': {
                        color: 'text.primary',
                    },
                    '& .super-app-theme--header': {
                        backgroundColor: '#01696A',
                        color: '#fff'
                    },
                }}
            >
                {/*<Button onClick={()=>{*/}
                {/*  */}
                {/*}}*/}
                {/*>test</Button>*/}
                <Grid container spacing={2} item>

                    {/*<Grid xs={12} sm={12} md={6} lg={4} item sx={{pb: '15px',ml:'5px'}}>
                    <Grid container direction="row" item>
                    <Typography variant="subtitle1">ประเภทผู้ใช้งาน</Typography>

                        <Autocomplete
                            fullWidth
                            disableClearable
                            size="small"
                            id="combo-box-demo"
                            defaultValue='ทั้งหมด'
                            options={masterRole.map((option) => option.name)}
                            onChange={async (event, newValue) => {
                                setLoading(true);
                                setSelectedRole(newValue);
                                
                                if (newValue === null || newValue === 'ทั้งหมด'){
                                    let users = await UserApi.getData();
                                    users = users.data.map(({user_id, user_name, user_email,faculty_id,faculty_name,curriculum_id,curriculum_name,role}) => {
                                        return {
                                            id: user_id,
                                            user_id: user_id,
                                            user_name: user_name,
                                            user_email: user_email,
                                            faculty_id: faculty_id,
                                            faculty_name: faculty_name,
                                            curriculum_id: curriculum_id,
                                            curriculum_name: curriculum_name,
                                            role: role,
                                        }
                                    });
                                    setRows(users);
                                    
                                } else {
                                    
                                    const selectedRoleObj = masterRole.find((option) => option.name === newValue);
                                    if (selectedRoleObj) {
                                        let users = await UserApi.findByRoles(selectedRoleObj.role , );
                                        users = users.data.map(({user_id, user_name, user_email,faculty_id,faculty_name,curriculum_id,curriculum_name,role}) => {
                                            return {
                                                id: user_id,
                                                user_id: user_id,
                                                user_name: user_name,
                                                user_email: user_email,
                                                faculty_id: faculty_id,
                                                faculty_name: faculty_name,
                                                curriculum_id: curriculum_id,
                                                curriculum_name: curriculum_name,
                                                role: role,
                                            }
                                        });
                                        setRows(users);
                                    }
                                } 


                                setLoading(false);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />



                    </Grid>
                </Grid>*/}

                    {/*<Grid xs={12} sm={12} md={6} lg={4} item sx={{pb: '20px',ml:'5px'}}>
                    <Grid container direction="row" item>
                        <Typography variant="subtitle1">สังกัด</Typography><Typography sx={{color: 'red',pl:'5px'}}>*</Typography>
                        <Autocomplete
                            fullWidth
                            disableClearable
                            size="small"
                            value={faculty.value}
                            onChange={ async (event, newValue) => {
                                await setLoading(true)
                                await setFaculty(faculty => ({...faculty, ...{value: newValue}}))

                                if (newValue === null || newValue === 'ทั้งหมด'){
                                    let users = await UserApi.getData();
                                    users = users.data.map(({user_id, user_name, user_email,faculty_id,faculty_name,curriculum_id,curriculum_name,role}) => {
                                        return {
                                            id: user_id,
                                            user_id: user_id,
                                            user_name: user_name,
                                            user_email: user_email,
                                            faculty_id: faculty_id,
                                            faculty_name: faculty_name,
                                            curriculum_id: curriculum_id,
                                            curriculum_name: curriculum_name,
                                            role: role,
                                        }
                                    });
                                    setRows(users);
                                } else {
                                    const findFacultyId = await faculty.option.find((e) => e.faculty_name === newValue);
                                    console.log(findFacultyId.faculty_id);
                                    let users = await UserApi.findByFaculty(findFacultyId.faculty_id);
                                    users = users.data.map(({user_id, user_name, user_email,faculty_id,faculty_name,curriculum_id,curriculum_name,role}) => {
                                        return {
                                            id: user_id,
                                            user_id: user_id,
                                            user_name: user_name,
                                            user_email: user_email,
                                            faculty_id: faculty_id,
                                            faculty_name: faculty_name,
                                            curriculum_id: curriculum_id,
                                            curriculum_name: curriculum_name,
                                            role: role,
                                        }
                                    });
                                    setRows(users);
                                }
                                await setLoading(false)
                            }}
                            inputValue={faculty.input}
                            onInputChange={(event, newInputValue) => {
                                setFaculty(faculty => ({...faculty, ...{input: newInputValue}}))
                            }}
                            options={faculty.option.map((option) => option.faculty_name)}
                            renderInput={
                                (params) =>
                                    <TextField
                                        {...params}
                                        sx={{py: '3px', '& legend': { display: 'none' }, '& fieldset': { top: 0 }, height: '56px',}}
                                    />
                            }
                            ListboxProps={{style:{maxHeight: '300px'}}}
                        />
                    </Grid>
                </Grid>*/}

                </Grid>
                <DataGrid
                    sx={{
                        flex: 8,
                        '&.MuiDataGrid-root .MuiDataGrid-cell:focus': {
                            outline: 'none',
                        },
                        width: '100%',
                    }}
                    autoHeight
                    loading={loading}
                    rows={rows}
                    columns={columns}
                    editMode="row"
                    components={{
                        LoadingOverlay: LinearProgress,
                    }}
                    componentsProps={{
                        toolbar: { setRows, setRowModesModel, rowModesModel, setDialog_insert, setDialog },
                        pagination: {
                            labelRowsPerPage: 'แสดง'
                        }
                    }}
                    disableSelectionOnClick
                    // experimentalFeatures={{ newEditingApi: true }}
                    rowsPerPageOptions={[10, 50, 100]}
                    pageSize={pageSize}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                />
                {/*<Button onClick={()=>{console.log(rows)}}>rows</Button>*/}
            </Box>
            <Dialog
                fullWidth
                open={opDialog}
                sx={{ height: '100%' }}
                onClose={() => {
                    setOpDialog(false)
                    resetDialogPvt();
                }}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-slide-description"
                maxWidth="lg"
            >
                <Grid container spacing={2} sx={{ pt: 2, pb: '20px', pl: 2, pr: 2 }}>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Typography
                            variant="subtitle1"
                            sx={{ pt: 3, pb: '20px', pl: 3, pr: 3, fontWeight: 'bold', fontSize: '22px' }}>
                            แก้ไขข้อมูล
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4} sx={{ marginLeft: '24px', marginRight: '24px' }}>
                        <Grid container direction="row">
                            <Typography variant="subtitle1">จังหวัด</Typography>
                        </Grid>
                        <Autocomplete
                            id="provinces"
                            size="small"
                            disabled={true}
                            value={search.province}
                            onChange={async (event, newValue) => {
                                if (newValue) {
                                    setSearch(search => ({ ...search, ...{ province: newValue } }))
                                    setDialogPvt((dialog) => (
                                        { ...dialog, province: newValue.province, provinceId: newValue.province_id }
                                    ));
                                }
                            }}
                            options={configData.province}
                            getOptionLabel={(option) => option.province}
                            renderInput={(params) => (
                                <TextField {...params} />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4} sx={{ marginLeft: '24px', marginRight: '24px' }}>
                        <Grid container direction="row">
                            <Typography variant="subtitle1">ปี</Typography>
                        </Grid>
                        <Autocomplete
                            id="years"
                            size="small"
                            disabled={true}
                            value={search.year}
                            onChange={async (event, newValue) => {
                                if (newValue) {
                                    setSearch(search => ({ ...search, ...{ year: newValue } }))
                                    setDialogPvt((dialog) => (
                                        { ...dialog, year: newValue }
                                    ));
                                }
                            }}
                            options={configData.year}
                            getOptionLabel={(option) => option.year}
                            renderInput={(params) => (
                                <TextField {...params} />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4} sx={{ marginLeft: '24px', marginRight: '24px' }}>
                        <Grid container direction="row">
                            <Typography variant="subtitle1">x1</Typography><Typography sx={{ color: 'red' }}>*</Typography>
                        </Grid>
                        <TextField
                            fullWidth
                            size="small"
                            value={dialogPvt.x1}
                            onChange={(e) => {
                                let newValue = e.target.value;
                                setDialogPvt((dialog) => (
                                    { ...dialog, x1: newValue }
                                ));
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4} sx={{ marginLeft: '24px', marginRight: '24px' }}>
                        <Grid container direction="row">
                            <Typography variant="subtitle1">x2</Typography><Typography sx={{ color: 'red' }}>*</Typography>
                        </Grid>
                        <TextField
                            fullWidth
                            size="small"
                            value={dialogPvt.x2}
                            onChange={(e) => {
                                let newValue = e.target.value;
                                setDialogPvt((dialog) => (
                                    { ...dialog, x2: newValue }
                                ));
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4} sx={{ marginLeft: '24px', marginRight: '24px' }}>
                        <Grid container direction="row">
                            <Typography variant="subtitle1">x3</Typography><Typography sx={{ color: 'red' }}>*</Typography>
                        </Grid>
                        <TextField
                            fullWidth
                            size="small"
                            value={dialogPvt.x3}
                            onChange={(e) => {
                                let newValue = e.target.value;
                                setDialogPvt((dialog) => (
                                    { ...dialog, x3: newValue }
                                ));
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4} sx={{ marginLeft: '24px', marginRight: '24px' }}>
                        <Grid container direction="row">
                            <Typography variant="subtitle1">x4</Typography><Typography sx={{ color: 'red' }}>*</Typography>
                        </Grid>
                        <TextField
                            fullWidth
                            size="small"
                            value={dialogPvt.x4}
                            onChange={(e) => {
                                let newValue = e.target.value;
                                setDialogPvt((dialog) => (
                                    { ...dialog, x4: newValue }
                                ));
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4} sx={{ marginLeft: '24px', marginRight: '24px' }}>
                        <Grid container direction="row">
                            <Typography variant="subtitle1">x5</Typography><Typography sx={{ color: 'red' }}>*</Typography>
                        </Grid>
                        <TextField
                            fullWidth
                            size="small"
                            value={dialogPvt.x5}
                            onChange={(e) => {
                                let newValue = e.target.value;
                                setDialogPvt((dialog) => (
                                    { ...dialog, x5: newValue }
                                ));
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4} sx={{ marginLeft: '24px', marginRight: '24px' }}>
                        <Grid container direction="row">
                            <Typography variant="subtitle1">x6</Typography><Typography sx={{ color: 'red' }}>*</Typography>
                        </Grid>
                        <TextField
                            fullWidth
                            size="small"
                            value={dialogPvt.x6}
                            onChange={(e) => {
                                let newValue = e.target.value;
                                setDialogPvt((dialog) => (
                                    { ...dialog, x6: newValue }
                                ));
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4} sx={{ marginLeft: '24px', marginRight: '24px' }}>
                        <Grid container direction="row">
                            <Typography variant="subtitle1">y</Typography><Typography sx={{ color: 'red' }}>*</Typography>
                        </Grid>
                        <TextField
                            fullWidth
                            size="small"
                            value={dialogPvt.y}
                            onChange={(e) => {
                                let newValue = e.target.value;
                                setDialogPvt((dialog) => (
                                    { ...dialog, y: newValue }
                                ));
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} sx={{ pb: '30px', pt: '40px' }} container direction="row" justifyContent="flex-end" alignItems="end">
                        <Button variant="outlined" disableElevation
                            sx={{
                                backgroundColor: '#01696A',
                                color: '#ffffff',
                                ':hover': {
                                    backgroundColor: '#163557',
                                    color: 'white',
                                },
                            }}
                            startIcon={<SaveOutlinedIcon />}
                            onClick={async () => {
                                setOpDialog(false);
                                await editData();
                                resetDialogPvt();
                            }}
                        >
                            บันทึกข้อมูล
                        </Button>
                    </Grid>
                </Grid>
            </Dialog>
        </>
    );
}