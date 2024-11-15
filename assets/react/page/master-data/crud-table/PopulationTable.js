import React, {useContext, useEffect, useState} from 'react';
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {AuthContext} from "../../../../react-app";
import MasterDataApi from "../../../api/MasterDataApi";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import PopulationApi from "../../../api/PopulationApi";
import FileDownload from "js-file-download";
import Box from "@mui/material/Box";
import KuPovertyRatioApi from "../../../api/KuPovertyRatioApi";
import Swal from "sweetalert2";
import {DataGrid, GridActionsCellItem} from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import Switch from "react-switch";
import LinearProgress from "@mui/material/LinearProgress";
import PropTypes from "prop-types";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import Dialog from "@mui/material/Dialog";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";

function editToolbar(props) {
    const { rowModesModel, setDialogInsert, setDialog } = props;
}

editToolbar.propTypes = {
    setRowModesModel: PropTypes.func.isRequired,
    setRows: PropTypes.func.isRequired,
};

export default function PopulationTable() {
    const { identity } = useContext(AuthContext);
    const [loadBd, setLoadBd] = useState(false)
    const [province, setProvince] = useState([{
        id: 0,
        value: 'ทั้งหมด',
        d: 0
    }]);
    const [year, setYear] = useState([{
        id: 0,
        value: 'ทั้งหมด',
    }]);
    const [search, setSearch] = useState({
        provinceId: 0,
        year: 0
    })
    const [file, setFile] = useState(null);

    useEffect(  () => {
        setLoading(true);
        getProvince()
            .then(r => {
                setProvince(() => {
                    return r.data.province.map(({ provinceId, provinceName,d}) => {
                        return {
                            id: provinceId,
                            value: provinceName,
                            d: d
                        }
                    });
                })
            })
            .catch(error => {
                console.error("An error occurred:", error);
            });

        getYear().then(r => {
            setYear(() => {
                return r.data.year.map(({yearId, yearName}) => {
                    return {
                        id : yearId,
                        value : yearName
                    }
                })
            })
        })

        searchPopulation().then(r => {});
        setLoading(false);

    },[]);

    const getProvince = async () => {
        return await PopulationApi.getProvince();
    }

    const getYear = async () => {
        return await PopulationApi.getYear();
    }

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
        event.target.value = null;
    };

    const handleUpload = async () => {
        setLoadBd(true) ;
        const formData = new FormData();
        formData.append("files", file);
        formData.append("email", identity.email);
        try {
            let res = await PopulationApi.import(formData);
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
                    searchPopulation().then(r => {});
                })
            }else {
                Swal.fire({
                    title: 'Running Success',
                    icon: 'success',
                    showConfirmButton: false,
                }).then(() => {
                    searchPopulation().then(r => {});
                })
            }
        } catch (error) {
            console.error(error);
            setFile(null);
        }
        setLoadBd(false) ;
    };

    const downloadTemplate = async () => {
        let template = await MasterDataApi.downloadExcel('population');
        FileDownload(template.data,'population_template.xlsx');
    }

    const [rows, setRows] = useState([]);
    const [rowModesModel, setRowModesModel] = useState({});
    const [dialog_insert, setDialogInsert] = useState(false);
    const [dialog, setDialog] = useState({});
    const [loading, setLoading] = useState(true);
    const [pageSize, setPageSize] = useState(10);
    const searchPopulation = async () => {
        let val = await PopulationApi.search(search)
        setRows(val.data);
    }
    const isEnabledHandleChange = async (isEnabled, id) => {
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
            setLoading(true);
            if (result.isConfirmed) {
                await PopulationApi.setIsEnabled({isEnabled:isEnabled,id:id,email:identity.email});
                await searchPopulation();
            } else if (result.dismiss === Swal.DismissReason.cancel){
            }
            await setLoading(false)
        });
    }
    function formatNumber(params) {
        return params.value.toFixed(4).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    }
    const columns = [
        //{ field: 'id', headerName: 'ลำดับที่' , width: 80,editable:false, renderCell: (index) => index.api.getRowIndex(index.row.id) + 1,headerClassName: 'super-app-theme--header', },
        {
            field: 'provinceName',
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
            field: 'value',
            headerClassName: 'super-app-theme--header',
            headerName: 'ค่าข้อมูล',
            flex: 1,
            align: 'center',
            headerAlign: 'center',
            valueFormatter: formatNumber,
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
                    label="edit"
                    className="textPrimary"
                    onClick={async () => {
                        const obj = rows.find(rows => rows.id === params.id);
                        if (obj.isEnabled) {
                            setEditVal({
                                ...editVal,
                                id: obj.id,
                                provinceId: obj.provinceId,
                                provinceName: obj.provinceName,
                                year: obj.year,
                                value: obj.value
                            });
                            setOpDialog(true)
                        }
                    }}
                    color="inherit"
                    disabled={loading}
                />,
                <Switch
                    checked={params.row.isEnabled}
                    onChange={
                        async () => {
                            await isEnabledHandleChange(params.row.isEnabled, params.row.id)
                        }
                    }
                />
            ]
        }
    ];

    const [opDialog, setOpDialog] = useState(false);
    const [opDialogAdd, setOpDialogAdd] = useState(false);
    const [editVal, setEditVal] = useState({
        id:null,
        provinceId: null,
        provinceName: null,
        year: null,
        value: null,
        email: identity.email
    });
    const resetEditVal = async () => {
        setEditVal({
            ...editVal,
            id:null,
            provinceId: null,
            provinceName: null,
            year: null,
            value:null
        });
    }
    const updatePopulation = async () => {
        Swal.fire({
            title:'ยืนยันการ แก้ไข ข้อมูล' ,
            text: 'คุณต้องการแก้ไขข้อมูลนี้ใช่หรือไม่ ?',
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'ยกเลิก',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'ตกลง'
        }).then(async (result) => {
            setLoading(true);
            if (result.isConfirmed) {
                await PopulationApi.update(editVal);
                await searchPopulation();
                await resetEditVal();
            } else if (result.dismiss === Swal.DismissReason.cancel){
                await resetEditVal();
            }
            await setLoading(false)
        });
    }
    const [addVal, setAddVal] = useState({
        provinceId: null,
        provinceName: null,
        year: null,
        value: '',
        email: identity.email
    });
    const resetAddVal = async () => {
        setEditVal({
            ...editVal,
            provinceId: null,
            provinceName: null,
            year: null,
            value:''
        });
    }
    const validate = async () => {
        console.log(addVal)
    }
    const creatVal = async () => {
        Swal.fire({
            title:'ยืนยันการ เพิ่ม ข้อมูล' ,
            text: 'คุณต้องการแก้ไขข้อมูลนี้ใช่หรือไม่ ?',
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'ยกเลิก',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'ตกลง'
        }).then(async (result) => {
            setLoading(true);
            if (result.isConfirmed) {
                await PopulationApi.create(addVal);
                await searchPopulation();
                await resetAddVal();
            } else if (result.dismiss === Swal.DismissReason.cancel){
                await resetAddVal();
            }
            await setLoading(false)
        });
    }
    return (
        <React.Fragment>
            <Backdrop
                sx={{ color: '#01696A', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loadBd}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Grid container direction="row" spacing={2}>
                <Grid item xs={12} sm={6} md={6} lg={6} >
                    <Typography variant="subtitle1">จังหวัด</Typography>
                    <Autocomplete
                        id="provinces"
                        size="small"
                        value={province.value}
                        defaultValue={{ id: 0, value: 'ทั้งหมด', d:0 }}
                        disableClearable
                        onChange={ async (event, newVal) => {
                            if (newVal) {
                                setSearch({
                                    ...search,
                                    provinceId: newVal.id
                                });
                            }
                        }}
                        options={province}
                        getOptionLabel={(option) => option.value}
                        renderInput={(params) => (
                            <TextField {...params} />
                        )}
                    />
                </Grid>

                <Grid item xs={12} sm={6} md={6} lg={6} >
                    <Typography variant="subtitle1">ปี</Typography>
                    <Autocomplete
                        id="years"
                        size="small"
                        value={year.value}
                        defaultValue={{ id: 0, value: 'ทั้งหมด'}}
                        disableClearable
                        onChange={ async (event, newVal) => {
                            if (newVal) {
                                setSearch({
                                    ...search,
                                    year: newVal.id
                                });
                            }
                        }}
                        options={year}
                        getOptionLabel={(option) => option.value}
                        renderInput={(params) => (
                            <TextField {...params}/>
                        )}
                    />
                </Grid>
            </Grid>
            <Grid container direction="row">
                <Grid container item xs={12} sm={5} md={5} lg={5} justifyContent="flex-start" spacing={1} sx={{marginTop:"10px"}}>
                    <Grid item>
                        <input
                            type="file"
                            hidden
                            onChange={handleFileChange}
                            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                            id="contained-button-file"
                        />
                        <label htmlFor="contained-button-file">
                            <Button size="small" variant="contained" color="primary" component="span" sx={{ marginLeft: "5px" }}>
                                Import
                            </Button>
                        </label>
                    </Grid>
                    <Grid item>
                        <Button
                            size="small"
                            variant="contained"
                            color="secondary"
                            onClick={handleUpload}
                            disabled={!file}
                            sx={{ marginLeft: "5px", marginRight: "5px" }}
                        >
                            Submit
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            variant="contained"
                            size="small"
                            onClick={ async () => {
                                await downloadTemplate();
                            }}
                        >
                            ดาวน์โหลดต้นแบบ
                        </Button>
                    </Grid>
                </Grid>

                <Grid container item xs={12} sm={7} md={7} lg={7} justifyContent="flex-end" sx={{marginTop:"10px"}}>
                    {/*<Button*/}
                    {/*    variant="contained"*/}
                    {/*    size="small"*/}
                    {/*    sx={{marginRight:"10px"}}*/}
                    {/*    onClick={ async () => {*/}
                    {/*        setOpDialogAdd(true)*/}
                    {/*        console.log(search)*/}
                    {/*    }}*/}
                    {/*>*/}
                    {/*    เพิ่มข้อมูล*/}
                    {/*</Button>*/}
                    <Button
                        variant="contained"
                        size="small"
                        sx={{marginRight:"10px"}}
                        onClick={ async () => {
                            await searchPopulation();
                            console.log(search)
                        }}
                    >
                        ค้นหา
                    </Button>
                </Grid>
            </Grid>
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
            <Grid container item xs={12} sm={12} md={12} lg={12} >
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
                        Toolbar: editToolbar,
                        LoadingOverlay: LinearProgress,
                    }}
                    componentsProps={{
                        toolbar: { setRows, setRowModesModel, rowModesModel, setDialogInsert, setDialog },
                        pagination: {
                            labelRowsPerPage: 'แสดง'
                        }
                    }}
                    disableSelectionOnClick
                    rowsPerPageOptions={[10, 50, 100]}
                    pageSize={pageSize}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                />
            </Grid>
            </Box>
            
            {/*--------- dialog edit data -----------------------------------------------------------------------------------------------------*/}
            {/*--------- dialog edit data -----------------------------------------------------------------------------------------------------*/}
            <Dialog
                fullWidth
                open={opDialog}
                sx={{ height: '100%' }}
                onClose={async () => {
                    await resetEditVal();
                    setOpDialog(false);
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
                    <Grid item xs={12} sm={4} md={4} lg={4} sx={{ marginLeft: '24px', marginRight: '24px' }}>
                        <Grid container direction="row">
                            <Typography variant="subtitle1">จังหวัด</Typography>
                        </Grid>
                        <Autocomplete
                            id="provinces"
                            size="small"
                            disabled={true}
                            value={province.value}
                            defaultValue={{ id: editVal.provinceId, value: editVal.provinceName}}
                            onChange={async (e, newVal) => {
                                /*if (newValue) {
                                    setForm(form => ({ ...form, ...{ province: newValue } }))
                                    setDialogPvt((dialog) => (
                                        { ...dialog, province: newValue.province, provinceId: newValue.province_id }
                                    ));
                                }*/
                            }}
                            options={province}
                            getOptionLabel={(option) => option.value}
                            renderInput={(params) => (
                                <TextField {...params} />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4} md={4} lg={4} sx={{ marginLeft: '24px', marginRight: '24px' }}>
                        <Grid container direction="row">
                            <Typography variant="subtitle1">ปี</Typography>
                        </Grid>
                        <Autocomplete
                            id="years"
                            size="small"
                            disabled={true}
                            value={year.value}
                            defaultValue={{ id: parseInt(editVal.year, 10), value: editVal.year}}
                            onChange={async (e, newVal) => {
                                /*if (newValue) {
                                    setForm(search => ({ ...form, ...{ year: newValue } }))
                                    setDialogPvt((dialog) => (
                                        { ...dialog, year: newValue }
                                    ));
                                }*/
                            }}
                            options={year}
                            getOptionLabel={(option) => option.value}
                            renderInput={(params) => (
                                <TextField {...params} />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4} md={4} lg={4} sx={{ marginLeft: '24px', marginRight: '24px' }}>
                        <Grid container direction="row">
                            <Typography variant="subtitle1">จำนวนประชากร</Typography><Typography sx={{ color: 'red' }}>*</Typography>
                        </Grid>
                        <TextField
                            fullWidth
                            size="small"
                            value={editVal.value}
                            onChange={(e) => {
                                let newValue = e.target.value;
                                setEditVal({
                                    ...editVal,
                                    value: newValue
                                });
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
                                    await updatePopulation();
                                }}
                        >
                            บันทึกข้อมูล
                        </Button>
                    </Grid>
                </Grid>
            </Dialog>

            {/*--------- dialog add new data -----------------------------------------------------------------------------------------------------*/}
            {/*--------- dialog add new data -----------------------------------------------------------------------------------------------------*/}
            <Dialog
                fullWidth
                open={opDialogAdd}
                sx={{ height: '100%' }}
                onClose={async () => {
                    await resetAddVal();
                    setOpDialogAdd(false);
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
                            เพิ่มข้อมูล
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4} md={4} lg={4} sx={{ marginLeft: '24px', marginRight: '24px' }}>
                        <Grid container direction="row">
                            <Typography variant="subtitle1">จังหวัด</Typography>
                            <Typography sx={{ color: 'red' }}>*</Typography>
                        </Grid>
                        <Autocomplete
                            id="provinceAdd"
                            size="small"
                            value={addVal.provinceName}
                            defaultValue={{ id: editVal.provinceId, value: editVal.provinceName}}
                            onChange={async (e, newVal) => {
                                /*if (newValue) {
                                    setForm(form => ({ ...form, ...{ province: newValue } }))
                                    setDialogPvt((dialog) => (
                                        { ...dialog, province: newValue.province, provinceId: newValue.province_id }
                                    ));
                                }*/
                            }}
                            options={province}
                            getOptionLabel={(option) => option.value}
                            renderInput={(params) => (
                                <TextField {...params} />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4} md={4} lg={4} sx={{ marginLeft: '24px', marginRight: '24px' }}>
                        <Grid container direction="row">
                            <Typography variant="subtitle1">ปี</Typography>
                            <Typography sx={{ color: 'red' }}>*</Typography>
                        </Grid>
                        <TextField
                            fullWidth
                            size="small"
                            value={addVal.year}
                            onChange={(e) => {
                                let newValue = e.target.value;
                                setAddVal({
                                    ...addVal,
                                    year: newValue
                                });
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4} md={4} lg={4} sx={{ marginLeft: '24px', marginRight: '24px' }}>
                        <Grid container direction="row">
                            <Typography variant="subtitle1">จำนวนประชากร</Typography>
                            <Typography sx={{ color: 'red' }}>*</Typography>
                        </Grid>
                        <TextField
                            fullWidth
                            size="small"
                            value={addVal.value}
                            error={addVal.value.length <= 0 }
                            helperText={addVal.value.length <= 0 ? "กรุณาใส่ จำนวนประชากร" : ""}
                            onChange={(e) => {
                                let newValue = e.target.value;
                                setAddVal({
                                    ...addVal,
                                    value: newValue
                                });
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
                                    // setOpDialogAdd(false);
                                    await validate();
                                }}
                        >
                            บันทึกข้อมูล
                        </Button>
                    </Grid>
                </Grid>
            </Dialog>
        </React.Fragment>
    )
}