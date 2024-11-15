import React, {useContext, useEffect, useState} from 'react';
import PropTypes from "prop-types";
import {AuthContext} from "../../../../react-app";
import MasterDataApi from "../../../api/MasterDataApi";
import FileDownload from "js-file-download";
import Swal from "sweetalert2";
import {DataGrid, GridActionsCellItem} from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import Switch from "react-switch";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import Dialog from "@mui/material/Dialog";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import EscapeApi from "../../../api/EscapeApi";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";

function editToolbar(props) {
    const {rowModesModel, setDialogInsert, setDialog} = props;
}

editToolbar.propTypes = {
    setRowModesModel: PropTypes.func.isRequired,
    setRows: PropTypes.func.isRequired,
};

export default function EscapeTable() {
    const {identity} = useContext(AuthContext);
    const [loadBd, setLoadBd] = useState(false)
    const [factor, setFactor] = useState([{
        id: 0,
        value: 'ทั้งหมด',
        subFactor: [],
    }]);
    const [province, setProvince] = useState([{
        id: 0,
        value: 'ทั้งหมด',
    }]);
    const [year, setYear] = useState([{
        id: 0,
        value: 'ทั้งหมด',
    }]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState({
        factorId: 0,
        factorName: 'ทั้งหมด',
        subFactorId: 0,
        subFactorName: 'ทั้งหมด',
        provinceId: 0,
        year: 0
    })
    const [dfFactor, setDfFactor] = useState({
        id: 0,
        value: 'ทั้งหมด'
    });
    useEffect(() => {
        setLoading(true);
        getProvince()
            .then(r => {
                setProvince(() => {
                    return r.data.province.map(({provinceId, provinceName, d}) => {
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
                        id: yearId,
                        value: yearName
                    }
                })
            })
        })
        getFactor().then(r => {
            setFactor(() => {
                return r.data.escape.map(({factorId, factorName, subFactor}) => {
                    return {
                        id: factorId,
                        value: factorName,
                        subFactor: subFactor
                    }
                })
            });
            firstCall(r.data.escape[0]).then(s => {
                // setDfFactor({
                //     ...dfFactor,
                //     id : s.factorId,
                //     value : s.factorName,
                // })
            })
        })
        setLoading(false);
    }, [])
    const firstCall = async (factor) => {
        setLoading(true);
        setFactorType(64);
        setHideColumns({
            id: false,
            yes: false,
            no: false,
        })
        setSubFactor(factor.subFactor.map((data) => {
            return {
                id: data.factorId,
                value: data.factorName
            }
        }));
        let val = await EscapeApi.search({factorId: factor.factorId});
        setRows(val.data);
        setSubFactorFlg(false);
        setLoading(false);
        // console.log('--------------')
        // console.log(factor)
        // console.log('--------------')
        // return factor;
    }
    const getProvince = async () => {
        return await EscapeApi.getProvince();
    }
    const getYear = async () => {
        return await EscapeApi.getYear();
    }
    const getFactor = async () => {
        return await EscapeApi.getFactor();
    }
    const downloadTemplate = async () => {
        console.log(search);
        let template = null;
        if (search.factorId === 64 || !search.factorId) {
            template = await MasterDataApi.downloadExcel('escape1');
            FileDownload(template.data, 'escape1_template.xlsx');
        }
        if (search.factorId === 65) {
            template = await MasterDataApi.downloadExcel('escape2');
            FileDownload(template.data, 'escape2_template.xlsx');
        }
        if (search.factorId === 66) {
            template = await MasterDataApi.downloadExcel('escapeOrder');
            FileDownload(template.data, 'escape_order_template.xlsx');
        }
    }

    const [file, setFile] = useState(null);
    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
        event.target.value = null;
    };
    const handleUpload = async () => {
        setLoadBd(true)
        const formData = new FormData();
        formData.append("files", file);
        formData.append("email", identity.email);
        try {
            let res = await EscapeApi.import(formData);
            setFile(null);
            if (res.data.length > 0) {
                let userElements = res.data.map(function (msg) {
                    return msg + "<br>";
                });
                Swal.fire({
                    title: 'ไม่สามารถ import ได้',
                    html: userElements.join(""),
                    icon: 'error',
                    showConfirmButton: false,
                }).then(() => {
                    searchData().then(r => {
                    });
                })
            } else {
                Swal.fire({
                    title: 'Running Success',
                    icon: 'success',
                    showConfirmButton: false,
                }).then(() => {
                    searchData().then(r => {
                    });
                })
            }
        } catch (error) {
            console.error(error);
        }
        setLoadBd(false)
    };
    const [pageSize, setPageSize] = useState(10);
    const [rows, setRows] = useState([]);
    const [rowModesModel, setRowModesModel] = useState({});
    const [dialog_insert, setDialogInsert] = useState(false);
    const [dialog, setDialog] = useState({});
    const searchData = async () => {
        setLoading(true);
        let val = await EscapeApi.search({
            'factorId': !search.factorId ? 64 : search.factorId,
            'factorName' : search.factorName,
            'provinceId': search.provinceId,
            'subFactorId': search.subFactorId,
            'subFactorName': search.subFactorName,
            'year': search.year
        })
        setRows(val.data);
        setLoading(false);
    }
    const [hideColumns, setHideColumns] = useState({
        id: false,
    });
    const columns = [
        {
            field: 'id',
            headerName: 'ลำดับที่',
            width: 80,
            editable: false,
            headerClassName: 'super-app-theme--header',
        },
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
            field: 'factorName',
            headerClassName: 'super-app-theme--header',
            headerName: 'ปัจจัยหลัก',
            flex: 1,
            align: 'center',
            headerAlign: 'center',
        },
        {
            field: 'subFactorName',
            headerClassName: 'super-app-theme--header',
            headerName: 'ปัจจัยรอง',
            flex: 2,
            align: 'center',
            headerAlign: 'center',
        },
        {
            field: 'have',
            headerClassName: 'super-app-theme--header',
            headerName: 'have',
            flex: 1,
            align: 'center',
            headerAlign: 'center',
        },
        {
            field: 'value',
            headerClassName: 'super-app-theme--header',
            headerName: 'value',
            flex: 1,
            align: 'center',
            headerAlign: 'center',
        },
        {
            field: 'yes',
            headerClassName: 'super-app-theme--header',
            headerName: 'yes',
            flex: 1,
            align: 'center',
            headerAlign: 'center',
        },
        {
            field: 'no',
            headerClassName: 'super-app-theme--header',
            headerName: 'no',
            flex: 1,
            align: 'center',
            headerAlign: 'center',
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
                    icon={<EditIcon/>}
                    label="edit"
                    className="textPrimary"
                    onClick={async () => {
                        const obj = rows.find(rows => rows.id === params.id);
                        console.log(obj);
                        if (obj.isEnabled) {
                            setEditVal({
                                ...editVal,
                                id: obj.id,
                                year: obj.year,
                                provinceId: obj.provinceId,
                                provinceName: obj.provinceName,
                                factorId: obj.factorId,
                                factorName: obj.factorName,
                                subFactorId: obj.subFactorId,
                                subFactorName: obj.subFactorName,
                                have: obj.have,
                                no: obj.no,
                                yes: obj.yes,
                                value: obj.value,
                            });
                            if (obj.factorId === 64) {
                                setOpDialog1(true)
                            } else if (obj.factorId === 65) {
                                setOpDialog1(true)
                            } else if (obj.factorId === 66) {
                                setOpDialog1(true)
                            }
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
    const [opDialog1, setOpDialog1] = useState(false);
    const [opDialog2, setOpDialog2] = useState(false);
    const [opDialog3, setOpDialog3] = useState(false);
    const [editVal, setEditVal] = useState({
        id: null,
        year: null,
        provinceId: null,
        provinceName: null,
        factorId: null,
        factorName: null,
        subFactorId: null,
        subFactorName: null,
        have: null,
        no: null,
        yes: null,
        value: null,
        email: identity.email
    });
    const resetEditVal = async () => {
        setEditVal({
            ...editVal,
            id: null,
            year: null,
            provinceId: null,
            provinceName: null,
            factorId: null,
            factorName: null,
            subFactorId: null,
            subFactorName: null,
            have: null,
            no: null,
            yes: null,
            value: null,
        });
    }
    const isEnabledHandleChange = async (isEnabled, id) => {
        Swal.fire({
            title: isEnabled ? 'ยืนยันการ ปิด ใช้งาน' : 'ยืนยันการ เปิด ใช้งาน',
            text: isEnabled ? "คุณต้องการปิดใช้งานข้อมูลนี้ใช่หรือไม่ ?" : "คุณต้องการเปิดใช้งานข้อมูลนี้ใช่หรือไม่ ?",
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'ยกเลิก',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'ตกลง'
        }).then(async (result) => {
            setLoading(true);
            if (result.isConfirmed) {
                await EscapeApi.setIsEnabled({isEnabled: isEnabled, id: id, email: identity.email});
                await searchData();
            } else if (result.dismiss === Swal.DismissReason.cancel) {
            }
            await setLoading(false)
        });
    }
    const updateVal = async () => {
        Swal.fire({
            title: 'ยืนยันการ แก้ไข ข้อมูล',
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
                await EscapeApi.update(editVal);
                await searchData();
                await resetEditVal();
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                await resetEditVal();
            }
            await setLoading(false)
        });
    }
    const [subFactorFlg, setSubFactorFlg] = useState(true)
    const [factorType, setFactorType] = useState(0)
    const [subFactor, setSubFactor] = useState([{
        id: 0,
        value: 'ทั้งหมด',
    }]);
    const onSelectEscape = async (d) => {
        setLoading(true);
        if (d.id === 64) {
            setFactorType(64);
            setHideColumns({
                id: false,
                yes: false,
                no: false,
            })
        }
        if (d.id === 65) {
            setFactorType(65);
            setHideColumns({
                id: false,
                subFactorName: false,
                have: false,
                value: false,
            })
        }
        if (d.id === 66) {
            setFactorType(66);
            setHideColumns({
                id: false,
                have: false,
                yes: false,
                no: false,
                year: false
            })
        }
        setSubFactor(d.subFactor.map((data) => {
            return {
                id: data.factorId,
                value: data.factorName
            }
        }));
        let val = await EscapeApi.search({factorId: d.id, provinceId: search.provinceId, year: search.year})
        setRows(val.data);
        setSubFactorFlg(false);
        setLoading(false);
    };
    return (
        <React.Fragment>
            <Backdrop
                sx={{color: '#01696A', zIndex: (theme) => theme.zIndex.drawer + 1}}
                open={loadBd}
            >
                <CircularProgress color="inherit"/>
            </Backdrop>
            <Grid container direction="row" spacing={2}>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                    <Typography variant="subtitle1">ปัจจัยหลัก</Typography>
                    <Autocomplete
                        id="escape"
                        size="small"
                        value={factor.value}
                        defaultValue={{id: 64, value: 'บุตร/หลานวัยเรียนที่ต้องออกมาประกอบอาชีพเพื่อช่วยเหลือครอบครัว'}}
                        disableClearable
                        onChange={async (event, newVal) => {
                            if (newVal) {
                                setSearch({
                                    ...search,
                                    factorId: newVal.id,
                                    factorName: newVal.value,
                                    subFactorId: 0,
                                    subFactorName: 'ทั้งหมด'
                                });
                                await onSelectEscape(newVal);
                            }
                        }}
                        options={factor}
                        getOptionLabel={(option) => option.value}
                        renderInput={(params) => (
                            <TextField {...params} />
                        )}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                    <Typography variant="subtitle1">ปัจจัยรอง</Typography>
                    <Autocomplete
                        id="escape"
                        size="small"
                        disabled={subFactorFlg}
                        value={subFactor.value}
                        defaultValue={{id: 0, value: 'ทั้งหมด'}}
                        disableClearable
                        onChange={async (event, newVal) => {
                            if (newVal) {
                                setSearch({
                                    ...search,
                                    subFactorId: newVal.id,
                                    subFactorName: newVal.value
                                });
                            }
                        }}
                        options={subFactor}
                        getOptionLabel={(option) => option.value}
                        renderInput={(params) => (
                            <TextField {...params} />
                        )}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                    <Typography variant="subtitle1">จังหวัด</Typography>
                    <Autocomplete
                        id="provinces"
                        size="small"
                        value={province.value}
                        defaultValue={{id: 0, value: 'ทั้งหมด', d: 0}}
                        disableClearable
                        onChange={async (event, newVal) => {
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

                <Grid item xs={12} sm={6} md={6} lg={6}>
                    <Typography variant="subtitle1">ปี</Typography>
                    <Autocomplete
                        id="years"
                        size="small"
                        value={year.value}
                        defaultValue={{id: 0, value: 'ทั้งหมด'}}
                        disableClearable
                        onChange={async (event, newVal) => {
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
                <Grid container item xs={12} sm={5} md={5} lg={5} justifyContent="flex-start" spacing={1}
                      sx={{marginTop: "10px"}}>
                    <Grid item>
                        <input
                            type="file"
                            hidden
                            onChange={handleFileChange}
                            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                            id="contained-button-file"
                        />
                        <label htmlFor="contained-button-file">
                            <Button
                                size="small"
                                variant="contained"
                                color="primary"
                                component="span"
                                disabled={subFactorFlg}
                                sx={{marginLeft: "5px"}}>
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
                            sx={{marginLeft: "5px", marginRight: "5px"}}
                        >
                            Submit
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            variant="contained"
                            size="small"
                            disabled={subFactorFlg}
                            onClick={async () => {
                                await downloadTemplate();
                            }}
                        >
                            ดาวน์โหลดต้นแบบ
                        </Button>
                    </Grid>
                </Grid>

                <Grid container item xs={12} sm={7} md={7} lg={7} justifyContent="flex-end" sx={{marginTop: "10px"}}>
                    <Button
                        variant="contained"
                        size="small"
                        disabled={subFactorFlg}
                        onClick={async () => {
                            await searchData();
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
                <Grid container item xs={12} sm={12} md={12} lg={12}>
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
                            toolbar: {setRows, setRowModesModel, rowModesModel, setDialogInsert, setDialog},
                            pagination: {
                                labelRowsPerPage: 'แสดง'
                            }
                        }}
                        columnVisibilityModel={hideColumns}
                        disableSelectionOnClick
                        rowsPerPageOptions={[10, 50, 100]}
                        pageSize={pageSize}
                        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    />
                </Grid>
            </Box>
            <Dialog
                fullWidth
                open={opDialog1}
                sx={{height: '100%'}}
                onClose={async () => {
                    await resetEditVal();
                    setOpDialog1(false);
                }}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-slide-description"
                maxWidth="lg"
            >
                <Grid container spacing={2} sx={{pt: 2, pb: '20px', pl: 2, pr: 2}}>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Typography
                            variant="subtitle1"
                            sx={{pt: 3, pb: '20px', pl: 3, pr: 3, fontWeight: 'bold', fontSize: '22px'}}>
                            แก้ไขข้อมูล
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4} md={4} lg={4} sx={{marginLeft: '24px', marginRight: '24px'}}>
                        <Grid container direction="row">
                            <Typography variant="subtitle1">จังหวัด</Typography>
                        </Grid>
                        <Autocomplete
                            id="provinces"
                            size="small"
                            disabled={true}
                            value={province.value}
                            defaultValue={{id: editVal.provinceId, value: editVal.provinceName}}
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
                    {factorType === 64 || factorType === 65 ? <>
                        <Grid item xs={12} sm={4} md={4} lg={4} sx={{marginLeft: '24px', marginRight: '24px'}}>
                            <Grid container direction="row">
                                <Typography variant="subtitle1">ปี</Typography>
                            </Grid>
                            <Autocomplete
                                id="years"
                                size="small"
                                disabled={true}
                                value={year.value}
                                defaultValue={{id: parseInt(editVal.year, 10), value: editVal.year}}
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
                    </> : <></>}
                    <Grid item xs={12} sm={4} md={4} lg={4} sx={{marginLeft: '24px', marginRight: '24px'}}>
                        <Grid container direction="row">
                            <Typography variant="subtitle1">ปัจจัยหลัก</Typography>
                        </Grid>
                        <Autocomplete
                            id="years"
                            size="small"
                            disabled={true}
                            value={factor.value}
                            defaultValue={{id: parseInt(editVal.factorId, 10), value: editVal.factorName}}
                            onChange={async (e, newVal) => {
                                if (newVal) {
                                    /*setEditVal(search => ({ ...form, ...{ year: newVal } }))
                                    setDialogPvt((dialog) => (
                                        { ...dialog, year: newValue }
                                    ));*/
                                    setEditVal({
                                        ...editVal,
                                        factorId: newVal.id,
                                        factorName: newVal.value,
                                    });
                                }
                            }}
                            options={factor}
                            getOptionLabel={(option) => option.value}
                            renderInput={(params) => (
                                <TextField {...params} />
                            )}
                        />
                    </Grid>
                    {factorType === 64 || factorType === 66 ? <>
                        <Grid item xs={12} sm={4} md={4} lg={4} sx={{marginLeft: '24px', marginRight: '24px'}}>
                            <Grid container direction="row">
                                <Typography variant="subtitle1">ปัจจัยรอง</Typography>
                            </Grid>
                            <Autocomplete
                                id="years"
                                size="small"
                                disabled={true}
                                value={factor.value}
                                defaultValue={{id: parseInt(editVal.subFactorId, 10), value: editVal.subFactorName}}
                                onChange={async (e, newVal) => {
                                    if (newVal) {
                                        /*setEditVal(search => ({ ...form, ...{ year: newVal } }))
                                        setDialogPvt((dialog) => (
                                            { ...dialog, year: newValue }
                                        ));*/
                                        setEditVal({
                                            ...editVal,
                                            subFactorId: newVal.id,
                                            subFactorName: newVal.value,
                                        });
                                    }
                                }}
                                options={factor}
                                getOptionLabel={(option) => option.value}
                                renderInput={(params) => (
                                    <TextField {...params} />
                                )}
                            />
                        </Grid>
                    </> : <></>}
                    {factorType === 64 ? <>
                        <Grid item xs={12} sm={4} md={4} lg={4} sx={{marginLeft: '24px', marginRight: '24px'}}>
                            <Grid container direction="row">
                                <Typography variant="subtitle1">have</Typography>
                            </Grid>
                            <TextField
                                fullWidth
                                size="small"
                                value={editVal.have}
                                disabled={true}
                                onChange={(e) => {
                                    let newValue = e.target.value;
                                    setEditVal({
                                        ...editVal,
                                        have: newValue
                                    });
                                }}
                            />
                        </Grid>
                    </> : <></>}
                    {factorType === 64 || factorType === 66 ? <>
                        <Grid item xs={12} sm={4} md={4} lg={4} sx={{marginLeft: '24px', marginRight: '24px'}}>
                            <Grid container direction="row">
                                <Typography variant="subtitle1">value</Typography><Typography
                                sx={{color: 'red'}}>*</Typography>
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
                    </> : <></>}
                    {factorType === 65 ? <>
                        <Grid item xs={12} sm={4} md={4} lg={4} sx={{marginLeft: '24px', marginRight: '24px'}}>
                            <Grid container direction="row">
                                <Typography variant="subtitle1">yes</Typography><Typography
                                sx={{color: 'red'}}>*</Typography>
                            </Grid>
                            <TextField
                                fullWidth
                                size="small"
                                value={editVal.yes}
                                onChange={(e) => {
                                    let newValue = e.target.value;
                                    setEditVal({
                                        ...editVal,
                                        yes: newValue
                                    });
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4} md={4} lg={4} sx={{marginLeft: '24px', marginRight: '24px'}}>
                            <Grid container direction="row">
                                <Typography variant="subtitle1">no</Typography><Typography
                                sx={{color: 'red'}}>*</Typography>
                            </Grid>
                            <TextField
                                fullWidth
                                size="small"
                                value={editVal.no}
                                onChange={(e) => {
                                    let newValue = e.target.value;
                                    setEditVal({
                                        ...editVal,
                                        no: newValue
                                    });
                                }}
                            />
                        </Grid>
                    </> : <></>}
                    <Grid xs={12} sm={12} md={12} lg={12} sx={{pb: '30px', pt: '40px'}} item container direction="row"
                          justifyContent="flex-end" alignItems="end">
                        <Button variant="outlined" disableElevation
                                sx={{
                                    backgroundColor: '#01696A',
                                    color: '#ffffff',
                                    ':hover': {
                                        backgroundColor: '#163557',
                                        color: 'white',
                                    },
                                }}
                                startIcon={<SaveOutlinedIcon/>}
                                onClick={async () => {
                                    // console.log(editVal)
                                    setOpDialog1(false);
                                    await updateVal();
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