import React, { Component, useState, useEffect, useRef, useContext } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import Typography from "@mui/material/Typography";
import TextField from '@mui/material/TextField';
import LinearProgress from '@mui/material/LinearProgress';
import Autocomplete from '@mui/material/Autocomplete';
import Dialog from '@mui/material/Dialog';
import { GridRowModes, DataGrid, GridToolbarContainer, GridActionsCellItem } from "@mui/x-data-grid";
import Swal from "sweetalert2";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import Switch from "react-switch";
import KuPovertyRatioApi from "/assets/react/api/KuPovertyRatioApi";
import { AuthContext } from '/assets/react-app';
import UserApi from "../../../api/UserApi";
import MasterDataApi from "../../../api/MasterDataApi";
import FileDownload from "js-file-download";

const initialRows = [];
function EditToolbar(props) {
    const { auth, setAuth, identity, setIdentity } = useContext(AuthContext);
    const { setRows, setRowModesModel, rowModesModel, setDialog_insert, setDialog } = props;
    const handleClick = () => {
        setDialog(dialog => ({ ...dialog, ...{ mode: 'insert' } }))
        setDialog_insert(true)
    };
    const isRowModesModel = Object.keys(rowModesModel).length === 0;
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
        event.target.value = null;
    };
    const handleUpload = async () => {
        setLoading(true)
        const formData = new FormData();
        formData.append("files", file);
        formData.append("email", identity.email);
        try {
            let res = await KuPovertyRatioApi.importPoverty(formData);
            setFile(null);
            if (res.data.length > 0) {
                let userElements = res.data.map(function(msg) {
                    return msg + "<br>";
                });
                Swal.fire({
                    title: 'ไม่สามารถ import ได้',
                    html: userElements.join(""),
                    icon: 'error',
                    showConfirmButton: false,
                }).then(() => {
                    // sea().then(r => {});
                })
            }else{
                Swal.fire({
                    title: 'Running Success',
                    icon: 'success',
                    showConfirmButton: false,
                }).then(() => {
                    // searchData().then(r => {});
                })
            }
        } catch (error) {
            console.error(error);
        }
        setLoading(false)
    };
    const downloadTemplate = async () => {
        let template = await MasterDataApi.downloadExcel('poverty');
        FileDownload(template.data,'poverty_template.xlsx');
    }

    return (
        <Box width="100%" flexDirection="row" justifyContent="flex-end" display="flex" alignItems="center" sx={{ mb: '10px' }}>
            {/* <Button disabled={!isRowModesModel} color="primary" startIcon={<AddIcon />} onClick={handleClick} style={{ backgroundColor: '#01696A', color: '#fff', marginRight: '10px' }}>
                Import
            </Button> */}
            <input
                type="file"
                hidden
                onChange={handleFileChange}
                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                id="contained-button-file"
            />
            <label htmlFor="contained-button-file">
                <Button variant="contained" color="primary" component="span" sx={{ marginLeft: "5px" }}>
                    Import
                </Button>
            </label>
            <Button
                variant="contained"
                color="secondary"
                onClick={handleUpload}
                disabled={!file}
                sx={{ marginLeft: "5px", marginRight: "5px" }}
            >
                Submit
            </Button>
            <Button
                variant="contained"
                size="small"
                onClick={async () => {
                    await downloadTemplate();
                }}
            >
                ดาวน์โหลดต้นแบบ
            </Button>
        </Box>
    );
}

EditToolbar.propTypes = {
    setRowModesModel: PropTypes.func.isRequired,
    setRows: PropTypes.func.isRequired,
};

export default function PovertyTable() {
    const { identity } = useContext(AuthContext);
    const [rows, setRows] = useState(initialRows);
    const [rowModesModel, setRowModesModel] = useState({});
    const [pageSize, setPageSize] = useState(10);
    const [loading, setLoading] = useState(true);
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
        const resultMaster = getMaster()
            .catch(console.error);
        const result = fetchData().catch(console.error);
        console.log(configData);
    }, []);
    const fetchData = async (data=[]) => {
        let povertyRatio = await KuPovertyRatioApi.getDataByProvinceAndYear(data);
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
            , enabled, d
        }) => {
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
        setLoading(false)
    }
    const [configData, setConfigData] = useState({
        max: 10,
        min: 1,
        province: [],
        year: []
    });
    const [search, setSearch] = useState({
        province: {
            provinceId: null,
            province: 'ทั้งหมด',
            d: null
        },
        year: {
            year: 'ทั้งหมด'
        }
    })
    const [form, setForm] = useState({
        province: {
            provinceId: null,
            province: '',
            d: null
        },
        year: {
            year: ''
        }
    })
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
        let data2 = {
            provinceId: search.province ? search.province.province_id : null,
            yearFrom: search.year ? search.year.year : null,
            province: search.province ? search.province.province : null,
            d: search.province ? search.province.d : null
        }
        await fetchData(data2);
        await setLoading(false);
    }
    const resetDialog = () => {
        setDialog(dialog => ({
            ...dialog, ...{
                mode: null,
                email: '',
                name: '',
                password: '',
                id: null,
                role: null,
                roleName: '',
                roleDropDownInput: null,
                roleDropDownValue: '',
            }
        }))
    };
    const handleChange = async (isEnabled, id) => {
        Swal.fire({
            title: isEnabled ? 'ยืนยันการ ปิด ใช้งาน' : 'ยืนยันการ เปิด ใช้งาน',
            text:  isEnabled ? "คุณต้องการปิดใช้งานข้อมูลนี้ใช่หรือไม่ ?" : "คุณต้องการเปิดใช้งานข้อมูลนี้ใช่หรือไม่ ?",
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'ยกเลิก',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'ตกลง'
        }).then(async (result) => {
            if (result.isConfirmed) {
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
            } else if (result.dismiss === Swal.DismissReason.cancel){
                await setLoading(false)
            }
        })
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
    function formatNumber(params) {
        return Number(params.value).toFixed(4).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    }
    function formatNumber2(params) {
        return Number(params.value).toFixed(0).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    }
    const columns = [
        //{ field: 'id', headerName: 'ลำดับที่' , width: 80,editable:false, renderCell: (index) => index.api.getRowIndex(index.row.id) + 1,headerClassName: 'super-app-theme--header', },
        {
            field: 'province',
            headerClassName: 'super-app-theme--header',
            headerName: 'จังหวัด',
            flex: 1,
            align: 'center',
            headerAlign: 'center',
        },
        {
            field: 'year',
            headerClassName: 'super-app-theme--header',
            headerName: 'ปี',
            flex: 1,
            align: 'center',
            headerAlign: 'center',
        },
        {
            field: 'y',
            headerClassName: 'super-app-theme--header',
            headerName: 'สัดส่วนความยากจน',
            flex: 2,
            align: 'center',
            headerAlign: 'center',
            valueFormatter: formatNumber,
        },
        {
            field: 'x1',
            headerClassName: 'super-app-theme--header',
            headerName: 'สัดส่วนวัยแรงงาน (15-59 ปี)',
            flex: 2,
            align: 'center',
            headerAlign: 'center',
            valueFormatter: formatNumber,
        },
        {
            field: 'x2',
            headerClassName: 'super-app-theme--header',
            headerName: 'สัดส่วนวัยสูงอายุ (60 ปีขึ้นไป)',
            flex: 2,
            align: 'center',
            headerAlign: 'center',
            valueFormatter: formatNumber,
        },
        {
            field: 'x3',
            headerClassName: 'super-app-theme--header',
            headerName: 'จำนวนคนต่างด้าว',
            flex: 2,
            align: 'center',
            headerAlign: 'center',
            valueFormatter: formatNumber2,
        },
        {
            field: 'x4',
            headerClassName: 'super-app-theme--header',
            headerName: 'จำนวนรวมรับแจ้งคดียาเสพติด',
            flex: 2,
            align: 'center',
            headerAlign: 'center',
            valueFormatter: formatNumber2,
        },
        {
            field: 'x5',
            headerClassName: 'super-app-theme--header',
            headerName: 'จำนวนรับแจ้งคดีความ',
            flex: 2,
            align: 'center',
            headerAlign: 'center',
            valueFormatter: formatNumber2,
        },
        {
            field: 'x6',
            headerClassName: 'super-app-theme--header',
            headerName: 'จำนวนแพทย์',
            flex: 2,
            align: 'center',
            headerAlign: 'center',
            valueFormatter: formatNumber2,
        },
        {
            field: 'actions',
            headerClassName: 'super-app-theme--header',
            type: 'actions',
            headerName: 'แก้ไข / ลบ',
            width: 150,
            cellClassName: 'actions',
            getActions: (params) => [
                <GridActionsCellItem
                    icon={<EditIcon />}
                    label="Edit"
                    className="textPrimary"
                    onClick={async () => {
                        const obj = rows.find(rows => rows.id === params.id);
                        if (obj.enabled) {
                            setDialogPvt(dialog => ({
                                ...dialog,
                                ...{
                                    id: obj.id,
                                    province: obj.province,
                                    provinceId: obj.provinceId,
                                    x1: obj.x1,
                                    x2: obj.x2,
                                    x3: obj.x3,
                                    x4: obj.x4,
                                    x5: obj.x5,
                                    x6: obj.x6,
                                    y: obj.y,
                                    year: obj.year,
                                    d: obj.d
                                }
                            }))
                            let newProvince = {
                                provinceId: obj.provinceId,
                                province: obj.province,
                                d: 1
                            }

                            setForm(form => ({ ...form, ...{ province: newProvince }, ...{ year: {
                                        year: obj.year
                                    }} }))
                            setOpDialog(true)
                        }
                    }}
                    color="inherit"
                    disabled={loading}
                />,
                <Switch
                    checked={params.row.enabled}
                    onChange={
                        async () => { await handleChange(params.row.enabled, params.row.id) }
                    }
                    inputProps={{ 'aria-label': 'controlled' }}
                />
            ]
        }
        // {
        //     field: 'actions',
        //     headerClassName: 'super-app-theme--header',
        //     type: 'actions',
        //     headerName: 'แก้ไข / ลบ',
        //     width: 150,
        //     cellClassName: 'actions',
        //     getActions: (params) => [
        //         <GridActionsCellItem
        //             icon={<EditIcon />}
        //             label="Edit"
        //             className="textPrimary"
        //             onClick={async () => {
        //                 const foundObject = rows.find(rows => rows.id === params.id);
        //                 // console.log('111111')
        //                 // console.log(params.row.status)
        //                 console.log('foundObject value -------------------')
        //                 console.log(foundObject);
        //                 const result = masterRole.filter((e) => {
        //                     return e.role === foundObject.role[0]
        //                 })
        //                 console.log('result value -------------------')
        //                 console.log(result)
        //                 const isValidEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]+$/i.test(foundObject.email);
        //                 setDialog(dialog => ({
        //                     ...dialog,
        //                     ...{
        //                         mode: 'edit',
        //                         email: foundObject.email,
        //                         name: foundObject.name,
        //                         id: foundObject.id,
        //                         role: foundObject.role[0],
        //                         isEmailValid: isValidEmail,
        //                         roleDropDownInput: result[0].name,
        //                         roleDropDownValue: result[0].name,
        //                     }
        //                 }))
        //                 setDialog_insert(true)
        //             }}
        //             color="inherit"
        //             disabled={loading}
        //         />
        //     ]
        // },
    ];

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
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4} lg={4} >
                    <Grid container direction="row">
                        <Typography variant="subtitle1">จังหวัด</Typography>
                    </Grid>
                    <Autocomplete
                        id="provinces"
                        size="small"
                        value={search.province}
                        onChange={async (event, newValue) => {
                            let data = {
                                provinceId: newValue ? newValue.province_id: null,
                                yearFrom: search.year ? search.year.year : null,
                                province: newValue ? newValue.province : null,
                                d: newValue ? newValue.d : null
                            }
                            // if (newValue) {
                                setSearch(search => ({ ...search, ...{ province: newValue } }))
                            setLoading(true);
                                const result = fetchData(data)
                            setLoading(false);
                            // }
                        }}
                        options={configData.province}
                        getOptionLabel={(option) => option.province}
                        renderInput={(params) => (
                            <TextField {...params} />
                        )}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4} >
                    <Grid container direction="row">
                        <Typography variant="subtitle1">ปี</Typography>
                    </Grid>
                    <Autocomplete
                        id="years"
                        size="small"
                        value={search.year}
                        onChange={async (event, newValue) => {
                            // if (newValue) {
                                setLoading(true);
                                setSearch(search => ({ ...search, ...{ year: newValue } }))
                                let data = {
                                    provinceId: search.province ? search.province.province_id : null,
                                    yearFrom: newValue ? newValue.year : null,
                                    province: search.province ? search.province.province : null,
                                    d: search.province ? search.province.d : null
                                }
                                const result = fetchData(data)
                                setLoading(false);
                            // }
                        }}
                        options={configData.year}
                        getOptionLabel={(option) => option.year}
                        renderInput={(params) => (
                            <TextField {...params} />
                        )}
                    />
                </Grid>
            </Grid>
                <DataGrid
                    sx={{
                        flex: 8,
                        '&.MuiDataGrid-root .MuiDataGrid-cell:focus': {
                            outline: 'none',
                        },
                        width: '100%'
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
                    rowsPerPageOptions={[10, 50, 100]}
                    pageSize={pageSize}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                />
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
                            value={form.province}
                            onChange={async (event, newValue) => {
                                if (newValue) {
                                    setForm(form => ({ ...form, ...{ province: newValue } }))
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
                            value={form.year}
                            onChange={async (event, newValue) => {
                                if (newValue) {
                                    setForm(search => ({ ...form, ...{ year: newValue } }))
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
                            <Typography variant="subtitle1">สัดส่วนคนจน (y)</Typography><Typography sx={{ color: 'red' }}>*</Typography>
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
                    <Grid item xs={12} sm={6} md={4} lg={4} sx={{ marginLeft: '24px', marginRight: '24px' }}>
                        <Grid container direction="row">
                            <Typography variant="subtitle1">สัดส่วนวัยแรงงาน (x1)</Typography><Typography sx={{ color: 'red' }}>*</Typography>
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
                            <Typography variant="subtitle1">สัดส่วนวัยสูงอายุ (60 ปีขึ้นไป) (x2)</Typography><Typography sx={{ color: 'red' }}>*</Typography>
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
                            <Typography variant="subtitle1">จำนวนคนต่างด้าว (x3)</Typography><Typography sx={{ color: 'red' }}>*</Typography>
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
                            <Typography variant="subtitle1">จำนวนรวมรับแจ้งคดียาเสพติด (x4)</Typography><Typography sx={{ color: 'red' }}>*</Typography>
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
                            <Typography variant="subtitle1">จำนวนรับแจ้งคดีความ (x5)</Typography><Typography sx={{ color: 'red' }}>*</Typography>
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
                            <Typography variant="subtitle1">จำนวนแพทย์ (x6)</Typography><Typography sx={{ color: 'red' }}>*</Typography>
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
                    <Grid xs={12} sm={12} md={12} lg={12} sx={{ pb: '30px', pt: '40px' }} item container direction="row" justifyContent="flex-end" alignItems="end">
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