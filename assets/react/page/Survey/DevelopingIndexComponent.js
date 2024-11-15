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
import PropTypes, { array } from "prop-types";
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
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
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

export default function StaticDataComponent() {

    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState({
        factorId: 4,
        factorNameTH: 'การพัฒนาคน',
        factorNameEN: 'humanDeverlopment',
        subFactorId: 10,
        subFactorNameTH: 'สัดส่วนประชากรยากจน (ร้อยละ)'
    })

    const [search2, setSearch2] = useState({
        factorId: 5,
        factorNameTH: 'เศรษฐกิจและความมั่นคง',
        factorNameEN: 'economic',
        subFactorId: 18,
        subFactorNameTH: 'อัตราการว่างงาน (ร้อยละ)'
    })

    const [search3, setSearch3] = useState({
        factorId: 15,
        factorNameTH: 'สิ่งแวดล้อม',
        factorNameEN: 'environment',
        subFactorId: 16,
        subFactorNameTH: 'สัดส่วนปริมาณขยะที่กำจัดถูกต้องต่อปริมาณขยะที่เกิดขึ้น (ร้อยละ)'
    })

    const [search4, setSearch4] = useState({
        factorId: 6,
        factorNameTH: 'สันติและความยุติธรรม',
        factorNameEN: 'peace',
        subFactorId: 22,
        subFactorNameTH: 'การแจ้งความคดี ชีวิตร่างกาย เพศ และคดีประทุษร้ายต่อทรัพย์ (รายต่อประชากรแสนคน)'
    })

    const [search5, setSearch5] = useState({
        factorId: 7,
        factorNameTH: 'ความเป็นหุ้นส่วนการพัฒนา',
        factorNameEN: 'partnership',
        subFactorId: 24,
        subFactorNameTH: 'ประชากรที่เข้าถึงอินเทอร์เน็ต (ร้อยละ)'
    })

    const [developFactor, setDevelopFactor] = useState([
        {
            factorId: 4,
            factorNameTH: 'การพัฒนาคน',
            factorNameEN: 'humanDeverlopment',
            subFactorId: 10,
            subFactorNameTH: 'สัดส่วนประชากรยากจน (ร้อยละ)',
        }, {
            factorId: 4,
            factorNameTH: 'การพัฒนาคน',
            factorNameEN: 'humanDeverlopment',
            subFactorId: "11",
            subFactorNameTH: 'ทารกแรกเกิดที่มีน้ำหนักต่ำกว่าเกณฑ์ (ร้อยละ)',
        }, {
            factorId: 4,
            factorNameTH: 'การพัฒนาคน',
            factorNameEN: 'humanDeverlopment',
            subFactorId: 12,
            subFactorNameTH: 'อัตราส่วนประชากรต่อแพทย์ (คน/แพทย์)',
        }, {
            factorId: 4,
            factorNameTH: 'การพัฒนาคน',
            factorNameEN: 'humanDeverlopment',
            subFactorId: 13,
            subFactorNameTH: 'การเข้าเรียนมัธยมศึกษาตอนปลายและอาชีวศึกษา',
        }, {
            factorId: 4,
            factorNameTH: 'การพัฒนาคน',
            factorNameEN: 'humanDeverlopment',
            subFactorId: 14,
            subFactorNameTH: 'การเข้าเรียนมัธยมศึกษาตอนปลายและอาชีวศึกษา (ร้อยละ)',
        }
    ]);

    const [developFactor2, setDevelopFactor2] = useState([
        {
            factorId: 5,
            factorNameTH: 'เศรษฐกิจและความมั่นคง',
            factorNameEN: 'economic',
            subFactorId: 18,
            subFactorNameTH: 'อัตราการว่างงาน (ร้อยละ)',
        }, {
            factorId: 5,
            factorNameTH: 'เศรษฐกิจและความมั่นคง',
            factorNameEN: 'economic',
            subFactorId: 19,
            subFactorNameTH: 'อัตราส่วนหนี้เฉลี่ยต่อรายได้เฉลี่ยของครัวเรือน (เท่า)',
        }
    ]);

    const [developFactor3, setDevelopFactor3] = useState([
        {
            factorId: 15,
            factorNameTH: 'สิ่งแวดล้อม',
            factorNameEN: 'environment',
            subFactorId: 16,
            subFactorNameTH: 'สัดส่วนปริมาณขยะที่กำจัดถูกต้องต่อปริมาณขยะที่เกิดขึ้น (ร้อยละ)',
        }, {
            factorId: 15,
            factorNameTH: 'สิ่งแวดล้อม',
            factorNameEN: 'environment',
            subFactorId: 17,
            subFactorNameTH: 'ครัวเรือนที่เข้าถึงน้ำระปา (ร้อยละ)',
        }
    ]);

    const [developFactor4, setDevelopFactor4] = useState([
        {
            factorId: 6,
            factorNameTH: 'สันติและความยุติธรรม',
            factorNameEN: 'peace',
            subFactorId: 22,
            subFactorNameTH: 'การแจ้งความคดี ชีวิตร่างกาย เพศ และคดีประทุษร้ายต่อทรัพย์ (รายต่อประชากรแสนคน)',
        }, {
            factorId: 6,
            factorNameTH: 'สันติและความยุติธรรม',
            factorNameEN: 'peace',
            subFactorId: 23,
            subFactorNameTH: 'จำนวนเจ้าหน้าที่ตำรวจ (ต่อแสนคน)',
        }
    ]);

    const [developFactor5, setDevelopFactor5] = useState([
        {
            factorId: 7,
            factorNameTH: 'ความเป็นหุ้นส่วนการพัฒนา',
            factorNameEN: 'partnership',
            subFactorId: 24,
            subFactorNameTH: 'ประชากรที่เข้าถึงอินเทอร์เน็ต (ร้อยละ)',
        }, {
            factorId: 7,
            factorNameTH: 'ความเป็นหุ้นส่วนการพัฒนา',
            factorNameEN: 'partnership',
            subFactorId: 25,
            subFactorNameTH: 'จำนวนองค์กรชุมชน (แห่งต่อประชากรแสนคน)',
        }
    ]);

    const [menu, setMenu] = useState(null);
    const pathname = location.pathname;
    const openMenu = Boolean(menu);

    const [graph5, setGraph5] = useState([{
        dataset: [{
            data: [0],
            label: '',
            id: 'uDataId',
        }],
        label: [],
        graphNo: null,
        developFactor: null
    }])

    const [graph5_2, setGraph5_2] = useState([{
        dataset: [{
            data: [0],
            label: '',
            id: 'uDataId',
        }],
        label: [],
        graphNo: null,
        developFactor: null
    }])

    const [graph5_3, setGraph5_3] = useState([{
        dataset: [{
            data: [0],
            label: '',
            id: 'uDataId',
        }],
        label: [],
        graphNo: null,
        developFactor: null
    }])

    const [graph5_4, setGraph5_4] = useState([{
        dataset: [{
            data: [0],
            label: '',
            id: 'uDataId',
        }],
        label: [],
        graphNo: null,
        developFactor: null
    }])

    const [graph5_5, setGraph5_5] = useState([{
        dataset: [{
            data: [0],
            label: '',
            id: 'uDataId',
        }],
        label: [],
        graphNo: null,
        developFactor: null
    }])

    const fetchData = async () => {
        setLoading(true)

        let data = {}

        let dataFactor = await KuPovertyRatioApi.getFactor(data);
        ////console.log(dataFactor.data[4], dataFactor.data[5], dataFactor.data[6], dataFactor.data[7], dataFactor.data[15])

        let data5 = {
            provinceId: null,
            graphNo: 3,
            developFactor: "humanDeverlopment",
            developFactorId: 10
        }
        let dataList5 = await KuPovertyRatioApi.getDataGraph(data5);
        //console.log(dataList5.data);
        setGraph5(graph5 => ({ ...graph5, ...{ dataset: dataList5.data[0].dataset, label: dataList5.data[0].label, graphNo: dataList5.data[0].graphNo, developFactor: dataList5.data[0].developFactor } }))

        let data5_2 = {
            provinceId: null,
            graphNo: 3,
            developFactor: "economic",
            developFactorId: 18
        }
        let dataList5_2 = await KuPovertyRatioApi.getDataGraph(data5_2);
        //console.log(dataList5_2.data);

        setGraph5_2(graph5_2 => ({ ...graph5_2, ...{ dataset: dataList5_2.data[0].dataset, label: dataList5_2.data[0].label, graphNo: dataList5_2.data[0].graphNo, developFactor: dataList5_2.data[0].developFactor } }))

        let data5_3 = {
            provinceId: null,
            graphNo: 3,
            developFactor: "environment",
            developFactorId: 16
        }
        let dataList5_3 = await KuPovertyRatioApi.getDataGraph(data5_3);
        //console.log(dataList5_3.data);

        setGraph5_3(graph5_3 => ({ ...graph5_3, ...{ dataset: dataList5_3.data[0].dataset, label: dataList5_3.data[0].label, graphNo: dataList5_3.data[0].graphNo, developFactor: dataList5_3.data[0].developFactor } }))

        let data5_4 = {
            provinceId: null,
            graphNo: 3,
            developFactor: "peace",
            developFactorId: 22
        }
        let dataList5_4 = await KuPovertyRatioApi.getDataGraph(data5_4);
        //console.log(dataList5_4.data);

        setGraph5_4(graph5_4 => ({ ...graph5_4, ...{ dataset: dataList5_4.data[0].dataset, label: dataList5_4.data[0].label, graphNo: dataList5_4.data[0].graphNo, developFactor: dataList5_4.data[0].developFactor } }))

        let data5_5 = {
            provinceId: null,
            graphNo: 3,
            developFactor: "partnership",
            developFactorId: 24
        }
        let dataList5_5 = await KuPovertyRatioApi.getDataGraph(data5_5);
        //console.log(dataList5_5.data);

        setGraph5_5(graph5_5 => ({ ...graph5_5, ...{ dataset: dataList5_5.data[0].dataset, label: dataList5_5.data[0].label, graphNo: dataList5_5.data[0].graphNo, developFactor: dataList5_5.data[0].developFactor } }))


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
                                pathname === '/developing-index'
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
                                        <Link href="#developFactorChart1" color="inherit" sx={{ fontSize: { xs: '12px', sm: '12px', md: '12px', lg: '20px' }, fontFamily: 'Kanit' }}>ตัวชี้วัดการพัฒนาคน</Link>    
                                    </Grid>
                                    <Grid item alignContent="center" alignItems="center" justifyContent="center" justifyItems="center" xs="auto">
                                        <Link href="#developFactorChart2" color="inherit" sx={{ fontSize: { xs: '12px', sm: '12px', md: '12px', lg: '20px' }, fontFamily: 'Kanit' }}>ตัวชี้วัดเศรษฐกิจและความมั่นคง</Link>    
                                    </Grid>
                                    <Grid item alignContent="center" alignItems="center" justifyContent="center" justifyItems="center" xs="auto">
                                        <Link href="#developFactorChart3" color="inherit" sx={{ fontSize: { xs: '12px', sm: '12px', md: '12px', lg: '20px' }, fontFamily: 'Kanit' }}>ตัวชี้วัดสิ่งแวดล้อม</Link>    
                                    </Grid>
                                    <Grid item alignContent="center" alignItems="center" justifyContent="center" justifyItems="center" xs="auto">
                                        <Link href="#developFactorChart4" color="inherit" sx={{ fontSize: { xs: '12px', sm: '12px', md: '12px', lg: '20px' }, fontFamily: 'Kanit' }}>ตัวชี้วัดสันติและความยุติธรรม</Link>    
                                    </Grid>
                                    <Grid item alignContent="center" alignItems="center" justifyContent="center" justifyItems="center" xs="auto">
                                        <Link href="#developFactorChart5" color="inherit" sx={{ fontSize: { xs: '12px', sm: '12px', md: '12px', lg: '20px' }, fontFamily: 'Kanit' }}>ตัวชี้วัดความเป็นหุ้นส่วนการพัฒนา</Link>    
                                    </Grid>    
                                </Grid>
                            </Box>
                            <hr></hr>
                            <Box sx={{ px: '10px', pt: '0px', overflow: 'auto', backgroundColor: '#ffffff' }}>
                                <Grid container sx={{ pt: '10px' }}>
                                    <Grid container direction="row" sx={{ mt: '0px' }}>
                                        <Grid container direction="row" justifyContent="center" justifyItems="center" alignContent="center" alignItems="center" sx={{ ml: '0px' }}>
                                            <Grid container direction="row" alignItems="center" xs={12} sm={12} md={12} lg={12} id="developFactorChart1">
                                                <Grid item alignContent="center" alignItems="center" xs={6} sm={6} md={6} lg={6}>
                                                    <Typography variant="h5">
                                                        ตัวชี้วัดการพัฒนาคน
                                                    </Typography>
                                                    <Autocomplete
                                                        id="developFactor"
                                                        size="small"
                                                        value={search}
                                                        onChange={async (event, newValue) => {
                                                            if (newValue) {
                                                                //console.log(newValue)
                                                                setSearch(newValue)
                                                                // let data5 = {
                                                                //     provinceId: null,
                                                                //     graphNo: 3,
                                                                //     developFactor: "peace",
                                                                //     developFactorId: 22
                                                                // }

                                                                let data5 = {
                                                                    provinceId: null,
                                                                    graphNo: 3,
                                                                    developFactor: newValue.factorNameEN,
                                                                    developFactorId: newValue.subFactorId
                                                                }
                                                                let dataList5 = await KuPovertyRatioApi.getDataGraph(data5);
                                                                //console.log(dataList5.data)

                                                                if (typeof dataList5.data[0].dataset !== 'undefined') {
                                                                    setGraph5(graph5 => ({ ...graph5, ...{ dataset: dataList5.data[0].dataset, label: dataList5.data[0].label, graphNo: dataList5.data[0].graphNo, developFactor: dataList5.data[0].developFactor } }))
                                                                }

                                                                // if(count(dataList5)>0){
                                                                //     setGraph5(graph5 => ({ ...graph5, ...{ dataset: dataList5.data[0].dataset, label: dataList5.data[0].label, graphNo: dataList5.data[0].graphNo, developFactor: dataList5.data[0].developFactor } }))
                                                                // }else{
                                                                //     alert('ไม่พบข้อมูล'+newValue.subFactorNameTH)
                                                                // }

                                                            }
                                                        }}
                                                        options={developFactor}
                                                        getOptionLabel={(option) => option.subFactorNameTH}
                                                        renderInput={(params) => (
                                                            <TextField {...params} />
                                                        )}
                                                    />
                                                </Grid>
                                            </Grid>
                                            <Grid item alignContent="center" alignItems="center" xs={12} sm={12} md={12} lg={12}>
                                                <LineChart
                                                    
                                                    height={600}
                                                    series={graph5.dataset}
                                                    xAxis={[{ scaleType: 'point', data: graph5.label }]}
                                                    sx={{
                                                        '.MuiLineElement-root, .MuiMarkElement-root': {
                                                            strokeWidth: 1,
                                                        },
                                                        '.MuiLineElement-series-999': {
                                                            strokeDasharray: '3 4 5 2',
                                                        },
                                                        '.MuiMarkElement-root:not(.MuiMarkElement-highlighted)': {
                                                            fill: '#fff',
                                                        },
                                                        '& .MuiMarkElement-highlighted': {
                                                            stroke: 'none',
                                                        },

                                                    }}
                                                    margin={{ top: 100, bottom: 50, left: 100, right: 50 }}
                                                />
                                                <Typography variant="subtitle" sx={{ mb: "30px", display: "block", color: "grey", fontSize: "small" }}>ที่มา: สำนักงานสภาพัฒนาการเศรษฐกิจและสังคมแห่งชาติ, 2564 และ 2566</Typography>
                                            </Grid>
                                            <Grid container direction="row" alignItems="center" xs={12} sm={12} md={12} lg={12} id="developFactorChart2">
                                                <Grid item alignContent="center" alignItems="center" xs={6} sm={6} md={6} lg={6}>
                                                    <Typography variant="h5">
                                                        ตัวชี้วัดเศรษฐกิจและความมั่นคง
                                                    </Typography>
                                                    <Autocomplete
                                                        id="developFactor2"
                                                        size="small"
                                                        value={search2}
                                                        onChange={async (event, newValue) => {
                                                            if (newValue) {
                                                                //console.log(newValue)
                                                                setSearch2(newValue)

                                                                let data5 = {
                                                                    provinceId: null,
                                                                    graphNo: 3,
                                                                    developFactor: newValue.factorNameEN,
                                                                    developFactorId: newValue.subFactorId
                                                                }
                                                                let dataList5 = await KuPovertyRatioApi.getDataGraph(data5);
                                                                //console.log(dataList5.data)

                                                                if (typeof dataList5.data[0].dataset !== 'undefined') {
                                                                    setGraph5_2(graph5_2 => ({ ...graph5_2, ...{ dataset: dataList5.data[0].dataset, label: dataList5.data[0].label, graphNo: dataList5.data[0].graphNo, developFactor: dataList5.data[0].developFactor } }))
                                                                }
                                                            }
                                                        }}
                                                        options={developFactor2}
                                                        getOptionLabel={(option) => option.subFactorNameTH}
                                                        renderInput={(params) => (
                                                            <TextField {...params} />
                                                        )}
                                                    />
                                                </Grid>
                                            </Grid>
                                            <Grid item alignContent="center" alignItems="center" xs={12} sm={12} md={12} lg={12}>
                                                <LineChart
                                                    height={600}
                                                    series={graph5_2.dataset}
                                                    xAxis={[{ scaleType: 'point', data: graph5_2.label }]}
                                                    sx={{
                                                        '.MuiLineElement-root, .MuiMarkElement-root': {
                                                            strokeWidth: 1,
                                                        },
                                                        '.MuiLineElement-series-999': {
                                                            strokeDasharray: '3 4 5 2',
                                                        },
                                                        '.MuiMarkElement-root:not(.MuiMarkElement-highlighted)': {
                                                            fill: '#fff',
                                                        },
                                                        '& .MuiMarkElement-highlighted': {
                                                            stroke: 'none',
                                                        },

                                                    }}
                                                    margin={{ top: 100, bottom: 50, left: 100, right: 50 }}
                                                />
                                                <Typography variant="subtitle" sx={{ mb: "30px", display: "block", color: "grey", fontSize: "small" }}>ที่มา: สำนักงานสภาพัฒนาการเศรษฐกิจและสังคมแห่งชาติ, 2564 และ 2566</Typography>
                                            </Grid>
                                            <Grid container direction="row" alignItems="center" xs={12} sm={12} md={12} lg={12} id="developFactorChart3">
                                                <Grid item alignContent="center" alignItems="center" xs={6} sm={6} md={6} lg={6}>
                                                    <Typography variant="h5">
                                                        ตัวชี้วัดสิ่งแวดล้อม
                                                    </Typography>
                                                    <Autocomplete
                                                        id="developFactor3"
                                                        size="small"
                                                        value={search3}
                                                        onChange={async (event, newValue) => {
                                                            if (newValue) {
                                                                //console.log(newValue)
                                                                setSearch3(newValue)

                                                                let data5 = {
                                                                    provinceId: null,
                                                                    graphNo: 3,
                                                                    developFactor: newValue.factorNameEN,
                                                                    developFactorId: newValue.subFactorId
                                                                }
                                                                let dataList5 = await KuPovertyRatioApi.getDataGraph(data5);
                                                                //console.log(dataList5.data)

                                                                if (typeof dataList5.data[0].dataset !== 'undefined') {
                                                                    setGraph5_3(graph5_3 => ({ ...graph5_3, ...{ dataset: dataList5.data[0].dataset, label: dataList5.data[0].label, graphNo: dataList5.data[0].graphNo, developFactor: dataList5.data[0].developFactor } }))
                                                                }
                                                            }
                                                        }}
                                                        options={developFactor3}
                                                        getOptionLabel={(option) => option.subFactorNameTH}
                                                        renderInput={(params) => (
                                                            <TextField {...params} />
                                                        )}
                                                    />
                                                </Grid>
                                            </Grid>
                                            <Grid item alignContent="center" alignItems="center" xs={12} sm={12} md={12} lg={12}>
                                                <LineChart
                                                    
                                                    height={600}
                                                    series={graph5_3.dataset}
                                                    xAxis={[{ scaleType: 'point', data: graph5_3.label }]}
                                                    sx={{
                                                        '.MuiLineElement-root, .MuiMarkElement-root': {
                                                            strokeWidth: 1,
                                                        },
                                                        '.MuiLineElement-series-999': {
                                                            strokeDasharray: '3 4 5 2',
                                                        },
                                                        '.MuiMarkElement-root:not(.MuiMarkElement-highlighted)': {
                                                            fill: '#fff',
                                                        },
                                                        '& .MuiMarkElement-highlighted': {
                                                            stroke: 'none',
                                                        },

                                                    }}
                                                    margin={{ top: 100, bottom: 50, left: 100, right: 50 }}
                                                />
                                                <Typography variant="subtitle" sx={{ mb: "30px", display: "block", color: "grey", fontSize: "small" }}>ที่มา: สำนักงานสภาพัฒนาการเศรษฐกิจและสังคมแห่งชาติ, 2564 และ 2566</Typography>
                                            </Grid>
                                            <Grid container direction="row" alignItems="center" xs={12} sm={12} md={12} lg={12} id="developFactorChart4"> 
                                                <Grid item alignContent="center" alignItems="center" xs={6} sm={6} md={6} lg={6}>
                                                    <Typography variant="h5">
                                                        ตัวชี้วัดสันติและความยุติธรรม
                                                    </Typography>

                                                    <Autocomplete
                                                        id="developFactor4"
                                                        size="small"
                                                        value={search4}
                                                        onChange={async (event, newValue) => {
                                                            if (newValue) {
                                                                //console.log(newValue)
                                                                setSearch4(newValue)

                                                                let data5 = {
                                                                    provinceId: null,
                                                                    graphNo: 3,
                                                                    developFactor: newValue.factorNameEN,
                                                                    developFactorId: newValue.subFactorId
                                                                }
                                                                let dataList5 = await KuPovertyRatioApi.getDataGraph(data5);
                                                                //console.log(dataList5.data)

                                                                if (typeof dataList5.data[0].dataset !== 'undefined') {
                                                                    setGraph5_4(graph5_4 => ({ ...graph5_4, ...{ dataset: dataList5.data[0].dataset, label: dataList5.data[0].label, graphNo: dataList5.data[0].graphNo, developFactor: dataList5.data[0].developFactor } }))
                                                                }

                                                            }
                                                        }}
                                                        options={developFactor4}
                                                        getOptionLabel={(option) => option.subFactorNameTH}
                                                        renderInput={(params) => (
                                                            <TextField {...params} />
                                                        )}
                                                    />
                                                </Grid>
                                            </Grid>
                                            <Grid item alignContent="center" alignItems="center" xs={12} sm={12} md={12} lg={12}>
                                                <LineChart
                                                    
                                                    height={600}
                                                    series={graph5_4.dataset}
                                                    xAxis={[{ scaleType: 'point', data: graph5_4.label }]}
                                                    sx={{
                                                        '.MuiLineElement-root, .MuiMarkElement-root': {
                                                            strokeWidth: 1,
                                                        },
                                                        '.MuiLineElement-series-999': {
                                                            strokeDasharray: '3 4 5 2',
                                                        },
                                                        '.MuiMarkElement-root:not(.MuiMarkElement-highlighted)': {
                                                            fill: '#fff',
                                                        },
                                                        '& .MuiMarkElement-highlighted': {
                                                            stroke: 'none',
                                                        },

                                                    }}
                                                    margin={{ top: 100, bottom: 50, left: 100, right: 50 }}
                                                />
                                                <Typography variant="subtitle" sx={{ mb: "30px", display: "block", color: "grey", fontSize: "small" }}>ที่มา: สำนักงานสภาพัฒนาการเศรษฐกิจและสังคมแห่งชาติ, 2564 และ 2566</Typography>
                                            </Grid>
                                            <Grid container direction="row" alignItems="center" xs={12} sm={12} md={12} lg={12} id="developFactorChart5">
                                                <Grid item alignContent="center" alignItems="center" xs={6} sm={6} md={6} lg={6}>
                                                    <Typography variant="h5">
                                                        ตัวชี้วัดความเป็นหุ้นส่วนการพัฒนา
                                                    </Typography>
                                                    <Autocomplete
                                                        id="developFactor5"
                                                        size="small"
                                                        value={search5}
                                                        onChange={async (event, newValue) => {
                                                            if (newValue) {
                                                                //console.log(newValue)
                                                                setSearch5(newValue)

                                                                let data5 = {
                                                                    provinceId: null,
                                                                    graphNo: 3,
                                                                    developFactor: newValue.factorNameEN,
                                                                    developFactorId: newValue.subFactorId
                                                                }
                                                                let dataList5 = await KuPovertyRatioApi.getDataGraph(data5);
                                                                //console.log(dataList5.data)

                                                                if (typeof dataList5.data[0].dataset !== 'undefined') {
                                                                    setGraph5_5(graph5_5 => ({ ...graph5_5, ...{ dataset: dataList5.data[0].dataset, label: dataList5.data[0].label, graphNo: dataList5.data[0].graphNo, developFactor: dataList5.data[0].developFactor } }))
                                                                }
                                                            }
                                                        }}
                                                        options={developFactor5}
                                                        getOptionLabel={(option) => option.subFactorNameTH}
                                                        renderInput={(params) => (
                                                            <TextField {...params} />
                                                        )}
                                                    />
                                                </Grid>
                                            </Grid>
                                            <Grid item alignContent="center" alignItems="center" xs={12} sm={12} md={12} lg={12}>
                                                <LineChart
                                                    
                                                    height={600}
                                                    series={graph5_5.dataset}
                                                    xAxis={[{ scaleType: 'point', data: graph5_5.label }]}
                                                    sx={{
                                                        '.MuiLineElement-root, .MuiMarkElement-root': {
                                                            strokeWidth: 1,
                                                        },
                                                        '.MuiLineElement-series-999': {
                                                            strokeDasharray: '3 4 5 2',
                                                        },
                                                        '.MuiMarkElement-root:not(.MuiMarkElement-highlighted)': {
                                                            fill: '#fff',
                                                        },
                                                        '& .MuiMarkElement-highlighted': {
                                                            stroke: 'none',
                                                        },

                                                    }}
                                                    margin={{ top: 100, bottom: 50, left: 100, right: 50 }}
                                                />
                                                <Typography variant="subtitle" sx={{ mb: "30px", display: "block", color: "grey", fontSize: "small" }}>ที่มา: สำนักงานสภาพัฒนาการเศรษฐกิจและสังคมแห่งชาติ, 2564 และ 2566</Typography>
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