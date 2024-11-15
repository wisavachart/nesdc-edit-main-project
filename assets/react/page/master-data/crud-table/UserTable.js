import React, {Component, useState, useEffect,useRef} from 'react';
import PropTypes from 'prop-types';
import axios from "axios";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import Typography from "@mui/material/Typography";
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import CircleIcon from '@mui/icons-material/Circle';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FacultyApi from "/assets/react/api/FacultyApi";
import CurriculumApi from "/assets/react/api/CurriculumApi";
import UserApi from "/assets/react/api/UserApi";
import Icon from '@mui/material/Icon';
import TextField from '@mui/material/TextField';
import LinearProgress from '@mui/material/LinearProgress';
import Autocomplete from '@mui/material/Autocomplete';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { makeStyles } from '@mui/styles';
import {randomCreatedDate, randomTraderName, randomUpdatedDate, randomId,} from '@mui/x-data-grid-generator';
import {GridRowModes, DataGrid, GridToolbarContainer, GridActionsCellItem} from "@mui/x-data-grid";
import InputAdornment from "@mui/material/InputAdornment";
import {IconButton} from "@mui/material";
import Swal from "sweetalert2";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import Switch from "react-switch";
import LockResetIcon from '@mui/icons-material/LockReset';


const initialRows = [];
function EditToolbar(props) {
    const { setRows, setRowModesModel, rowModesModel, setDialog_insert, setDialog } = props;

    const handleClick = () => {
        setDialog(dialog=>({...dialog,...{
            mode: 'insert',
            isEmailValid:true,
            isName:true,
            isNullNewPass:true,
            isConfirmPassword:true
        }}))
        setDialog_insert(true)
    };

    const isRowModesModel = Object.keys(rowModesModel).length === 0;

    return (
        <Box width="100%" flexDirection="row" justifyContent="flex-end" display="flex" alignItems="center" sx={{mb:'10px'}}>
            <Button disabled={!isRowModesModel} color="primary" startIcon={<AddIcon />} onClick={handleClick} style={{backgroundColor: '#01696A',color:'#fff'}}>
                เพิ่มข้อมูลใหม่
            </Button>
        </Box>
    );
}

EditToolbar.propTypes = {
    setRowModesModel: PropTypes.func.isRequired,
    setRows: PropTypes.func.isRequired,
};

export default function UserTable() {
    const [rows, setRows] = useState(initialRows);
    const [rowModesModel, setRowModesModel] = useState({});
    const [pageSize, setPageSize] = useState(10);
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [loading, setLoading] = useState(true);
    const [faculty, setFaculty] = useState({
        id:null,
        value: 'ทั้งหมด',
        input:'',
        option:[{
            faculty_id: null,
            faculty_name: "ทั้งหมด",
            faculty_no: null
        }],
    });
    const [masterFaculty, setMasterFaculty] = useState([]);
    const [masterCurriculum, setMasterCurriculum] = useState([]);
    const [selectedRole, setSelectedRole] = useState({
        id:null,
        value: 'ทั้งหมด',
        input:'',
        option:[{
            faculty_id: null,
            faculty_name: "ทั้งหมด",
            faculty_no: null
        }],
    });
    const [masterRole, setMasterRole] = useState([
        { name: 'ทั้งหมด', role:''},
        { name: 'Admin', role:'ROLE_ADMIN'},
        { name: 'User', role:'ROLE_USER'},
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
        role:null,
        roleName:'',
        roleDropDownInput:null,
        roleDropDownValue:'',
        isName:false,
        newPassword:'',
        confirmPassword:'',
        isNullNewPass:false,
        isConfirmPassword:false,
    });
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showCfPassword, setShowCfPassword] = useState(false);
    const [dialogResetPassword, setDialogResetPassword] = useState(false);
    const [dlRsp, setDlRsp] = useState({
        email: '',
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
        isConfirmPassword: false,
        isNullNewPass: false,
    });
    const resetDlRsp = () => {
        setDlRsp(v => ({...v,...{
                email: '',
                oldPassword: '',
                newPassword: '',
                confirmPassword: '',
                isConfirmPassword: false,
                isNullNewPass:false,
            }}))
    };
    const resetPassword = async () => {
        await setLoading(true)
        let resetPassRes = await UserApi.resetPass(dlRsp);
        setDialogResetPassword(false)
        if (!resetPassRes.data.status) {
            Swal.fire({
                title: 'ไม่สามารถ reset password ได้',
                text:  resetPassRes.data.message,
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
        }
        if (resetPassRes.data.status) {
            Swal.fire({
                title: 'reset password สำเร็จ',
                text:  resetPassRes.data.message,
                icon: 'success',
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
        }
        let users = await UserApi.getData();
        users = users.data.map(({id, email, role, roleName, name, status}) => {
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
        setRows(users)
        resetDlRsp()
        await setLoading(false)
    }

    useEffect( () => {
        const fetchData = async () => {
            let users = await UserApi.getData();
            users = users.data.map(({id, email, role, roleName, name, status}) => {
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
            /*users = users.data.map(({user_id, user_name, user_email,faculty_id,faculty_name,curriculum_id,curriculum_name,role}) => {
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
            });*/
            // let facultyDB = await FacultyApi.getData();
            // setFaculty(faculty => ({...faculty, ...{option: [...faculty.option, ...facultyDB.data]}}))
            // setMasterFaculty(facultyDB.data)
            // let CurriculumDB = await CurriculumApi.getData();
            // setMasterCurriculum(CurriculumDB.data)
            // console.log(facultyDB.data)
            // console.log(CurriculumDB.data)
            // let DegreeDB = await CurriculumApi.getDegree();
            // setMasterDegree(DegreeDB.data)
            setRows(users);
            setLoading(false)
        }
        const result = fetchData()
            .catch(console.error);
    }, []);

    const resetDialog = (params, event) => {
        setDialog(dialog=>({...dialog,...{
                mode: null,
                email: '',
                name: '',
                password: '',
                id: null,
                role:null,
                roleName:'',
                roleDropDownInput:null,
                roleDropDownValue:'',
                newPassword:'',
                confirmPassword:'',
                isNullNewPass:false,
                isConfirmPassword:false,
            }}))
    };
    const handleChange = async (isEnabled,id) => {
        // console.log(isEnabled);
        // setChecked(event.target.checked);
        await setLoading(true)
        Swal.fire({
            title: isEnabled ? 'ยืนยันการ ปิด ใช้งาน' : 'ยืนยันการ เปิด ใช้งาน',
            text:  isEnabled ? "คุณต้องการปิดผู้ใช้งานนี้ใช่หรือไม่ ?" : "คุณต้องการเปิดผู้ใช้งานนี้ใช่หรือไม่ ?",
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'ยกเลิก',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'ตกลง'
        }).then(async (result) => {
            if (result.isConfirmed) {
                if (isEnabled){
                    await UserApi.disableData(id)
                }
                if (!isEnabled){
                    await UserApi.enableData(id)
                }
                let users = await UserApi.getData();
                users = users.data.map(({id, email, role, roleName, name, status}) => {
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
                setRows(users)
                resetDialog();
                await setLoading(false)
                /*await setLoading(true)
                await UserApi.deleteData(dialog.id)
                let users = await UserApi.getData();
                users = users.data.map(({id, email, role, roleName, name, status}) => {
                    return {
                        id: id,
                        email: email,
                        role: role,
                        roleName: roleName,
                        name: name,
                        status: status ? 'active' : 'non-active',
                    }
                });
                setRows(users);
                resetDialog();
                await setLoading(false)*/
            } else if (result.dismiss === Swal.DismissReason.cancel){
                await setLoading(false)
            }
        })
    };
    const columns = [
        { field: 'id', headerName: 'ลำดับที่' , width: 80,editable:false, renderCell: (index) => index.api.getRowIndex(index.row.id) + 1,headerClassName: 'super-app-theme--header', },
        {
            field: 'email',
            headerClassName: 'super-app-theme--header',
            headerName: 'อีเมล',
            flex: 1,
            // editable: true ,
        },
        /*{
            field: 'roleName',
            headerClassName: 'super-app-theme--header',
            headerName: 'ประเภทผู้ใช้งาน',
            flex: 1,
            // editable: true,
            type: 'singleSelect',
            // valueOptions: masterRole.map((option) => option.name),
            // valueGetter: getRoleName,
        },*/
        {
            field: 'name',
            headerClassName: 'super-app-theme--header',
            headerName: 'ชื่อ',
            flex: 1,
            // editable: true,
            type: 'singleSelect',
            // valueOptions: masterFaculty.map((option) => option.faculty_name),
            // valueGetter: getData,
        },
        {
            field: 'status',
            headerClassName: 'super-app-theme--header',
            headerName: 'สถานะ',
            flex: 1,
            // editable: true,
            type: 'singleSelect',
            // valueOptions: masterCurriculum.map((option) => option.curriculum_name),
            // valueGetter: getData,
        },
        {
            field: 'resetPassword',
            headerClassName: 'super-app-theme--header',
            type: 'actions',
            headerName: 'เปลี่ยนรหัสผ่าน',
            width: 120,
            cellClassName: 'resetPassword',
            getActions: (params) =>  [
                <GridActionsCellItem
                    icon={<LockResetIcon />}
                    label="reset"
                    color="inherit"
                    onClick={ async () => {
                        const obj = rows.find(rows => rows.id === params.id);
                        setDlRsp( v => ({
                            ...v,
                            ...{
                                email:obj.email,
                                oldPassword: '',
                                newPassword: '',
                                confirmPassword: '',
                                isConfirmPassword:true,
                                isNullNewPass:true,
                            }
                        }))
                        setDialogResetPassword(true)
                    }}
                    disabled={loading}
                />
            ]
            // editable: true,
            // valueOptions: masterCurriculum.map((option) => option.curriculum_name),
            // valueGetter: getData,
        },
        {
            field: 'actions',
            headerClassName: 'super-app-theme--header',
            type: 'actions',
            headerName: 'แก้ไข / ลบ',
            width: 150,
            cellClassName: 'actions',
            getActions: (params) =>  [
                <GridActionsCellItem
                    icon={<EditIcon />}
                    label="Edit"
                    className="textPrimary"
                    onClick={ async ()=>{
                        const foundObject = rows.find(rows => rows.id === params.id);
                        // console.log('foundObject value -------------------')
                        // console.log(foundObject);
                        /*const result = masterRole.filter((e) => {
                            return e.role === foundObject.role[0]
                        })*/
                        // console.log('result value -------------------')
                        // console.log(result)
                        const isValidEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]+$/i.test(foundObject.email);
                        setDialog(dialog=>({
                            ...dialog,
                            ...{
                                mode: 'edit',
                                email: foundObject.email,
                                name: foundObject.name,
                                id: foundObject.id,
                                role: foundObject.role[0],
                                isEmailValid: true,
                                isName: true,
                                // roleDropDownInput:result[0].name,
                                // roleDropDownValue:result[0].name,
                                // roleDropDownInput:'ROLE_ADMIN',
                                // roleDropDownValue:'ROLE_ADMIN',
                            }
                        }))
                        setDialog_insert(true)
                    }}
                    color="inherit"
                    disabled={loading}
                />,
                <>
                    {   params.id === 1 ? <></> :
                        <Switch
                            checked={ params.row.isEnabled}
                            onChange={ async () => { await handleChange(params.row.isEnabled,params.row.id)}}
                            inputProps={{ 'aria-label': 'controlled' }}
                        />
                    }
                </>
                ]
        },
    ];
    function getRoleName(params) {

        if(params.row.role === undefined){
            return '';
        }

        if(params.row.role[0] === 'ROLE_USER'){
            return 'User';
        }

        if(params.row.role[0] === 'ROLE_ADMIN'){
            return 'Admin';
        }

        if(params.row.role[0] === 'ROLE_HR'){
            return 'HR';
        }

        if(params.row.role[0] === 'ROLE_Register'){
            return 'Register';
        }

        // return params.row.role[0] === 'ROLE_USER' ? 'User' : 'Admin';
    }
    function getData(params) {
        if(params.row.role === undefined){
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
                    color:'#fff'
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
                    flex: 8 ,
                    '&.MuiDataGrid-root .MuiDataGrid-cell:focus': {
                        outline: 'none',
                    },
                    width:'100%',
                }}
                autoHeight
                loading={loading}
                rows={rows}
                columns={columns}
                editMode="row"
                components={{
                    Toolbar: EditToolbar,
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
                open={dialogResetPassword}
                sx={{ height:'100%' }}
                onClose={()=>{
                    setDialogResetPassword(false)
                    resetDlRsp()
                }}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-slide-description"
                maxWidth="lg"
            >
                <Grid container spacing={2} sx={{pt: 2,pb:'20px', pl: 2, pr: 2}}>
                    <Typography variant="subtitle1" sx={{pt: 3,pb:'20px', pl: 3, pr: 3,fontWeight: 'bold',fontSize:'22px'}}>เปลี่ยนรหัสผ่าน</Typography>
                    {/*<Grid container direction="row" spacing={2} item>
                        <Grid xs={12} sm={2} md={2} lg={2} item >
                            <Typography variant="subtitle1" sx={{paddingLeft: '24px'}} >รหัสผ่านเดิม</Typography>
                        </Grid>
                        <Grid xs={12} sm={9} md={9} lg={9} item>
                            <TextField
                                type={showOldPassword === true ? 'text' : 'password'}
                                autoComplete="new-password"
                                id="oldPassword"
                                fullWidth
                                size="small"
                                value={dlRsp.oldPassword}
                                sx={{py: '3px', '& legend': { display: 'none' }, '& fieldset': { top: 0 }, height: '56px',}}
                                onChange={(e)=>{
                                    setDlRsp(v => ({
                                        ...v,
                                        oldPassword: e.target.value,
                                    }));
                                }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={()=>{
                                                    setShowOldPassword(!showOldPassword)
                                                }}
                                                edge="end"
                                            >
                                                {showOldPassword === false ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid xs={12} sm={1} md={1} lg={1} item>
                            <Typography variant="subtitle1" sx={{color: 'red'}} >*</Typography>
                        </Grid>
                    </Grid>*/}
                    <Grid container direction="row" spacing={2} item>
                        <Grid xs={12} sm={2} md={2} lg={2} item >
                            <Typography variant="subtitle1" sx={{paddingLeft: '24px'}} >รหัสผ่านใหม่</Typography>
                        </Grid>
                        <Grid xs={12} sm={9} md={9} lg={9} item>
                            <TextField
                                type={showNewPassword === true ? 'text' : 'password'}
                                autoComplete="new-password"
                                id="newPassword"
                                fullWidth
                                error={!dlRsp.isNullNewPass}
                                helperText={!dlRsp.isNullNewPass && 'กรุณากรอกรหัสผ่าน'}
                                size="small"
                                sx={{py: '3px', '& legend': { display: 'none' }, '& fieldset': { top: 0 }, height: '56px',}}
                                value={dlRsp.newPassword}
                                onChange={(e)=>{
                                    setDlRsp(v => ({
                                        ...v,
                                        newPassword: e.target.value,
                                    }));
                                    if (e.target.value.length === 0){
                                        setDlRsp(v => ({
                                            ...v,
                                            isNullNewPass:false,
                                        }));
                                    }else {
                                        setDlRsp(v => ({
                                            ...v,
                                            isNullNewPass:true,
                                        }));
                                    }
                                    if (dlRsp.confirmPassword === e.target.value){
                                        setDlRsp(v => ({
                                            ...v,
                                            isConfirmPassword:true,
                                        }));
                                    }else {
                                        setDlRsp(v => ({
                                            ...v,
                                            isConfirmPassword:false,
                                        }));
                                    }
                                }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={()=>{
                                                    setShowNewPassword(!showNewPassword)
                                                }}
                                                edge="end"
                                            >
                                                {showNewPassword === false ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid xs={12} sm={1} md={1} lg={1} item>
                            <Typography variant="subtitle1" sx={{color: 'red'}} >*</Typography>
                        </Grid>
                    </Grid>
                    <Grid container direction="row" spacing={2} sx={{marginTop:'12px'}} item>
                        <Grid xs={12} sm={2} md={2} lg={2} item >
                            <Typography variant="subtitle1" sx={{paddingLeft: '24px'}} >ยืนยันรหัสผ่านใหม่</Typography>
                        </Grid>
                        <Grid xs={12} sm={9} md={9} lg={9} item>
                            <TextField
                                type={showCfPassword === true ? 'text' : 'password'}
                                autoComplete="new-password"
                                id="confirmPassword"
                                fullWidth
                                size="small"
                                value={dlRsp.confirmPassword}
                                error={!dlRsp.isConfirmPassword}
                                helperText={!dlRsp.isConfirmPassword && 'รหัสผ่านไม่ตรงกัน'}
                                sx={{py: '3px', '& legend': { display: 'none' }, '& fieldset': { top: 0 }, height: '56px',}}
                                onChange={(e)=>{
                                    setDlRsp(v => ({
                                        ...v,
                                        confirmPassword: e.target.value,
                                    }));
                                    if (dlRsp.newPassword === e.target.value){
                                        setDlRsp(v => ({
                                            ...v,
                                            isConfirmPassword:true,
                                        }));
                                    }else {
                                        setDlRsp(v => ({
                                            ...v,
                                            isConfirmPassword:false,
                                        }));
                                    }

                                }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={()=>{
                                                    setShowCfPassword(!showCfPassword)
                                                }}
                                                edge="end"
                                            >
                                                {showCfPassword === false ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid xs={12} sm={1} md={1} lg={1} item>
                            <Typography variant="subtitle1" sx={{color: 'red'}} >*</Typography>
                        </Grid>
                    </Grid>
                    <Grid xs={12} sm={12} md={12} lg={12}  item container direction="row" justifyContent="flex-end" alignItems="flex-end">
                        <Button
                            // disabled={!dlRsp.isConfirmPassword}
                            sx={{
                                backgroundColor: '#01696A',
                                color: '#ffffff',
                                ':hover': {
                                    backgroundColor: '#163557',
                                    color: 'white',
                                },
                            }}
                            startIcon={<SaveOutlinedIcon />}
                            onClick={ async () => {
                                if (dlRsp.newPassword.length > 0 && dlRsp.isNullNewPass) {
                                    if (dlRsp.isConfirmPassword) {
                                        if (dlRsp.newPassword === dlRsp.confirmPassword){
                                            await resetPassword();
                                        }
                                    }
                                }else {
                                    setDlRsp(v => ({
                                        ...v,
                                        isNullNewPass:false,
                                    }));
                                }
                            }}
                        >
                            บันทึกข้อมูล
                        </Button>
                    </Grid>
                </Grid>
            </Dialog>
            <Dialog
                // scroll="body"
                fullWidth
                open={dialog_insert}
                sx={{ height:'100%' }}
                onClose={()=>{
                    setDialog_insert(false)
                    resetDialog();
                }}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-slide-description"
                maxWidth="lg"
                // keepMounted
            >
                {/*<DialogTitle id="alert-dialog-title">เพิ่มข้อมูลผู้ใช้</DialogTitle>*/}
                {/*<Grid container direction="column" alignItems="center" justifyContent="center" sx={{pt: '8px',}}>*/}
                {/*    <Grid container sx={{pt:'0px'}} direction="row" alignItems="center" justifyContent="space-evenly">*/}
                <Grid container spacing={2} sx={{pt: 2,pb:'20px', pl: 2, pr: 2}}>
                    <Typography variant="subtitle1" sx={{pt: 3,pb:'20px', pl: 3, pr: 3,fontWeight: 'bold',fontSize:'22px'}}>{dialog.mode === 'insert' ? 'เพิ่มข้อมูลผู้ใช้' : dialog.mode === 'edit' ? 'แก้ไขข้อมูล' : 'ยืนยืนการลบข้อมูล' }</Typography>
                    <Grid container spacing={2} item>
                        {dialog.mode === 'insert' ||   dialog.mode === 'edit' ?
                            <>
                                <Grid xs={12} sm={6} md={6} lg={6} item>
                                    <Grid container direction="row">
                                        <Typography variant="subtitle1">ชื่อผู้ใช้</Typography><Typography sx={{color: 'red'}}>*</Typography>
                                    </Grid>
                                    <TextField
                                        type="text"
                                        fullWidth
                                        size="small"
                                        // id="_txt"
                                        error={!dialog.isName}
                                        helperText={!dialog.isName && 'กรุณาใส่ชื่อ'}
                                        value={dialog.name}
                                        onChange={(e)=>{
                                            setDialog(dialog=>({...dialog,...{name: e.target.value}}))
                                            if (e.target.value.length === 0){
                                                setDialog(dialog=>({...dialog,...{isName:false}}))
                                            }else {
                                                setDialog(dialog=>({...dialog,...{isName:true}}))
                                            }
                                        }}
                                        sx={{py: '3px', '& legend': { display: 'none' }, '& fieldset': { top: 0 }, height: '56px',}}
                                    />
                                </Grid>
                                <Grid xs={12} sm={6} md={6} lg={6} item>
                                    <Grid container direction="row">
                                        <Typography variant="subtitle1">อีเมล</Typography><Typography sx={{color: 'red'}}>*</Typography>
                                    </Grid>
                                    {/* <TextField
                                        type="email"
                                        fullWidth
                                        size="small"
                                        // id="_txt"
                                        value={dialog.user_email}
                                        // error={}
                                        onChange={(e)=>{
                                            setDialog(dialog=>({...dialog,...{user_email: e.target.value}}))
                                        }}
                                        sx={{py: '3px', '& legend': { display: 'none' }, '& fieldset': { top: 0 }, height: '56px',}}
                                    /> */}
                                    {/* <TextField
                                    fullWidth
                                    size="small"
                                    value={dialog.user_email}
                                    onChange={(e) => {
                                        const email = e.target.value;
                                        const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
                                        setDialog((dialog) => ({ ...dialog, user_email: email, isEmailValid: isValidEmail }));
                                    }}
                                    error={!dialog.isEmailValid}
                                    helperText={!dialog.isEmailValid && 'กรุณาใส่อีเมลที่ถูกต้อง'}
                                    sx={{
                                        py: '3px',
                                        '& legend': { display: 'none' },
                                        '& fieldset': { top: 0 },
                                        height: '56px',
                                    }}
                                    /> */}
                                    <TextField
                                        fullWidth
                                        size="small"
                                        value={dialog.email}
                                        onChange={(e) => {
                                            const email = e.target.value;
                                            const isValidEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]+$/i.test(email);
                                            setDialog((dialog) => ({ ...dialog, email: email, isEmailValid: isValidEmail }));
                                        }}
                                        error={!dialog.isEmailValid}
                                        helperText={!dialog.isEmailValid && 'กรุณาใส่อีเมลที่ถูกต้อง'}
                                        sx={{
                                            py: '3px',
                                            '& legend': { display: 'none' },
                                            '& fieldset': { top: 0 },
                                            height: '56px',
                                        }}
                                        />
                                </Grid>
                            </> : <></>
                        }
                        {dialog.mode === 'insert' ?
                            <>
                                <Grid xs={12} sm={6} md={6} lg={6} sx={{marginTop:"9px"}} item>
                                    <Grid container direction="row">
                                        <Typography variant="subtitle1">รหัสผ่าน</Typography><Typography sx={{color: 'red'}}>*</Typography>
                                    </Grid>
                                    <TextField
                                        type={showNewPassword === true ? 'text' : 'password'}
                                        autoComplete="new-password"
                                        id="newPassword"
                                        fullWidth
                                        error={!dialog.isNullNewPass}
                                        helperText={!dialog.isNullNewPass && 'กรุณากรอกรหัสผ่าน'}
                                        size="small"
                                        sx={{py: '3px', '& legend': { display: 'none' }, '& fieldset': { top: 0 }, height: '56px',}}
                                        value={dialog.newPassword}
                                        onChange={(e)=>{
                                            setDialog(v => ({
                                                ...v,
                                                newPassword: e.target.value,
                                            }));
                                            if (e.target.value.length === 0){
                                                setDialog(v => ({
                                                    ...v,
                                                    isNullNewPass:false,
                                                }));
                                            }else {
                                                setDialog(v => ({
                                                    ...v,
                                                    isNullNewPass:true,
                                                }));
                                            }
                                            if (dialog.confirmPassword === e.target.value){
                                                setDialog(v => ({
                                                    ...v,
                                                    isConfirmPassword:true,
                                                }));
                                            }else {
                                                setDialog(v => ({
                                                    ...v,
                                                    isConfirmPassword:false,
                                                }));
                                            }
                                        }}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={()=>{
                                                            setShowNewPassword(!showNewPassword)
                                                        }}
                                                        edge="end"
                                                    >
                                                        {showNewPassword === false ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Grid>
                                <Grid xs={12} sm={6} md={6} lg={6} sx={{marginTop:"9px"}} item>
                                    <Grid container direction="row">
                                        <Typography variant="subtitle1">ยืนยันรหัสผ่าน</Typography><Typography sx={{color: 'red'}}>*</Typography>
                                    </Grid>
                                    <TextField
                                        type={showCfPassword === true ? 'text' : 'password'}
                                        autoComplete="new-password"
                                        id="confirmPassword"
                                        fullWidth
                                        size="small"
                                        value={dialog.confirmPassword}
                                        error={!dialog.isConfirmPassword}
                                        helperText={!dialog.isConfirmPassword && 'รหัสผ่านไม่ตรงกัน'}
                                        sx={{py: '3px', '& legend': { display: 'none' }, '& fieldset': { top: 0 }, height: '56px',}}
                                        onChange={(e)=>{
                                            setDialog(v => ({
                                                ...v,
                                                confirmPassword: e.target.value,
                                            }));
                                            if (dialog.newPassword === e.target.value){
                                                setDialog(v => ({
                                                    ...v,
                                                    isConfirmPassword:true,
                                                }));
                                            }else {
                                                setDialog(v => ({
                                                    ...v,
                                                    isConfirmPassword:false,
                                                }));
                                            }

                                        }}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={()=>{
                                                            setShowCfPassword(!showCfPassword)
                                                        }}
                                                        edge="end"
                                                    >
                                                        {showCfPassword === false ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Grid>
                            </> : <></>
                        }
                        {
                            dialog.mode === 'delete'
                                ?
                                <>
                                    <Grid container direction="row" item sx={{ mx:6 }}>
                                        <Grid xs={12} item >
                                            <Typography sx={{fontWeight: 'bold',fontSize:'18px',pb:'10px'}}>คุณต้องการลบผู้ใช้งานนี้หรือไม่</Typography>
                                        </Grid>
                                        <Grid container direction="row" xs={12} sx={{ mb:1 }} item>
                                            <Grid sx={{ fontWeight: 'bold', mp: 1 }} xs={3} sm={3} md={2} lg={2} item>ชื่อผู้ใช้งาน : </Grid>
                                            <Grid>{dialog.name}</Grid>
                                        </Grid>
                                        <Grid container direction="row" xs={12} sx={{ mb:1 }} item>
                                            <Grid sx={{ fontWeight: 'bold', mp: 1 }} xs={3} sm={3} md={2} lg={2} item>อีเมล : </Grid>
                                            <Grid>{dialog.email}</Grid>
                                        </Grid>

                                        {/*{dialog.role == 'ROLE_USER' && (
                                            <>
                                                <Grid container direction="row" xs={12} sx={{ mb: 1 }} item>
                                                    <Grid sx={{ fontWeight: 'bold', mp: 1 }} xs={3} sm={3} md={2} lg={2} item>สังกัด : </Grid>
                                                    <Grid>{dialog.faculty}</Grid>
                                                </Grid>
                                                <Grid container direction="row" xs={12} sx={{ mb: 1 }} item>
                                                    <Grid sx={{ fontWeight: 'bold', mp: 1 }} xs={3} sm={3} md={2} lg={2} item>ชื่อหลักสูตร : </Grid>
                                                    <Grid>{dialog.curriculum}</Grid>
                                                </Grid>
                                            </>
                                        )}*/}

                                    </Grid>

                                </>
                                :
                                <>
                                </>
                        }
                        <Grid xs={12} sm={12} md={12} lg={12} sx={{pb:'30px',pt:'40px'}} item container direction="row" justifyContent="flex-end" alignItems="end">
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
                                onClick={ async ()=>{
                                    await setLoading(true)
                                    if (dialog.mode === 'insert'){
                                        console.log("mode insert");
                                        console.log(dialog);
                                        if (dialog.email.length > 0 && dialog.isEmailValid &&
                                            dialog.name.length > 0 && dialog.isName &&
                                            dialog.newPassword.length > 0 && dialog.isNullNewPass &&
                                            dialog.confirmPassword.length > 0 && dialog.isConfirmPassword
                                        ){
                                            let data = {
                                                email: dialog.email,
                                                name: dialog.name,
                                                password : dialog.confirmPassword,
                                                // roles: Array.isArray(dialog.role) ? dialog.role : [dialog.role],
                                                roles: 'ROLE_ADMIN',
                                            }
                                            await UserApi.insertData(data);
                                            let users = await UserApi.getData();
                                            users = users.data.map(({id, email, role, roleName, name, status}) => {
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
                                            setRows(users)
                                            setDialog_insert(false);
                                            resetDialog();
                                        }else {
                                            if (dialog.email.length === 0) setDialog((d) => ({ ...d, isEmailValid: false }));
                                            if (dialog.name.length === 0) setDialog((d) => ({ ...d, isName: false }));
                                            if (dialog.newPassword.length === 0) setDialog((d) => ({ ...d, isNullNewPass: false }));
                                            if (dialog.confirmPassword.length === 0) setDialog((d) => ({ ...d, isConfirmPassword: false }));
                                        }
                                        /*console.log('mode insert')
                                        if (dialog.role==='ROLE_ADMIN' && (!dialog.email || !dialog.email)) {
                                            alert('กรุณากรอกข้อมูลให้ครบถ้วน !')
                                        } else if (dialog.role==='ROLE_USER' && (!dialog.email || !dialog.email || !dialog.role)) {
                                            alert('กรุณากรอกข้อมูลให้ครบถ้วน !')
                                        }
                                       /!* else if (!dialog.role){
                                            alert('กรุณากรอกข้อมูลให้ครบถ้วน !')
                                        } *!/
                                        else if(!dialog.isEmailValid) {
                                            alert('กรุณากรอกอีเมลให้ถูกต้อง !')
                                        }
                                        else {
                                            let data = {
                                                email: dialog.email,
                                                name: dialog.name,
                                                password : '12345',
                                                // roles: Array.isArray(dialog.role) ? dialog.role : [dialog.role],
                                                roles: 'ROLE_ADMIN',
                                            }

                                            await UserApi.insertData(data);
                                            let users = await UserApi.getData();
                                            users = users.data.map(({id, email, role, roleName, name, status}) => {
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
                                            setRows(users)
                                            setDialog_insert(false);
                                            resetDialog();
                                        }*/
                                    } else if (dialog.mode === 'delete'){
                                        console.log('mode delete')
                                        setDialog_insert(false);
                                        await setLoading(true)
                                        console.log(dialog);
                                        await UserApi.disableData(dialog.id)
                                        let users = await UserApi.getData();
                                        users = users.data.map(({id, email, role, roleName, name, status}) => {
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
                                        setRows(users);
                                        resetDialog();
                                        await setLoading(false)

                                        /*Swal.fire({
                                            title: 'ยืนยันการลบ',
                                            text: "คุณต้องการลบชื่อผู้ใช้งานนี้ใช่หรือไม่ ?",
                                            icon: 'warning',
                                            showCancelButton: true,
                                            cancelButtonText: 'ยกเลิก',
                                            confirmButtonColor: '#3085d6',
                                            cancelButtonColor: '#d33',
                                            confirmButtonText: 'ตกลง'
                                        }).then(async (result) => {
                                            if (result.isConfirmed) {
                                                await setLoading(true)
                                                console.log(dialog);
                                                await UserApi.deleteData(dialog.id)
                                                let users = await UserApi.getData();
                                                users = users.data.map(({id, email, role, roleName, name, status}) => {
                                                    return {
                                                        id: id,
                                                        email: email,
                                                        role: role,
                                                        roleName: roleName,
                                                        name: name,
                                                        status: status ? 'active' : 'non-active',
                                                    }
                                                });
                                                // users = users.data.map(({user_id, user_name, user_email,faculty_id,faculty_name,curriculum_id,curriculum_name,role}) => {
                                                //     return {
                                                //         id: user_id,
                                                //         user_id: user_id,
                                                //         user_name: user_name,
                                                //         user_email: user_email,
                                                //         faculty_id: faculty_id,
                                                //         faculty_name: faculty_name,
                                                //         curriculum_id: curriculum_id,
                                                //         curriculum_name: curriculum_name,
                                                //         role: role,
                                                //     }
                                                // });
                                                setRows(users);
                                                resetDialog();
                                                await setLoading(false)
                                            } else if (result.dismiss === Swal.DismissReason.cancel){

                                            }
                                        })*/
                                    } else if (dialog.mode === 'edit'){
                                        console.log('mode edit')
                                        console.log(dialog);
                                        if (dialog.email.length > 0 && dialog.name.length > 0){
                                            let data = {
                                                id: dialog.id,
                                                email: dialog.email,
                                                name: dialog.name,
                                                password: dialog.password,
                                                // roles: Array.isArray(dialog.role) ? dialog.role : [dialog.role],
                                            }
                                            await UserApi.updateData(data)
                                            let users = await UserApi.getData();
                                            users = users.data.map(({id, email, role, roleName, name, status}) => {
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
                                            setRows(users)
                                            setDialog_insert(false);
                                            resetDialog();
                                        }else {
                                            if (dialog.email.length === 0) setDialog((d) => ({ ...d, isEmailValid: false }));
                                            if (dialog.name.length === 0) setDialog((d) => ({ ...d, isName: false }));
                                        }
                                        /*if (!dialog.email || !dialog.name || !dialog.role){
                                            console.log('1');
                                            alert('กรุณากรอกข้อมูลให้ครบถ้วน')
                                        } else if(!dialog.isEmailValid) {
                                            console.log('2');
                                            alert('กรุณากรอกอีเมลให้ถูกต้อง !')
                                        } else {
                                            let data = {
                                                id: dialog.id,
                                                email: dialog.email,
                                                name: dialog.name,
                                                password: dialog.password,
                                                // roles: Array.isArray(dialog.role) ? dialog.role : [dialog.role],
                                            }
                                            console.log('data - - -- - - - - -');
                                            console.log(data);
                                            await UserApi.updateData(data)
                                            let users = await UserApi.getData();
                                            users = users.data.map(({id, email, role, roleName, name, status}) => {
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
                                            setRows(users)
                                            setDialog_insert(false);
                                            resetDialog();
                                        }*/
                                    }
                                    await setLoading(false)
                                }}
                            >
                                {dialog.mode === 'insert' ? 'บันทึกข้อมูล' : dialog.mode === 'edit' ? 'แก้ไขข้อมูล' : 'ลบข้อมูล'}
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Dialog>
        </>
    );
}