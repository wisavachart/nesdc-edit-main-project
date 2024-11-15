import React, { Component, useContext, useEffect, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Header from './Header';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import Footer from './Footer';
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { AppBar, Checkbox, RadioGroup } from "@mui/material";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import Chip from "@mui/material/Chip";
import { Controller, useForm, useWatch } from "react-hook-form";
import axios from "axios";
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import PageLoading from "../../component/pageLoading";
import CircularProgress from "@mui/material/CircularProgress";
import DoneIcon from '@mui/icons-material/Done';
import ErrorIcon from '@mui/icons-material/Error';
import { FormControl, FormLabel, Slider, Tabs } from "@material-ui/core";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import CheckboxGroup from "../../component/CheckboxGroup/CheckboxGroup";
import ResultApi from "../../api/ResultApi";
import ReplyIcon from '@mui/icons-material/Reply';
import Autocomplete from "@mui/material/Autocomplete";
import CurriculumApi from "../../api/CurriculumApi";
import FacultyApi from "../../api/FacultyApi";
import ProvincesComponent from "./ProvincesComponent";
import AddressInput from "./ProvincesComponent";
import Swal from "sweetalert2";
import PositionComponent from "./PositionComponent";
import KuPovertyRatioApi from "../../api/KuPovertyRatioApi";
import Backdrop from "@mui/material/Backdrop";
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import logo from '/public/images/LogoThaiSmaller.png'
import { NumericFormat } from 'react-number-format';
import Link from '@mui/material/Link';
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Paper from '@mui/material/Paper';

import { ResponsiveChartContainer } from '@mui/x-charts/ResponsiveChartContainer';
import { LinePlot } from '@mui/x-charts/LineChart';
import { BarPlot } from '@mui/x-charts/BarChart';
import { ChartsXAxis } from '@mui/x-charts/ChartsXAxis';
import { ChartsYAxis } from '@mui/x-charts/ChartsYAxis';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts/LineChart';
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";


import { IgrRadialGaugeModule, IgrRadialGauge, IgrRadialGaugeRange } from 'igniteui-react-gauges';
import Chart, {
    CommonSeriesSettings,
    Series,
    ValueAxis,
    Export,
    Legend,
    Tooltip,
    Title,
    Format,
} from 'devextreme-react/chart';
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
IgrRadialGaugeModule.register();

const theme = createTheme({
    typography: {
        allVariants: {
            fontFamily: 'Kanit',
            textTransform: 'none',
            // fontSize: 16,
        },
    },
});

export default function AnalyticDataComponent() {

    const [loading, setLoading] = useState(true);
    const [provinces, setProvinces] = useState([
        {
            provinceId: '215',
            provinceName: 'ตาก',
            d: 0
        }
    ]);

    const [dataGraph1011, setDataGraph1011] = useState({
        dataGraph10: {
            SubStatbiltiy1: {
                dataSet: [
                    {
                        graph10Data1: 90,
                        graph10Data2: 10,
                        graph10Data3: 8,
                        graph10Data4: 1,
                        graph10Data5: 0,
                        levelData: 'การค้าชายแดนทำให้ท่านและครอบครัวมีรายได้เพิ่มขึ้น',
                    },
                    {
                        graph10Data1: 90,
                        graph10Data2: 12,
                        graph10Data3: 6,
                        graph10Data4: 0,
                        graph10Data5: 0,
                        levelData: 'การค้าชายแดนช่วยเพิ่มงานให้กับท่านและครอบครัว',
                    },
                    {
                        graph10Data1: 105,
                        graph10Data2: 3,
                        graph10Data3: 1,
                        graph10Data4: 0,
                        graph10Data5: 0,
                        levelData: 'การค้าของหนีภาษีทำให้ท่านมีโอกาสในการทำงานมากขึ้น',
                    }
                ]
            },
            SubStatbiltiy2: {
                dataSet: [
                    {
                        graph10Data1: 57,
                        graph10Data2: 15,
                        graph10Data3: 20,
                        graph10Data4: 6,
                        graph10Data5: 11,
                        levelData: 'แรงงานต่างด้าวเข้ามาแย่งงานของท่าน',
                    },
                    {
                        graph10Data1: 35,
                        graph10Data2: 9,
                        graph10Data3: 26,
                        graph10Data4: 18,
                        graph10Data5: 21,
                        levelData: 'แรงงานต่างด้าวช่วยท่านในการประกอบอาชีพ',
                    },
                    {
                        graph10Data1: 80,
                        graph10Data2: 16,
                        graph10Data3: 7,
                        graph10Data4: 2,
                        graph10Data5: 4,
                        levelData: 'แรงงานต่างด้าวช่วยท่านในการประกอบอาชีพ',
                    },
                    {
                        graph10Data1: 46,
                        graph10Data2: 29,
                        graph10Data3: 23,
                        graph10Data4: 6,
                        graph10Data5: 3,
                        levelData: 'แรงงานต่างด้าวและครอบครัวเข้ามาใช้ประโยชน์จากบริการสาธารณะของชุมชนโดยไม่ต้องเสียเงิน',
                    },
                    {
                        graph10Data1: 84,
                        graph10Data2: 11,
                        graph10Data3: 8,
                        graph10Data4: 3,
                        graph10Data5: 3,
                        levelData: 'กลุ่มมาเฟียของแรงงานต่างด้าวในพื้นที่ชายแดนของไทยทำให้ท่านและครอบครัวรู้สึกไม่ปลอดภัย',
                    }
                ]
            }
        },
        dataGraph11: {
            graph11_1: {
                data1: [
                    { label: 'ประถมศึกษา', value: 0, color: '#efe9e2' },
                    { label: 'มัธยมศึกษาตอนต้น', value: 2, color: '#ff6600' },
                    { label: 'มัธยมศึกษาตอนปลาย', value: 1, color: '#8c99aa' },
                ],
                data2: [
                    { label: 'ได้', value: 89, color: '#1c537a' },
                    { label: 'ไม่ได้', value: 20, color: '#ff6600' }
                ]
            },
            graph11_2: {
                dataSet: [
                    {
                        graph11_2Data: 5,
                        graph11_2LevelData: 'การเรียนในระบบให้สูงขึ้น',
                    },
                    {
                        graph11_2Data: 4,
                        graph11_2LevelData: 'การสนับสนุนและช่วยเหลือในการผลิตจากรัฐ เช่น ที่ดินทำกิน ปัจจัยการผลิต เป็นต้น',
                    },
                    {
                        graph11_2Data: 3,
                        graph11_2LevelData: 'การฝึกอบรมทักษะการประกอบอาชีพ',
                    },
                    {
                        graph11_2Data: 2,
                        graph11_2LevelData: 'การสนับสนุนเงินทุนในการประกอบอาชีพจากรัฐ',
                    },
                    {
                        graph11_2Data: 1,
                        graph11_2LevelData: 'การทำงานในภาคธุรกิจ',
                    }
                ]
            }
        }
    });
    const [menu, setMenu] = useState(null);
    const pathname = location.pathname;
    const openMenu = Boolean(menu);
    const [search, setSearch] = useState({
        provinceId: 215,
        provinceName: 'ตาก',
        d: 0
    })

    const fetchData = async () => {
        setLoading(true)
        let dataProvince = {
            provinceId: null,
            year: null
        }

        let dataListProvince = await KuPovertyRatioApi.getDataProvince1011(dataProvince);
        //console.log(dataListProvince.data)
        setProvinces(dataListProvince.data)
        setSearch(dataListProvince.data[0])

        let data5 = {
            provinceId: dataListProvince.data[0].provinceId,
            graphNo: 4,
            developFactor: null
        }

        let dataList5 = await KuPovertyRatioApi.getDataGraph10(data5);

        setDataGraph1011(dataGraph1011 => ({ ...dataGraph1011, ...{ dataGraph10: dataList5.data.dataGraph10, dataGraph11: dataList5.data.dataGraph11 } }))
        setData(dataList5.data.dataGraph11.graph11_1.data1)
        setData2(dataList5.data.dataGraph11.graph11_1.data2)
        let total = dataList5.data.dataGraph11.graph11_1.data1.map((item) => item.value).reduce((a, b) => a + b, 0)
        //console.log(dataList5.data.dataGraph11.graph11_1.data1, total)
        setTotal(total)
        setSumTable(dataList5.data.sumTable)
        //setGraph5(graph5 => ({ ...graph5, ...{ dataset: dataList5.data.dataset,label: dataList5.data.label,graphNo: dataList5.data.graphNo,developFactor: dataList5.data.developFactor } }))
        setLoading(false)
    }


    useEffect(() => {
        ////console.log(pathname);
        let data = {
            provinceId: null,
            province: null,
            year: null,
            d: null
        };

        const result = fetchData(data).catch(console.error);

    }, []);

    const chartSetting = {
        xAxis: [
            {
                label: 'ระดับผลกระทบ (ร้อยละ)',
            },
        ],
        height: 800,
    };
    const graph10Dataset = [
        {
            graph10Data1: 90,
            graph10Data2: 90,
            graph10Data3: 105,
            levelData: 'น้อยที่สุด',
        },
        {
            graph10Data1: 10,
            graph10Data2: 12,
            graph10Data3: 3,
            levelData: 'น้อย',
        },
        {
            graph10Data1: 8,
            graph10Data2: 6,
            graph10Data3: 1,
            levelData: 'ปานกลาง',
        },
        {
            graph10Data1: 1,
            graph10Data2: 0,
            graph10Data3: 0,
            levelData: 'มากที่สุด',
        }
    ];
    const graph11_2ChartSetting = {
        xAxis: [
            {
                label: 'ลำดับความสำคัญ (5: สำคัญมาก)',
            }
        ],
        height: 400,
        width: 1000
    };
    const graph11_2Dataset = [
        {
            graph11_2Data: 5,
            graph11_2LevelData: 'การเรียนในระบบให้สูงขึ้น',
        },
        {
            graph11_2Data: 4,
            graph11_2LevelData: 'การสนับสนุนและช่วยเหลือในการผลิตจากรัฐ เช่น ที่ดินทำกิน ปัจจัยการผลิต เป็นต้น',
        },
        {
            graph11_2Data: 3,
            graph11_2LevelData: 'การฝึกอบรมทักษะการประกอบอาชีพ',
        },
        {
            graph11_2Data: 2,
            graph11_2LevelData: 'การสนับสนุนเงินทุนในการประกอบอาชีพจากรัฐ',
        },
        {
            graph11_2Data: 1,
            graph11_2LevelData: 'การทำงานในภาคธุรกิจ',
        }
    ];

    const valueFormatter = (value) => `${value}mm`;

    const [data, setData] = useState([
        { label: 'ประถมศึกษา', value: 1, color: '#efe9e2' },
        { label: 'มัธยมศึกษาตอนต้น', value: 1, color: '#ff6600' },
        { label: 'มัธยมศึกษาตอนปลาย', value: 1, color: '#8c99aa' },
    ])

    const [sumTable, setSumTable] = useState({have: 3, perHave: 2.75, notHave: 106, perNotHave: 97.25, sum: 109})

    const [total, setTotal] = useState(0)

    const sizing = { height: 500 };
    const getArcLabel = (params) => {
        const percent = params.value / total;
        //console.log(percent, params.value, total)
        return `${(percent * 100).toFixed(0)}%`;
    };

    const [data2, setData2] = useState([
        { label: 'ได้', value: 89, color: '#1c537a' },
        { label: 'ไม่ได้', value: 20, color: '#ff6600' }
    ])

    const TOTAL2 = data2.map((item) => item.value).reduce((a, b) => a + b, 0);
    const getArcLabel2 = (params) => {
        const percent2 = params.value / TOTAL2;
        return `${(percent2 * 100).toFixed(0)}%`;
    };

    return (
        <React.Fragment>
            <ThemeProvider theme={theme}>
                {
                    loading
                        ?
                        <Backdrop
                            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                            open={loading}
                        >
                            <CircularProgress color="inherit" />
                        </Backdrop>
                        :
                        <>
                            {
                                pathname === '/analytic-data'
                                    ?
                                    <>
                                        <AppBar position="static" sx={{ backgroundColor: 'rgba(250,207,101,0.58)', mb: '10px', mt: 0, width: '100%' ,pr:'0px !important',pl:'0px !important'}} elevation={1}>
                                            <Toolbar sx={{ width: '100%' ,pr:'0px !important',pl:'0px !important'}}>
                                                <Link href="/" sx={{ display: 'contents' }}>
                                                    <Grid sx={{ width: { xs: '50px', sm: '50px', md: '100px', lg: '100px' } }}>
                                                        <img src={logo} width={'100px'} className="image" style={{ width: '100%', maxWidth: '100px', height: 'auto' }} />
                                                    </Grid>
                                                    <Typography variant="h5"
                                                        component="div"
                                                        sx={{
                                                            flexGrow: { xs: 0.9, sm: 0.9, md: 0.5, lg: 0.9 },
                                                            color: '#011E56',
                                                            fontSize: { xs: '14px', sm: '16px', md: '18px', lg: '18px' },
                                                        }}
                                                    >
                                                        ระบบฐานข้อมูลเพื่อการเตือนภัยความยากจนบริเวณจังหวัดชายแดน
                                                    </Typography>
                                                </Link>
                                                <Box variant="h5" sx={{ justifyContent: 'flex-end', color: '#011E56', display: { xs: 'none', md: 'block' } }}>
                                                    <Link href="/" color="inherit" sx={{ pl: '5px', fontSize: { xs: '12px', sm: '12px', md: '12px', lg: '20px' }, fontFamily: 'Kanit' }}>Dashboard</Link>
                                                    <Link href="/static-data" color="inherit" sx={{ pl: '5px', fontSize: { xs: '12px', sm: '12px', md: '12px', lg: '20px' }, fontFamily: 'Kanit' }}>ข้อมูลสถิติ</Link>
                                                    <Link href="/developing-index" color="inherit" sx={{ pl: '5px', fontSize: { xs: '12px', sm: '12px', md: '12px', lg: '20px' }, fontFamily: 'Kanit' }}>ตัวชี้วัดการพัฒนา</Link>
                                                    <Link href="/analytic-data" color="inherit" sx={{ pl: '5px', fontSize: { xs: '12px', sm: '12px', md: '12px', lg: '20px' }, fontFamily: 'Kanit' }}>ข้อมูลการวิเคราะห์</Link>
                                                </Box>
                                                <IconButton onClick={(e) => { setMenu(e.currentTarget) }} sx={{ display: { xs: 'block', md: 'none' } }}><MoreVertRoundedIcon /></IconButton>
                                            </Toolbar>
                                        </AppBar>
                                    </>
                                    : <></>
                            }
                            <Box variant="h2" sx={{ px: '20px', pt: '0px',justifyContent: 'flex-start',width:'100%', color: '#011E56', display: { md: 'block' } }}>
                                <Grid container direction="row" justifyContent="center" justifyItems="center" alignContent="center" alignItems="center" columnGap={{ xs: 1, sm: 2, md: 4 , lg: 6}}>
                                    <Grid item alignContent="center" alignItems="center"  justifyContent="center" justifyItems="center" xs="auto">
                                        <Link href="#developFactorChart1" color="inherit" sx={{ fontSize: { xs: '12px', sm: '12px', md: '12px', lg: '20px' }, fontFamily: 'Kanit' }}>ผลกระทบปัจจัยด้านสถานการณ์ความมั่นคง</Link>    
                                    </Grid>
                                    <Grid item alignContent="center" alignItems="center" justifyContent="center" justifyItems="center" xs="auto">
                                        <Link href="#developFactorChart2" color="inherit" sx={{ fontSize: { xs: '12px', sm: '12px', md: '12px', lg: '20px' }, fontFamily: 'Kanit' }}>การหลุดพ้นความยากจน</Link>    
                                    </Grid>
                                    <Grid item alignContent="center" alignItems="center" justifyContent="center" justifyItems="center" xs="auto">
                                        <Link href="#developFactorChart3" color="inherit" sx={{ fontSize: { xs: '12px', sm: '12px', md: '12px', lg: '20px' }, fontFamily: 'Kanit' }}>ความคิดเห็นเกี่ยวกับการหลุดพ้นความยากจนของบุตร/หลาน</Link>    
                                    </Grid>    
                                </Grid>
                            </Box>
                            <hr></hr>
                            <Box sx={{ px: '10px', pt: '0px', overflow: 'auto', backgroundColor: '#ffffff' }}>
                                <Grid container spacing={2} sx={{ pt: '10px' }}>
                                    <Grid item xs={12} sm={10} md={8} lg={6} id="developFactorChart1">
                                        <Typography variant="h5" >
                                            ผลกระทบปัจจัยด้านสถานการณ์ความมั่นคง
                                        </Typography>
                                        <Autocomplete
                                            id="province"
                                            size="small"
                                            value={search}
                                            onChange={async (event, newValue) => {
                                                if (newValue) {
                                                    //console.log(newValue)
                                                    setSearch(newValue)
                                                    let data5 = {
                                                        provinceId: newValue.provinceId,
                                                        graphNo: 4,
                                                        developFactor: null
                                                    }
                                                    let dataList5 = await KuPovertyRatioApi.getDataGraph10(data5);
                                                    //console.log(dataList5.data)
                                                    if (typeof dataList5.data.dataGraph10 !== 'undefined') {
                                                        //console.log(dataList5.data.province)
                                                        setDataGraph1011(dataGraph1011 => ({ ...dataGraph1011, ...{ dataGraph10: dataList5.data.dataGraph10, dataGraph11: dataList5.data.dataGraph11 } }))
                                                        setSearch(dataList5.data.province[0])
                                                        setData(dataList5.data.dataGraph11.graph11_1.data1)
                                                        setData2(dataList5.data.dataGraph11.graph11_1.data2)
                                                        let total = dataList5.data.dataGraph11.graph11_1.data1.map((item) => item.value).reduce((a, b) => a + b, 0)
                                                        //console.log(dataList5.data.dataGraph11.graph11_1.data1, total)
                                                        setSumTable(dataList5.data.sumTable)
                                                        setTotal(total)
                                                    } else {
                                                        alert('ไม่พบข้อมูล')
                                                    }


                                                }
                                            }}
                                            options={provinces}
                                            getOptionLabel={(option) => option.provinceName}
                                            renderInput={(params) => (
                                                <TextField {...params} />
                                            )}
                                            sx={{ mt: '20px' }}
                                        />
                                    </Grid>
                                    <Divider/>
                                    <Grid container direction="row" spacing={2}>
                                        <Grid container direction="row" justifyContent="center" justifyItems="center" alignContent="center" alignItems="center" spacing={2} sx={{ ml: '30px' }}>
                                            <Grid item alignContent="center" alignItems="center" xs={12} sm={12} md={6} lg={6}>
                                                <Typography variant="h5">
                                                    การค้าชายแดน
                                                </Typography>
                                                <BarChart
                                                    dataset={dataGraph1011.dataGraph10.SubStatbiltiy1.dataSet}
                                                    yAxis={[{ scaleType: 'band', dataKey: 'levelData' }]}
                                                    series={[
                                                        { dataKey: 'graph10Data1', label: 'น้อยที่สุด' },
                                                        { dataKey: 'graph10Data2', label: 'น้อย' },
                                                        { dataKey: 'graph10Data3', label: 'ปานกลาง' },
                                                        { dataKey: 'graph10Data4', label: 'มาก' },
                                                        { dataKey: 'graph10Data5', label: 'มากที่สุด' }
                                                    ]}
                                                    layout="horizontal"
                                                    {...chartSetting}
                                                    margin={{ top: 50, bottom: 50, left: 170, right: 50 }}
                                                />
                                                <Typography variant="subtitle" sx={{mb: "30px", display: "block",color:"grey",fontSize:"small"}}>ที่มา: การสำรวจความคิดเห็น, 2566</Typography>
                                            </Grid>
                                            <Grid item alignContent="center" alignItems="center" xs={12} sm={12} md={6} lg={6}>
                                                <Typography variant="h5">
                                                    แรงงานต่างด้าว
                                                </Typography>
                                                <BarChart
                                                    title=''
                                                    dataset={dataGraph1011.dataGraph10.SubStatbiltiy2.dataSet}
                                                    yAxis={[{ scaleType: 'band', dataKey: 'levelData' }]}
                                                    series={[
                                                        { dataKey: 'graph10Data1', label: 'น้อยที่สุด' },
                                                        { dataKey: 'graph10Data2', label: 'น้อย' },
                                                        { dataKey: 'graph10Data3', label: 'ปานกลาง' },
                                                        { dataKey: 'graph10Data4', label: 'มาก' },
                                                        { dataKey: 'graph10Data5', label: 'มากที่สุด' }
                                                    ]}
                                                    layout="horizontal"
                                                    {...chartSetting}
                                                    margin={{ top: 50, bottom: 50, left: 170, right: 50 }}
                                                    sx={{
                                                        [`& .MuiChartsAxis-tickContainer`]: {
                                                            fill: 'white',
                                                            fontSize: 14,
                                                        },
                                                    }}
                                                />
                                                <Typography variant="subtitle" sx={{mb: "30px", display: "block",color:"grey",fontSize:"small"}}>ที่มา: การสำรวจความคิดเห็น, 2566</Typography>
                                            </Grid>
                                            <Grid item alignContent="center" alignItems="center" xs={12} sm={12} md={6} lg={6}>
                                                <Typography variant="h5">
                                                    ความไม่สงบในพื้นที่
                                                </Typography>
                                                <BarChart
                                                    dataset={dataGraph1011.dataGraph10.SubStatbiltiy3.dataSet}
                                                    yAxis={[{ scaleType: 'band', dataKey: 'levelData' }]}
                                                    series={[
                                                        { dataKey: 'graph10Data1', label: 'น้อยที่สุด' },
                                                        { dataKey: 'graph10Data2', label: 'น้อย' },
                                                        { dataKey: 'graph10Data3', label: 'ปานกลาง' },
                                                        { dataKey: 'graph10Data4', label: 'มาก' },
                                                        { dataKey: 'graph10Data5', label: 'มากที่สุด' }
                                                    ]}
                                                    layout="horizontal"
                                                    {...chartSetting}
                                                    margin={{ top: 50, bottom: 50, left: 170, right: 50 }}
                                                />
                                                <Typography variant="subtitle" sx={{mb: "30px", display: "block",color:"grey",fontSize:"small"}}>ที่มา: การสำรวจความคิดเห็น, 2566</Typography>
                                            </Grid>
                                            <Grid item alignContent="center" alignItems="center" xs={12} sm={12} md={6} lg={6}>
                                                <Typography variant="h5">
                                                    ยาเสพติด
                                                </Typography>
                                                <BarChart
                                                    dataset={dataGraph1011.dataGraph10.SubStatbiltiy4.dataSet}
                                                    yAxis={[{ scaleType: 'band', dataKey: 'levelData' }]}
                                                    series={[
                                                        { dataKey: 'graph10Data1', label: 'น้อยที่สุด' },
                                                        { dataKey: 'graph10Data2', label: 'น้อย' },
                                                        { dataKey: 'graph10Data3', label: 'ปานกลาง' },
                                                        { dataKey: 'graph10Data4', label: 'มาก' },
                                                        { dataKey: 'graph10Data5', label: 'มากที่สุด' }
                                                    ]}
                                                    layout="horizontal"
                                                    {...chartSetting}
                                                    margin={{ top: 50, bottom: 50, left: 170, right: 50 }}
                                                />
                                                <Typography variant="subtitle" sx={{mb: "30px", display: "block",color:"grey",fontSize:"small"}}>ที่มา: การสำรวจความคิดเห็น, 2566</Typography>
                                            </Grid>
                                            <Grid item alignContent="center" alignItems="center" xs={12} sm={12} md={6} lg={6}>
                                                <Typography variant="h5">
                                                    อาชญากรรม
                                                </Typography>
                                                <BarChart
                                                    dataset={dataGraph1011.dataGraph10.SubStatbiltiy5.dataSet}
                                                    yAxis={[{ scaleType: 'band', dataKey: 'levelData' }]}
                                                    series={[
                                                        { dataKey: 'graph10Data1', label: 'น้อยที่สุด' },
                                                        { dataKey: 'graph10Data2', label: 'น้อย' },
                                                        { dataKey: 'graph10Data3', label: 'ปานกลาง' },
                                                        { dataKey: 'graph10Data4', label: 'มาก' },
                                                        { dataKey: 'graph10Data5', label: 'มากที่สุด' }
                                                    ]}
                                                    layout="horizontal"
                                                    {...chartSetting}
                                                    margin={{ top: 50, bottom: 50, left: 170, right: 50 }}
                                                />
                                                <Typography variant="subtitle" sx={{mb: "30px", display: "block",color:"grey",fontSize:"small"}}>ที่มา: การสำรวจความคิดเห็น, 2566</Typography>
                                            </Grid>
                                            <Grid item alignContent="center" alignItems="center" xs={12} sm={12} md={6} lg={6}>
                                                <Typography variant="h5">
                                                    อื่นๆ
                                                </Typography>
                                                <BarChart
                                                    dataset={dataGraph1011.dataGraph10.SubStatbiltiy6.dataSet}
                                                    yAxis={[{ scaleType: 'band', dataKey: 'levelData' }]}
                                                    series={[
                                                        { dataKey: 'graph10Data1', label: 'น้อยที่สุด' },
                                                        { dataKey: 'graph10Data2', label: 'น้อย' },
                                                        { dataKey: 'graph10Data3', label: 'ปานกลาง' },
                                                        { dataKey: 'graph10Data4', label: 'มาก' },
                                                        { dataKey: 'graph10Data5', label: 'มากที่สุด' }
                                                    ]}
                                                    layout="horizontal"
                                                    {...chartSetting}
                                                    margin={{ top: 50, bottom: 50, left: 170, right: 50 }}
                                                />
                                                <Typography variant="subtitle" sx={{mb: "30px", display: "block",color:"grey",fontSize:"small"}}>ที่มา: การสำรวจความคิดเห็น, 2566</Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid container direction="row" justifyContent="center" justifyItems="center" alignContent="center" alignItems="center" spacing={2} sx={{ mt: '40px !important', ml: '30px' }} style={{marginTop: '40px !important'}}>
                                            <Grid item alignContent="center" alignItems="center" xs={12} sm={12} md={12} lg={12} id="developFactorChart2">
                                                <Typography variant="h5">
                                                    การหลุดพ้นความยากจน
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid container direction="row" justifyContent="center" justifyItems="center" alignContent="center" alignItems="center" spacing={2} sx={{ mt: '40px !important', ml: '30px' }} style={{marginTop: '40px !important'}}>
                                            <Paper sx={{ width: '100%', justifyContent: 'center', alignContent: 'center' }}>
                                                <TableContainer component={Paper} sx={{ backgroundColor: '#ffffff' }}>
                                                    <Table sx={{ height: "10px" }} stickyHeader aria-label="custom pagination table">
                                                        <TableHead>
                                                            <TableRow sx={{ backgroundColor: '#f7f7f7' }}>
                                                                <TableCell sx={{ pl: { xs: 1, sm: 2, md: 2 }, verticalAlign: 'center', py: 1 ,width:'33%'}} align={"center"}>บุตร/หลานวัยเรียนที่ต้องออกมาประกอบอาชีพเพื่อช่วยเหลือครอบครัว</TableCell>
                                                                <TableCell sx={{ pl: { xs: 1, sm: 2, md: 2 }, verticalAlign: 'center', py: 1 ,width:'33%'}} align={"center"}>จำนวนคน</TableCell>
                                                                <TableCell sx={{ pl: { xs: 1, sm: 2, md: 2 }, verticalAlign: 'center', py: 1 ,width:'33%'}} align={"center"}>%</TableCell>
                                                                
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            <TableRow>
                                                                <TableCell sx={{ pl: { xs: 1, sm: 2, md: 2 }, verticalAlign: 'center', py: 1 ,width:'33%'}} align={"center"}>มี</TableCell>
                                                                <TableCell sx={{ pl: { xs: 1, sm: 2, md: 2 }, verticalAlign: 'center', py: 1 ,width:'33%'}} align={"center"}>{sumTable.have}</TableCell>
                                                                <TableCell sx={{ pl: { xs: 1, sm: 2, md: 2 }, verticalAlign: 'center', py: 1 ,width:'33%'}} align={"center"}>{sumTable.perHave+'%'}</TableCell>
                                                                
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell sx={{ pl: { xs: 1, sm: 2, md: 2 }, verticalAlign: 'center', py: 1 ,width:'33%'}} align={"center"}>ไม่มี</TableCell>
                                                                <TableCell sx={{ pl: { xs: 1, sm: 2, md: 2 }, verticalAlign: 'center', py: 1 ,width:'33%'}} align={"center"}>{sumTable.notHave}</TableCell>
                                                                <TableCell sx={{ pl: { xs: 1, sm: 2, md: 2 }, verticalAlign: 'center', py: 1 ,width:'33%'}} align={"center"}>{sumTable.perNotHave+'%'}</TableCell>
                                                                
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell sx={{ pl: { xs: 1, sm: 2, md: 2 }, verticalAlign: 'center', py: 1 ,width:'33%'}} align={"center"}>รวม</TableCell>
                                                                <TableCell sx={{ pl: { xs: 1, sm: 2, md: 2 }, verticalAlign: 'center', py: 1 ,width:'33%'}} align={"center"}>{sumTable.sum}</TableCell>
                                                                <TableCell sx={{ pl: { xs: 1, sm: 2, md: 2 }, verticalAlign: 'center', py: 1 ,width:'33%'}} align={"center"}>100%</TableCell>
                                                                
                                                            </TableRow>
                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>
                                            </Paper>
                                        </Grid>
                                        <Grid container direction="row" justifyContent="center" justifyItems="center" alignContent="center" alignItems="center" spacing={2} sx={{ mt: '40px !important', ml: '30px' }} style={{marginTop: '40px !important'}} id="developFactorChart3">
                                            <Grid item alignContent="center" alignItems="center" xs={12} sm={12} md={6} lg={6}>
                                                <Typography variant="h5">
                                                    บุตร/หลานวัยเรียนที่ต้องออกมาประกอบอาชีพเพื่อช่วยเหลือครอบครัว
                                                </Typography>
                                                <PieChart
                                                    series={[
                                                        {
                                                            outerRadius: 200,
                                                            data: dataGraph1011.dataGraph11.graph11_1.data1,
                                                            arcLabel: getArcLabel,
                                                        },
                                                    ]}
                                                    sx={{
                                                        [`& .${pieArcLabelClasses.root}`]: {
                                                            fill: 'white',
                                                            fontSize: 14,
                                                        },
                                                    }}
                                                    {...sizing}
                                                    margin={{ top: 50, bottom: 50, left: 100, right: 100 }}
                                                />
                                                <Typography variant="subtitle" sx={{mb: "30px", display: "block",color:"grey",fontSize:"small"}}>ที่มา: การสำรวจความคิดเห็น, 2566</Typography>
                                            </Grid>
                                            <Grid item alignContent="center" alignItems="center" xs={12} sm={12} md={6} lg={6} style={{marginTop: '40px !important'}}>
                                                <Typography variant="h5">
                                                    การหลุดพ้นจากปัญหาความยากจนของบุตร/หลาน
                                                </Typography>
                                                <PieChart
                                                    series={[
                                                        {
                                                            outerRadius: 200,
                                                            data: dataGraph1011.dataGraph11.graph11_1.data2,
                                                            arcLabel: getArcLabel2,
                                                        },
                                                    ]}
                                                    sx={{
                                                        [`& .${pieArcLabelClasses.root}`]: {
                                                            fill: 'white',
                                                            fontSize: 14,
                                                        },
                                                    }}
                                                    {...sizing}
                                                    margin={{ top: 50, bottom: 50, left: 100, right: 100 }}
                                                />
                                                <Typography variant="subtitle" sx={{mb: "30px", display: "block",color:"grey",fontSize:"small"}}>ที่มา: การสำรวจความคิดเห็น, 2566</Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid container direction="row" justifyContent="center" justifyItems="center" alignContent="center" alignItems="center" spacing={2} sx={{ mt: '40px !important', ml: '30px' }}  style={{marginTop: '40px !important'}}>
                                            <Grid item alignContent="center" alignItems="center" xs={12} sm={12} md={12} lg={12}>
                                                <Typography variant="h5" >
                                                    ความคิดเห็นเกี่ยวกับการหลุดพ้นความยากจนของบุตร/หลาน
                                                </Typography>
                                            </Grid>
                                            <Grid item alignContent="center" alignItems="center" xs={12} sm={12} md={12} lg={12}>
                                                <BarChart
                                                    dataset={dataGraph1011.dataGraph11.graph11_2.dataSet}
                                                    yAxis={[{
                                                        scaleType: 'band',
                                                        dataKey: 'graph11_2LevelData',
                                                        labelStyle: { width: '100px' },
                                                        hideTooltip: true
                                                    }]}
                                                    series={[
                                                        { dataKey: 'graph11_2Data' }
                                                    ]}
                                                    tickInterval={1}
                                                    layout="horizontal"
                                                    {...graph11_2ChartSetting}
                                                    margin={{ top: 50, bottom: 50, left: 650, right: 50 }}
                                                    grid={{ vertical: true }}
                                                />
                                                <Typography variant="subtitle" sx={{mb: "30px", display: "block",color:"grey",fontSize:"small"}}>ที่มา: การสำรวจความคิดเห็น, 2566</Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Box>
                            <Menu
                                anchorEl={menu}
                                id="account-menu"
                                open={openMenu}
                                onClose={() => { setMenu(null) }}
                                onClick={() => { setMenu(null) }}
                                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                            >
                                <MenuItem onClick={() => { window.location.pathname = '/'; }}>
                                    Dashboard
                                </MenuItem>
                                <MenuItem onClick={() => { window.location.pathname = '/static-data'; }}>
                                    ข้อมูลสถิติ
                                </MenuItem>
                                <MenuItem onClick={() => { window.location.pathname = '/developing-index'; }}>
                                    ตัวชี้วัดการพัฒนา
                                </MenuItem>
                                <MenuItem onClick={() => { window.location.pathname = '/analytic-data'; }}>
                                    ข้อมูลการวิเคราะห์
                                </MenuItem>
                            </Menu>
                        </>
                }
            </ThemeProvider>
        </React.Fragment>
    );
}