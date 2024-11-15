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
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";


const theme = createTheme({
    typography: {
        allVariants: {
            fontFamily: 'Kanit',
            textTransform: 'none',
            // fontSize: 16,
        },
    },
});

export default function SurveyComponent() {

    function valuetext(value) {
        return value;
    }
    function governEq(ix1, ix2, ix3, ix4, ix5, ix6, ib0, ib1, ib2, ib3, ib4, ib5, ib6, ib7, ixD) {
        //ln(y) = b0+b1(lnx1)+b2(lnx2)+b3(lnx3)+b4(lnx4)+b5(lnx5)+b6(lnx6)+b7(D1)+eu;
        let ee = 0.1063
        let y = null;
        let lnY = null;
        let x1 = 1.0707
        let x2 = 0.2954 // สัดส่วนประชากรสูงวัย 60 ปี ขึ้นไป
        let x3 = 0.0395 // จำนวนคนต่างด้าวที่ได้รับอนุญาติทำงาน
        let x4 = 0.0430 // จำนวนรับแจ้งคดียาเสพติด
        let x5 = 0.1256 // จำนวนคดีความผิดเกี่ยวกับชีวิต ร่างกาย เพศ
        let x6 = 0.0979 // จำนวนแพทย์
        let D1 = 1
        let b0 = 46.3454 //ค่าสัมประสิทธ์คงที่
        let b1 = -9.9826
        let b2 = 0.0262
        let b3 = -0.4361
        let b4 = 0.0133
        let b5 = 0.5699
        let b6 = -0.4355
        //let b7 = 4.4245
        let b7 = 0.4173
        if (ix1) x1 = ix1; // สัดส่วนประชากรวัยกำลังแรงงาน 15-60 ปี
        if (ix2) x2 = ix2;
        if (ix3) x3 = ix3;
        if (ix4) x4 = ix4;
        if (ix5) x5 = ix5;
        if (ix6) x6 = ix6;
        if (ixD) D1 = ixD;
        if (ib0) b0 = ib0;
        if (ib1) b1 = ib1;
        if (ib2) b2 = ib2;
        if (ib3) b3 = ib3;
        if (ib4) b4 = ib4;
        if (ib5) b5 = ib5;
        if (ib6) b6 = ib6;
        if (ib7) b7 = ib7;
        y = b0 + (b1 * x1) + (b2 * x2) + (b3 * x3) + (b4 * x4) + (b5 * x5) + (b6 * x6) + (b7 * D1)
        //console.log('y : ' + y + '---b0 : ' + b0 + '---b1 : ' + b1 + '---b2 : ' + b2 + '---b3 : ' + b3 + '---b4 : ' + b4 + '---b5 : ' + b5 + '---b6 : ' + b6 + '---b7 : ' + b7 + '---x1 : ' + x1 + '---x2 : ' + x2 + '---x3 : ' + x3 + '---x4 : ' + x4 + '---x5 : ' + x5 + '---x6 : ' + x6)
        return y.toFixed(4);
        //lnY = Math.log(y)
        // if (!isNaN(lnY)) return lnY.toFixed(4);
        // else {
        //     Swal.fire({
        //         title: '',
        //         text: 'ไม่สามารถคำนวณค่าได้',
        //         icon: 'error',
        //         confirmButtonColor: '#3085d6',
        //         confirmButtonText: 'ตกลง'
        //     }).then(async (result) => {
        //         if (result.isConfirmed) {
        //         } else if (result.dismiss === Swal.DismissReason.cancel) {
        //         }
        //     })
        // }
    }
    const handleChangee = (event, newValue) => {
        let b0 = 46.3454 //ค่าสัมประสิทธ์คงที่
        let b7 = 4.4245
        let b1 = -9.9826 // สัดส่วนประชากรวัยกำลังแรงงาน 15-60 ปี
        let x1 = 1.0707
        let b2 = 0.0262 // สัดส่วนประชากรสูงวัย 60 ปี ขึ้นไป
        //let x2 = 0.2954
        let x2 = newValue
        let b3 = -0.4361 // จำนวนคนต่างด้าวที่ได้รับอนุญาติทำงาน
        let x3 = 0.0395
        let b4 = 0.0133 // จำนวนรับแจ้งคดียาเสพติด
        let x4 = 0.0430
        let b5 = 0.5699 // จำนวนคดีความผิดเกี่ยวกับชีวิต ร่างกาย เพศ
        let x5 = 0.1256
        let b6 = -0.4355 // จำนวนแพทย์
        let x6 = 0.0979
        let D1 = 1
        let ee = 0.1063
        let y = null;
        let lnY = null;
        //ln(y) = b0+b1(lnx1)+b2(lnx2)+b3(lnx3)+b4(lnx4)+b5(lnx5)+b6(lnx6)+b7(D1)+eu;

        y = b0 + (b1 * Math.log(x1)) + (b2 * Math.log(x2)) + (b3 * Math.log(x3)) + (b4 * Math.log(x4)) + (b5 * Math.log(x5)) + (b6 * Math.log(x6)) + (b7 * D1) + ee
        lnY = Math.log(y)
        //console.log(lnY)
        //Math.exp(x0)
        setMeterValue(lnY.toFixed(4))
    };
    const handleChangeX1 = (event, newValue) => {
        let theLnX1 = Math.log(newValue)
        if (theLnX1 !== -Infinity) {
            let lnY = governEq(theLnX1, meterLnValueX2, meterLnValueX3, meterLnValueX4, meterLnValueX5, meterLnValueX6, valueB0, valueB1, valueB2, valueB3, valueB4, valueB5, valueB6, valueB7, valueD)
            if (!isNaN(lnY)) {
                setMeterValueX1(newValue.toFixed(4))
                setMeterLnValueX1(theLnX1.toFixed(4))
                if (lnY) {
                    let theLnY = Math.exp(lnY)
                    setMeterValue(theLnY.toFixed(4))
                    setMeterLnValue(lnY)
                }
            } else {
                Swal.fire({
                    title: '',
                    text: 'ไม่สามารถคำนวณค่าได้',
                    icon: 'error',
                    // showCancelButton: true,
                    // cancelButtonText: 'ยกเลิก',
                    confirmButtonColor: '#3085d6',
                    // cancelButtonColor: '#d33',
                    confirmButtonText: 'ตกลง'
                }).then(async (result) => {
                    if (result.isConfirmed) {
                    } else if (result.dismiss === Swal.DismissReason.cancel) {
                    }
                })
            }
        } else {
            Swal.fire({
                title: '',
                text: 'ไม่สามารถคำนวณค่าได้',
                icon: 'error',
                // showCancelButton: true,
                // cancelButtonText: 'ยกเลิก',
                confirmButtonColor: '#3085d6',
                // cancelButtonColor: '#d33',
                confirmButtonText: 'ตกลง'
            }).then(async (result) => {
                if (result.isConfirmed) {
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                }
            })
        }
    };
    const handleChangeX2 = (event, newValue) => {
        let theLnX2 = Math.log(newValue)
        if (theLnX2 !== -Infinity) {
            let lnY = governEq(meterLnValueX1, theLnX2, meterLnValueX3, meterLnValueX4, meterLnValueX5, meterLnValueX6, valueB0, valueB1, valueB2, valueB3, valueB4, valueB5, valueB6, valueB7, valueD)
            if (!isNaN(lnY)) {
                setMeterValueX2(newValue.toFixed(4))
                setMeterLnValueX2(theLnX2.toFixed(4))
                if (lnY) {
                    let theLnY = Math.exp(lnY)
                    setMeterValue(theLnY.toFixed(4))
                    setMeterLnValue(lnY)
                }
            } else {
                Swal.fire({
                    title: '',
                    text: 'ไม่สามารถคำนวณค่าได้',
                    icon: 'error',
                    // showCancelButton: true,
                    // cancelButtonText: 'ยกเลิก',
                    confirmButtonColor: '#3085d6',
                    // cancelButtonColor: '#d33',
                    confirmButtonText: 'ตกลง'
                }).then(async (result) => {
                    if (result.isConfirmed) {
                    } else if (result.dismiss === Swal.DismissReason.cancel) {
                    }
                })
            }
        } else {
            Swal.fire({
                title: '',
                text: 'ไม่สามารถคำนวณค่าได้',
                icon: 'error',
                // showCancelButton: true,
                // cancelButtonText: 'ยกเลิก',
                confirmButtonColor: '#3085d6',
                // cancelButtonColor: '#d33',
                confirmButtonText: 'ตกลง'
            }).then(async (result) => {
                if (result.isConfirmed) {
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                }
            })
        }

    };
    const handleChangeLnX1 = (event, newValue) => {
        let lnY = governEq(newValue, meterLnValueX2, meterLnValueX3, meterLnValueX4, meterLnValueX5, meterLnValueX6, valueB0, valueB1, valueB2, valueB3, valueB4, valueB5, valueB6, valueB7, valueD)
        setMeterLnValueX1(newValue.toFixed(4))

        let theX1 = Math.exp(newValue)
        setMeterValueX1(theX1.toFixed(4))

        if (lnY) {
            let theLnY = Math.exp(lnY)
            setMeterValue(theLnY.toFixed(4))
            setMeterLnValue(lnY)
        }
    };
    const handleChangeLnX2 = (event, newValue) => {
        let lnY = governEq(meterLnValueX1, newValue, meterLnValueX3, meterLnValueX4, meterLnValueX5, meterLnValueX6, valueB0, valueB1, valueB2, valueB3, valueB4, valueB5, valueB6, valueB7, valueD)
        setMeterLnValueX2(newValue.toFixed(4))

        let theX2 = Math.exp(newValue)
        setMeterValueX2(theX2.toFixed(4))

        if (lnY) {
            let theLnY = Math.exp(lnY)
            setMeterValue(theLnY.toFixed(4))
            setMeterLnValue(lnY)
        }
    };
    const handleChangeLnX3 = (event, newValue) => {
        let lnY = governEq(meterLnValueX1, meterLnValueX2, newValue, meterLnValueX4, meterLnValueX5, meterLnValueX6, valueB0, valueB1, valueB2, valueB3, valueB4, valueB5, valueB6, valueB7, valueD)
        setMeterLnValueX3(newValue.toFixed(4))

        let theX3 = Math.exp(newValue)
        theX3 = Math.round(theX3)
        setMeterValueX3(theX3.toFixed(4))

        if (lnY) {
            let theLnY = Math.exp(lnY)
            setMeterValue(theLnY.toFixed(4))
            setMeterLnValue(lnY)
        }
    };
    const handleChangeLnX4 = (event, newValue) => {
        let lnY = governEq(meterLnValueX1, meterLnValueX2, meterLnValueX3, newValue, meterLnValueX5, meterLnValueX6, valueB0, valueB1, valueB2, valueB3, valueB4, valueB5, valueB6, valueB7, valueD)
        setMeterLnValueX4(newValue.toFixed(4))

        let theX4 = Math.exp(newValue)
        theX4 = Math.round(theX4)
        setMeterValueX4(theX4.toFixed(4))

        if (lnY) {
            let theLnY = Math.exp(lnY)
            setMeterValue(theLnY.toFixed(4))
            setMeterLnValue(lnY)
        }
    };
    const handleChangeLnX5 = (event, newValue) => {
        let lnY = governEq(meterLnValueX1, meterLnValueX2, meterLnValueX3, meterLnValueX4, newValue, meterLnValueX6, valueB0, valueB1, valueB2, valueB3, valueB4, valueB5, valueB6, valueB7, valueD)
        setMeterLnValueX5(newValue.toFixed(4))

        let theX5 = Math.exp(newValue)
        theX5 = Math.round(theX5)
        setMeterValueX5(theX5.toFixed(4))

        if (lnY) {
            let theLnY = Math.exp(lnY)
            setMeterValue(theLnY.toFixed(4))
            setMeterLnValue(lnY)
        }
    };
    const handleChangeLnX6 = (event, newValue) => {
        let lnY = governEq(meterLnValueX1, meterLnValueX2, meterLnValueX3, meterLnValueX4, meterLnValueX5, newValue, valueB0, valueB1, valueB2, valueB3, valueB4, valueB5, valueB6, valueB7, valueD)
        setMeterLnValueX6(newValue.toFixed(4))

        let theX6 = Math.exp(newValue)
        theX6 = Math.round(theX6)
        setMeterValueX5(theX6.toFixed(4))

        if (lnY) {
            let theLnY = Math.exp(lnY)
            setMeterValue(theLnY.toFixed(4))
            setMeterLnValue(lnY)
        }
    };
    const [meterValueY, setMeterValueY] = useState(0)
    const [meterValueX1, setMeterValueX1] = useState(0)
    const [meterValueX2, setMeterValueX2] = useState(0)
    const [meterValueX3, setMeterValueX3] = useState(0)
    const [meterValueX4, setMeterValueX4] = useState(0)
    const [meterValueX5, setMeterValueX5] = useState(0)
    const [meterValueX6, setMeterValueX6] = useState(0)

    const [meterLnValue, setMeterLnValue] = useState(0)
    const [meterLnValueX1, setMeterLnValueX1] = useState(0)
    const [meterLnValueX2, setMeterLnValueX2] = useState(0)
    const [meterLnValueX3, setMeterLnValueX3] = useState(0)
    const [meterLnValueX4, setMeterLnValueX4] = useState(0)
    const [meterLnValueX5, setMeterLnValueX5] = useState(0)
    const [meterLnValueX6, setMeterLnValueX6] = useState(0)

    const [valueB0, setValueB0] = useState(0)
    const [valueB1, setValueB1] = useState(0)
    const [valueB2, setValueB2] = useState(0)
    const [valueB3, setValueB3] = useState(0)
    const [valueB4, setValueB4] = useState(0)
    const [valueB5, setValueB5] = useState(0)
    const [valueB6, setValueB6] = useState(0)
    const [valueB7, setValueB7] = useState(0)
    const [valueD, setValueD] = useState(0)
    const [search, setSearch] = useState({
        province: {
            provinceId: 105,
            province: 'มุกดาหาร',
            d: 1
        },
        year: {
            year: '2560'
        },
        toYear: {
            year: '2564'
        },
        x1: true,
        x2: true,
        x3: true,
        x4: true,
        x5: true,
        x6: true
    })

    const [search2, setSearch2] = useState({
        province: {
            provinceId: 105,
            province: 'มุกดาหาร',
            d: 1
        },
        year: {
            year: '2560'
        },
        toYear: {
            year: '2564'
        },
        x1: true,
        x2: true,
        x3: true,
        x4: true,
        x5: true,
        x6: true
    })

    const [meterValue, setMeterValue] = useState(0)
    const [aXaxis, setAXaxis] = useState([
        {
            scaleType: 'band',
            data: [],
            id: 'years',
            label: 'years',
        },
    ]);
    const [aYaxis, setAYaxis] = useState([
        {
            type: 'line',
            id: 'provertyRatio',
            yAxisKey: 'provertyRatio',
            data: [],
            label: 'provertyRatio',
        }
    ]);
    const [loading, setLoading] = useState(true);
    const [dialogResetPassword, setDialogResetPassword] = useState(false);
    const [values, setValues] = useState({
        textmask: '(100) 000-0000',
        numberformat: '1320',
    });
    const [configData, setConfigData] = useState([{
        max: 10,
        min: 1,
        coefficient0: {
            b0: 46.3254,
            b1: -9.9826,
            b2: 0.0262,
            b3: -0.4361,
            b4: 0.0133,
            b5: 0.5699,
            b6: -0.4355,
            b7: 0.5,
            d: 0,
            id: 2
        },
        coefficient1: {
            b0: 46.3254,
            b1: -9.9826,
            b2: 0.0262,
            b3: -0.4361,
            b4: 0.0133,
            b5: 0.5699,
            b6: -0.4355,
            b7: 0.5,
            d: 1,
            id: 2
        },
        province: {
            province_id: 396,
            province: "เลย",
            d: 1
        },
        years: {
            year: "2560"
        }
    }]);
    const [withArea, setWithArea] = useState(false);
    const [highlighted, setHighlighted] = useState('item');
    const [faded, setFaded] = useState('global');
    const [provinces, setProvinces] = useState([
        {
            provinceId: 101,
            province: 'ขอนแก่น',
            d: 0
        },
        {
            provinceId: 102,
            province: 'อุดรธานี',
            d: 0
        },
        {
            provinceId: 103,
            province: 'เลย',
            d: 1
        },
        {
            provinceId: 104,
            province: 'หนองคาย',
            d: 1
        }
    ]);
    const [years, setYears] = useState([
        {
            year: '2560'
        }, {
            year: '2561'
        }, {
            year: '2562'
        }, {
            year: '2563'
        }
    ]);
    const [open, setOpen] = useState(false);
    const [menu, setMenu] = useState(null);
    const pathname = location.pathname;
    const openMenu = Boolean(menu);
    //const [checked, setChecked] = React.useState(true);
    const barChartsParams = {
        series: [
            { data: [3, 4, 1, 6, 5], label: 'A' },
            { data: [4, 3, 1, 5, 8], label: 'B' },
            { data: [4, 2, 5, 4, 1], label: 'C' },
        ],
        height: 400,
    };
    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });
    };
    const handleChange1 = async (event) => {
        setSearch2(search2 => ({ ...search2, ...{ x1: event.target.checked } }))
        //setChecked([event.target.checked, checked[1]]);
        setAXaxis([{
            scaleType: 'band',
            data: [],
            id: 'years',
            label: 'years',
        }])
        setAYaxis([{
            type: 'line',
            id: 'provertyRatio',
            yAxisKey: 'provertyRatio',
            data: [],
            label: 'provertyRatio',
        }])

        let data = {
            provinceId: search2.province.provinceId ? search2.province.provinceId : search2.province.province_id,
            year: search2.year.year,
            toYear: search2.toYear.year,
            x1: event.target.checked,
            x2: search2.x2,
            x3: search2.x3,
            x4: search2.x4,
            x5: search2.x5,
            x6: search2.x6
        }

        //console.log(search2.province)

        let dataList = await KuPovertyRatioApi.getDataFromList(data);
        //console.log(dataList.data[0][1])
        //console.log(aYaxis)
        setAXaxis(dataList.data[0][0])
        setAYaxis(dataList.data[0][1])
    };
    const handleChange2 = async (event) => {
        setSearch2(search2 => ({ ...search2, ...{ x2: event.target.checked } }))
        //setChecked([event.target.checked, checked[1]]);
        setAXaxis([{
            scaleType: 'band',
            data: [],
            id: 'years',
            label: 'years',
        }])
        setAYaxis([{
            type: 'line',
            id: 'provertyRatio',
            yAxisKey: 'provertyRatio',
            data: [],
            label: 'provertyRatio',
        }])

        let data = {
            provinceId: search2.province.provinceId ? search2.province.provinceId : search2.province.province_id,
            year: search2.year.year,
            toYear: search2.toYear.year,
            x1: search2.x1,
            x2: event.target.checked,
            x3: search2.x3,
            x4: search2.x4,
            x5: search2.x5,
            x6: search2.x6
        }

        //console.log(search.province)

        let dataList = await KuPovertyRatioApi.getDataFromList(data);
        //console.log(dataList.data[0][1])
        //console.log(aYaxis)
        setAXaxis(dataList.data[0][0])
        setAYaxis(dataList.data[0][1])
    };
    const handleChange3 = async (event) => {
        setSearch2(search2 => ({ ...search2, ...{ x3: event.target.checked } }))
        //setChecked([event.target.checked, checked[1]]);
        setAXaxis([{
            scaleType: 'band',
            data: [],
            id: 'years',
            label: 'years',
        }])
        setAYaxis([{
            type: 'line',
            id: 'provertyRatio',
            yAxisKey: 'provertyRatio',
            data: [],
            label: 'provertyRatio',
        }])

        let data = {
            provinceId: search2.province.provinceId ? search2.province.provinceId : search2.province.province_id,
            year: search2.year.year,
            toYear: search2.toYear.year,
            x1: search2.x1,
            x2: search2.x2,
            x3: event.target.checked,
            x4: search2.x4,
            x5: search2.x5,
            x6: search2.x6
        }

        //console.log(search.province)

        let dataList = await KuPovertyRatioApi.getDataFromList(data);
        //console.log(dataList.data[0][1])
        //console.log(aYaxis)
        setAXaxis(dataList.data[0][0])
        setAYaxis(dataList.data[0][1])
    };
    const handleChange4 = async (event) => {
        setSearch2(search2 => ({ ...search2, ...{ x4: event.target.checked } }))
        //setChecked([event.target.checked, checked[1]]);
        setAXaxis([{
            scaleType: 'band',
            data: [],
            id: 'years',
            label: 'years',
        }])
        setAYaxis([{
            type: 'line',
            id: 'provertyRatio',
            yAxisKey: 'provertyRatio',
            data: [],
            label: 'provertyRatio',
        }])

        let data = {
            provinceId: search2.province.provinceId ? search2.province.provinceId : search2.province.province_id,
            year: search2.year.year,
            toYear: search2.toYear.year,
            x1: search2.x1,
            x2: search2.x2,
            x3: search2.x3,
            x4: event.target.checked,
            x5: search2.x5,
            x6: search2.x6
        }

        //console.log(search.province)

        let dataList = await KuPovertyRatioApi.getDataFromList(data);
        //console.log(dataList.data[0][1])
        //console.log(aYaxis)
        setAXaxis(dataList.data[0][0])
        setAYaxis(dataList.data[0][1])
    };
    const handleChange5 = async (event) => {
        setSearch2(search2 => ({ ...search2, ...{ x5: event.target.checked } }))
        //setChecked([event.target.checked, checked[1]]);
        setAXaxis([{
            scaleType: 'band',
            data: [],
            id: 'years',
            label: 'years',
        }])
        setAYaxis([{
            type: 'line',
            id: 'provertyRatio',
            yAxisKey: 'provertyRatio',
            data: [],
            label: 'provertyRatio',
        }])

        let data = {
            provinceId: search2.province.provinceId ? search2.province.provinceId : search2.province.province_id,
            year: search2.year.year,
            toYear: search2.toYear.year,
            x1: search2.x1,
            x2: search2.x2,
            x3: search2.x3,
            x4: search2.x4,
            x5: event.target.checked,
            x6: search2.x6
        }

        //console.log(search.province)

        let dataList = await KuPovertyRatioApi.getDataFromList(data);
        //console.log(dataList.data[0][1])
        //console.log(aYaxis)
        setAXaxis(dataList.data[0][0])
        setAYaxis(dataList.data[0][1])
    };
    const handleChange6 = async (event) => {
        setSearch2(search2 => ({ ...search2, ...{ x6: event.target.checked } }))
        //setChecked([event.target.checked, checked[1]]);
        setAXaxis([{
            scaleType: 'band',
            data: [],
            id: 'years',
            label: 'years',
        }])
        setAYaxis([{
            type: 'line',
            id: 'provertyRatio',
            yAxisKey: 'provertyRatio',
            data: [],
            label: 'provertyRatio',
        }])

        let data = {
            provinceId: search2.province.provinceId ? search2.province.provinceId : search2.province.province_id,
            year: search2.year.year,
            toYear: search2.toYear.year,
            x1: search2.x1,
            x2: search2.x2,
            x3: search2.x3,
            x4: search2.x4,
            x5: search2.x5,
            x6: event.target.checked
        }

        //console.log(search.province)

        let dataList = await KuPovertyRatioApi.getDataFromList(data);
        //console.log(dataList.data[0][1])
        //console.log(aYaxis)
        setAXaxis(dataList.data[0][0])
        setAYaxis(dataList.data[0][1])
    };
    const NumericFormatCustom = React.forwardRef(
        function NumericFormatCustom(props, ref) {
            const { onChange, ...other } = props;

            return (
                <NumericFormat
                    {...other}
                    getInputRef={ref}
                    onValueChange={(values) => {
                        onChange({
                            target: {
                                name: props.name,
                                value: values.value,
                            },
                        });
                    }}
                    thousandSeparator
                    valueIsNumericString
                />
            );
        },
    );
    NumericFormatCustom.propTypes = {
        name: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired,
    };

    const fetchData = async () => {
        setLoading(true)

        let masterData = await KuPovertyRatioApi.getMaster(data);
        setConfigData(configData => ({ ...configData, ...{ max: masterData.data.max } }))
        //setConfigData(configData => ({ ...configData, ...{ max: 100 } }))
        setConfigData(configData => ({ ...configData, ...{ min: masterData.data.minimumValue } }))
        setConfigData(configData => ({ ...configData, ...{ coefficient0: masterData.data.coefficient0 } }))
        setConfigData(configData => ({ ...configData, ...{ coefficient1: masterData.data.coefficient1 } }))
        setConfigData(configData => ({ ...configData, ...{ province: masterData.data.province } }))
        setConfigData(configData => ({ ...configData, ...{ year: masterData.data.year } }))
        let countYear = masterData.data.year.length - 1
        //setYears(configData.year)
        //setProvinces(configData.province)
        setValueB0(masterData.data.coefficient1.b0)
        setValueB1(masterData.data.coefficient1.b1)
        setValueB2(masterData.data.coefficient1.b2)
        setValueB3(masterData.data.coefficient1.b3)
        setValueB4(masterData.data.coefficient1.b4)
        setValueB5(masterData.data.coefficient1.b5)
        setValueB6(masterData.data.coefficient1.b6)
        setValueB7(masterData.data.coefficient1.b7)
        setValueD(masterData.data.coefficient1.d)

        let dataT = {
            provinceId: masterData.data.province[0].province_id,
            yearFrom: masterData.data.year[0].year,
            province: masterData.data.province[0].province,
            d: 1
        }

        let povertyRatio = await KuPovertyRatioApi.getDataByProvinceAndYear(dataT);
        //console.log(povertyRatio.data[0])
        setSearch({
            province: {
                provinceId: masterData.data.province[0].province_id,
                province: masterData.data.province[0].province,
                d: 1
            },
            year: {
                year: masterData.data.year[0].year
            },
            toYear: {
                year: masterData.data.year[countYear].year
            },
            x1: true,
            x2: true,
            x3: true,
            x4: true,
            x5: true,
            x6: true
        })

        setSearch2({
            province: {
                provinceId: masterData.data.province[0].province_id,
                province: masterData.data.province[0].province,
                d: 1
            },
            year: {
                year: masterData.data.year[0].year
            },
            toYear: {
                year: masterData.data.year[countYear].year
            },
            x1: true,
            x2: true,
            x3: true,
            x4: true,
            x5: true,
            x6: true
        })

        setMeterValueX1((povertyRatio.data[0].x1).toFixed(4))
        setMeterValueX2((povertyRatio.data[0].x2).toFixed(4))
        setMeterValueX3((povertyRatio.data[0].x3))
        setMeterValueX4((povertyRatio.data[0].x4))
        setMeterValueX5((povertyRatio.data[0].x5))
        setMeterValueX6((povertyRatio.data[0].x6))
        setMeterValue((povertyRatio.data[0].y))
        //let lnY = governEq(meterValueX1, meterValueX2, meterValueX3, meterValueX4, meterValueX5, meterValueX6, valueB0, valueB1, valueB2, valueB3, valueB4, valueB5, valueB6, valueB7, valueD)
        //setMeterValue(povertyRatio.data[0].y.toFixed(4))

        setMeterLnValueX1((Math.log(povertyRatio.data[0].x1)).toFixed(4))
        setMeterLnValueX2((Math.log(povertyRatio.data[0].x2)).toFixed(4))
        setMeterLnValueX3((Math.log(povertyRatio.data[0].x3)).toFixed(4))
        setMeterLnValueX4((Math.log(povertyRatio.data[0].x4)).toFixed(4))
        setMeterLnValueX5((Math.log(povertyRatio.data[0].x5)).toFixed(4))
        setMeterLnValueX6((Math.log(povertyRatio.data[0].x6)).toFixed(4))
        let lnY = governEq(Math.log(povertyRatio.data[0].x1), Math.log(povertyRatio.data[0].x2), Math.log(povertyRatio.data[0].x3), Math.log(povertyRatio.data[0].x4), Math.log(povertyRatio.data[0].x5), Math.log(povertyRatio.data[0].x6), masterData.data.coefficient1.b0, masterData.data.coefficient1.b1, masterData.data.coefficient1.b2, masterData.data.coefficient1.b3, masterData.data.coefficient1.b4, masterData.data.coefficient1.b5, masterData.data.coefficient1.b6, masterData.data.coefficient1.b7, masterData.data.coefficient1.d)
        setMeterLnValue(lnY)

        setAXaxis([{
            scaleType: 'band',
            data: [],
            id: 'years',
            label: 'Quarters',
        }])
        setAYaxis([{
            type: 'line',
            id: 'revenue',
            yAxisKey: 'provertyRatio',
            data: [],
        }])
        let data = {
            provinceId: povertyRatio.data[0].provinceId,
            year: masterData.data.year[0].year,
            toYear: masterData.data.year[countYear].year,
            x1: true,
            x2: true,
            x3: true,
            x4: true,
            x5: true,
            x6: true
        }

        ////console.log(data)

        let dataList = await KuPovertyRatioApi.getDataFromList(data);
        ////console.log(dataList.data)
        ////console.log(aYaxis)
        setAXaxis(dataList.data[0][0])
        setAYaxis(dataList.data[0][1])

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

    const handleChangeNumber = (event) => {
        // Remove non-numeric characters
        const newValue = event.target.value.replace(/\D/g, '');

        // Add your desired formatting logic here
        // For example, if you want to format it as a currency (e.g., $1,000.00)
        const formattedValue = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(newValue / 100); // Assuming newValue represents cents

        return formattedValue;
        // setValue(formattedValue);
    };
    const graph1_9 = [{
        dataset: [
            {
                data: [532353,
                    539553,
                    618382,
                    631965,
                    644267,
                    654676,
                    665620,
                    670265,
                    676583,
                    684140],
                label: 'ตาก',
                id: 'uDataId',
            }, {
                data: [1204660,
                    1207699,
                    1277950,
                    1282544,
                    1287615,
                    1292130,
                    1298304,
                    1295026,
                    1298425,
                    1299636],
                label: 'เชียงราย',
                id: 'pDataId',
            }
        ],
        label: [
            '2556',
            '2557',
            '2558',
            '2559',
            '2560',
            '2561',
            '2562',
            '2563',
            '2564',
            '2565'
        ],
        graphNo: 1,
        developFactor: 1
    }]
    const uData = [532353,
        539553,
        618382,
        631965,
        644267,
        654676,
        665620,
        670265,
        676583,
        684140];
    const pData = [1204660,
        1207699,
        1277950,
        1282544,
        1287615,
        1292130,
        1298304,
        1295026,
        1298425,
        1299636];
    const xLabels = [
        '2556',
        '2557',
        '2558',
        '2559',
        '2560',
        '2561',
        '2562',
        '2563',
        '2564',
        '2565'
    ];
    const graph3Data1 = [166.44602,
        94.479687,
        73.363996,
        108.51223,
        70.989];
    const graph3Data2 = [127.87968,
        124.31722,
        100.70509,
        95.440653,
        68.016];
    const graph3Data3 = [144.202,
        157.55928,
        113.40213,
        99.732779,
        69.86];
    const graph3Data4 = [46.106394,
        55.907372,
        46.277725,
        61.18251,
        56.386];
    const graph3Data5 = [50.323117,
        105.73506,
        98.310262,
        100.43941,
        100.063];
    const graph3Data6 = [21.450122,
        22.684037,
        26.245219,
        30.550732,
        17.022];
    const graph3XLabels = [
        '2560',
        '2561',
        '2562',
        '2563',
        '2564'
    ];
    const graph4Data1 = [76113.283,
        75347.89,
        79498.871,
        82798.981,
        87121.569];
    const graph4Data2 = [89489.441,
        91044.684,
        93018.908,
        89036.041,
        90202.844];
    const graph4Data3 = [93337.167,
        112723.94,
        129382.64,
        118601.16,
        114952.43];
    const graph4Data4 = [104756.61,
        104891.39,
        101861.42,
        108395.25,
        105256.24];
    const graph4Data5 = [1620.357,
        1634.999,
        1649.17,
        1662.851,
        1676.0155];
    const graph4Data6 = [170855.18,
        153443.89,
        163903.54,
        172154.85,
        160024.94];
    const graph4XLabels = [
        '2560',
        '2561',
        '2562',
        '2563',
        '2564'
    ];
    const graph5Data0 = [7.49,
        9.22,
        8.36,
        8.65,
        6.25,
        6.75,
        5.62];
    const graph5Data1 = [24.48,
        27.54,
        27.16,
        29.6,
        21.25,
        18.65,
        13.04];
    const graph5Data2 = [17.22,
        15.78,
        11.02,
        10.76,
        8.75,
        8.32,
        5.96];
    const graph5Data3 = [12.76,
        20.12,
        14.24,
        10.41,
        13.18,
        8.08,
        2.82];
    const graph5Data4 = [16.64,
        30.24,
        29.47,
        16.85,
        13.18,
        19.65,
        12.95];
    const graph5Data5 = [11.37,
        14.01,
        8.12,
        8.5,
        9.73,
        11.21,
        6.19];
    const graph5Data6 = [12.06,
        16.62,
        17.42,
        20.75,
        16.88,
        21.94,
        19.9];
    const graph5Data7 = [2.11,
        8.22,
        3.11,
        6.47,
        5.96,
        6.04,
        5.97];
    const graph5XLabels = [
        '2558',
        '2559',
        '2560',
        '2561',
        '2562',
        '2563',
        '2564'
    ];
    const graph10Arr = [{
        dataset: [
            {
                data: [90,
                    90,
                    105],
                label: 'น้อยที่สุด',
                id: '106',
            }, {
                data: [10,
                    12,
                    3],
                label: 'น้อย',
                id: '106',
            }, {
                data: [8,
                    6,
                    1],
                label: 'ปานกลาง',
                id: '106',
            }, {
                data: [1,
                    0,
                    0],
                label: 'มากที่สุด',
                id: '106',
            }
        ],
        label: ['ระดับผลกระทบ (คน/ร้อยละ)'],
        graphNo: 4,
        developFactor: 1
    }]
    const chartSetting = {
        xAxis: [
            {
                label: 'ระดับผลกระทบ (คน/ร้อยละ)',
            },
        ],
        width: 500,
        height: 400,
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
            },
        ],
        width: 500,
        height: 400,
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
    const data = [
        { label: 'ประถมศึกษา', value: 0, color: '#0088FE' },
        { label: 'มัธยมศึกษาตอนต้น', value: 2, color: '#00C49F' },
        { label: 'มัธยมศึกษาตอนปลาย', value: 1, color: '#FFBB28' },
    ];
    const sizing = {
        margin: { right: 50 },
        width: 200,
        height: 200
    };
    const TOTAL = data.map((item) => item.value).reduce((a, b) => a + b, 0);
    const getArcLabel = (params) => {
        const percent = params.value / TOTAL;
        return `${(percent * 100).toFixed(0)}%`;
    };
    const graph11Arr = [{
        dataset: [
            {
                value: 0,
                label: 'ประถมศึกษา',
                color: '#0088FE'
            }, {
                value: 2,
                label: 'มัธยมศึกษาตอนต้น',
                color: '#0088FE'
            }, {
                value: 1,
                label: 'มัธยมศึกษาตอนปลาย',
                color: '#0088FE'
            }
        ],
        label: null,
        graphNo: 4,
        developFactor: 1
    }]
    const data2 = [
        { label: 'ได้', value: 0, color: '#0088FE' },
        { label: 'ไม่ได้', value: 2, color: '#00C49F' }
    ];
    const sizing2 = {
        margin: { right: 50 },
        width: 200,
        height: 200
    };
    const TOTAL2 = data2.map((item) => item.value).reduce((a, b) => a + b, 0);
    const getArcLabel2 = (params) => {
        const percent = params.value / TOTAL2;
        return `${(percent * 100).toFixed(0)}%`;
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
                                pathname === '/'
                                    ?
                                    <>
                                        <AppBar position="static" sx={{ backgroundColor: 'rgba(250,207,101,0.58)', mb: '10px', mt: 0, width: '100%', pr: '0px !important', pl: '0px !important' }} elevation={1}>
                                            <Toolbar sx={{ width: '100%', pr: '0px !important', pl: '0px !important' }}>
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
                            <Box sx={{ px: '10px', pt: '0px', overflow: 'auto', backgroundColor: '#ffffff' }}>
                                <Grid container spacing={2} sx={{ pt: '10px' }}>
                                    <Grid item xs={12} sm={6} md={4} lg={4} >
                                        <Grid container direction="row">
                                            <Typography variant="subtitle1">จังหวัด</Typography>
                                        </Grid>
                                        <Autocomplete
                                            id="provinces"
                                            size="small"
                                            value={search.province}
                                            onChange={async (event, newValue) => {
                                                if (newValue) {
                                                    ////console.log(newValue)
                                                    setSearch(search => ({ ...search, ...{ province: newValue } }))
                                                    //console.log(search.province.province_id, search.year.year, search.province.province, search.province.d)
                                                    //setLoading(true)
                                                    if (search.year) {
                                                        let data = {
                                                            provinceId: newValue.province_id,
                                                            yearFrom: search.year.year,
                                                            province: newValue.province,
                                                            d: newValue.d
                                                        }

                                                        ////console.log(data)
                                                        let povertyRatio = await KuPovertyRatioApi.getDataByProvinceAndYear(data);
                                                        //console.log(povertyRatio.data)
                                                        setMeterValueX1(povertyRatio.data[0].x1.toFixed(4))
                                                        setMeterValueX2(povertyRatio.data[0].x2.toFixed(4))
                                                        setMeterValueX3(povertyRatio.data[0].x3)
                                                        setMeterValueX4(povertyRatio.data[0].x4)
                                                        setMeterValueX5(povertyRatio.data[0].x5)
                                                        setMeterValueX6(povertyRatio.data[0].x6)
                                                        setMeterValue(povertyRatio.data[0].y)

                                                        setMeterLnValueX1((Math.log(povertyRatio.data[0].x1)).toFixed(4))
                                                        setMeterLnValueX2((Math.log(povertyRatio.data[0].x2)).toFixed(4))
                                                        setMeterLnValueX3((Math.log(povertyRatio.data[0].x3)).toFixed(4))
                                                        setMeterLnValueX4((Math.log(povertyRatio.data[0].x4)).toFixed(4))
                                                        setMeterLnValueX5((Math.log(povertyRatio.data[0].x5)).toFixed(4))
                                                        setMeterLnValueX6((Math.log(povertyRatio.data[0].x6)).toFixed(4))
                                                        let lnY = governEq(Math.log(povertyRatio.data[0].x1), Math.log(povertyRatio.data[0].x2), Math.log(povertyRatio.data[0].x3), Math.log(povertyRatio.data[0].x4), Math.log(povertyRatio.data[0].x5), Math.log(povertyRatio.data[0].x6), valueB0, valueB1, valueB2, valueB3, valueB4, valueB5, valueB6, valueB7, valueD)
                                                        setMeterLnValue(lnY)
                                                    }
                                                } else {

                                                }
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
                                                if (newValue) {
                                                    ////console.log(newValue)
                                                    setSearch(search => ({ ...search, ...{ year: newValue } }))
                                                    //console.log(search.province.province_id, search.year.year, search.province.province, search.province.d)
                                                    //setLoading(true)
                                                    if (search.province) {
                                                        let data = {
                                                            provinceId: search.province.provinceId ? search.province.provinceId : search.province.province_id,
                                                            yearFrom: newValue.year,
                                                            province: search.province.province,
                                                            d: search.province.d
                                                        }


                                                        let povertyRatio = await KuPovertyRatioApi.getDataByProvinceAndYear(data);
                                                        //console.log(povertyRatio.data[0])

                                                        setMeterValueX1(povertyRatio.data[0].x1.toFixed(4))
                                                        setMeterValueX2(povertyRatio.data[0].x2.toFixed(4))
                                                        setMeterValueX3(povertyRatio.data[0].x3)
                                                        setMeterValueX4(povertyRatio.data[0].x4)
                                                        setMeterValueX5(povertyRatio.data[0].x5)
                                                        setMeterValueX6(povertyRatio.data[0].x6)
                                                        setMeterValue(povertyRatio.data[0].y)

                                                        setMeterLnValueX1((Math.log(povertyRatio.data[0].x1)).toFixed(4))
                                                        setMeterLnValueX2((Math.log(povertyRatio.data[0].x2)).toFixed(4))
                                                        setMeterLnValueX3((Math.log(povertyRatio.data[0].x3)).toFixed(4))
                                                        setMeterLnValueX4((Math.log(povertyRatio.data[0].x4)).toFixed(4))
                                                        setMeterLnValueX5((Math.log(povertyRatio.data[0].x5)).toFixed(4))
                                                        setMeterLnValueX6((Math.log(povertyRatio.data[0].x6)).toFixed(4))
                                                        let lnY = governEq(Math.log(povertyRatio.data[0].x1), Math.log(povertyRatio.data[0].x2), Math.log(povertyRatio.data[0].x3), Math.log(povertyRatio.data[0].x4), Math.log(povertyRatio.data[0].x5), Math.log(povertyRatio.data[0].x6), valueB0, valueB1, valueB2, valueB3, valueB4, valueB5, valueB6, valueB7, valueD)
                                                        setMeterLnValue(lnY)
                                                    }
                                                }
                                            }}
                                            options={configData.year}
                                            getOptionLabel={(option) => option.year}
                                            renderInput={(params) => (
                                                <TextField {...params} />
                                            )}
                                        />
                                    </Grid>
                                    <Divider />
                                    <Grid container direction="row" spacing={2} sx={{ mt: '30px' }}>
                                        <Grid container direction="row" spacing={2} sx={{ mt: '30px' }}>
                                            <Grid container spacing={2} direction="column" justifyContent="center" alignItems="center" xs={12} sm={12} md={12} lg={4} >
                                                <Grid item direction="row" xs={12} sm={12} md={12} lg={12} justifyContent="center" justifyItems="center" alignContent="center" alignItems="center" sx={{ overflow: 'hidden', position: 'relative' }}>
                                                    <Grid container direction="column" justifyContent="center" alignItems="center">
                                                        <Typography variant="subtitle1">สัดส่วนคนจน</Typography>
                                                    </Grid>
                                                    <IgrRadialGauge
                                                        height="500px"
                                                        width="500px"
                                                        minimumValue={configData.min}
                                                        maximumValue={100}
                                                        scaleStartAngle={180}
                                                        scaleEndAngle={0}
                                                        scaleBrush="#c6c6c6"
                                                        scaleSweepDirection="Clockwise"
                                                        scaleOversweep={1}
                                                        scaleOversweepShape="Fitted"
                                                        value={meterValue}
                                                        interval={10}
                                                        labelExtent={0.65}
                                                        font="11px Verdana"
                                                        fontBrush="Black"
                                                        backingOversweep={0}
                                                        backingCornerRadius={0}
                                                        backingStrokeThickness={0}
                                                        backingOuterExtent={0.8}
                                                        backingInnerExtent={0.15}
                                                        rangeBrushes="#47bd29,#FFFF00,#ffad08 ,#bd3829"
                                                        rangeOutlines="#47bd29,#FFFF00,#ffad08 ,#bd3829"
                                                    >
                                                        <IgrRadialGaugeRange name="Poor" startValue={0} endValue={25} innerStartExtent={0.45} innerEndExtent={0.45} outerStartExtent={0.57} outerEndExtent={0.57} />
                                                        <IgrRadialGaugeRange name="prettyAverage" startValue={25} endValue={50} innerStartExtent={0.45} innerEndExtent={0.45} outerStartExtent={0.57} outerEndExtent={0.57} />
                                                        <IgrRadialGaugeRange name="Average" startValue={50} endValue={75} innerStartExtent={0.45} innerEndExtent={0.45} outerStartExtent={0.57} outerEndExtent={0.57} />
                                                        <IgrRadialGaugeRange name="Good" startValue={75} endValue={100} innerStartExtent={0.45} innerEndExtent={0.45} outerStartExtent={0.57} outerEndExtent={0.57} />
                                                    </IgrRadialGauge>
                                                    <Grid container spacing={2} direction="column" justifyContent="center" alignItems="center" sx={{ position: 'absolute', bottom: { xs: '20%', sm: '20%', md: '20%', lg: '30%' } }}>
                                                        <Typography item sx={{ fontSize: '30px' }}>
                                                            {meterValue}
                                                        </Typography>
                                                        <Grid>
                                                            <Typography variant="subtitle2" noWrap sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                                ผลการประมาณค่าแบบจำลองเศรษฐมิติแสดงความยากจนรายจังหวัด
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item>
                                                            <Button
                                                                onClick={async (e) => {
                                                                    setLoading(true)

                                                                    let data = {
                                                                        provinceId: search.province.provinceId ? search.province.provinceId : search.province.province_id,
                                                                        yearFrom: search.year.year,
                                                                        province: search.province.province,
                                                                        d: search.province.d
                                                                    }

                                                                    //console.log(data)
                                                                    let masterData = await KuPovertyRatioApi.getMaster(data);
                                                                    setConfigData(configData => ({ ...configData, ...{ max: masterData.data.max } }))
                                                                    //setConfigData(configData => ({ ...configData, ...{ max: 100 } }))
                                                                    setConfigData(configData => ({ ...configData, ...{ min: masterData.data.minimumValue } }))
                                                                    setConfigData(configData => ({ ...configData, ...{ coefficient0: masterData.data.coefficient0 } }))
                                                                    setConfigData(configData => ({ ...configData, ...{ coefficient1: masterData.data.coefficient1 } }))
                                                                    setConfigData(configData => ({ ...configData, ...{ province: masterData.data.province } }))
                                                                    setConfigData(configData => ({ ...configData, ...{ year: masterData.data.year } }))

                                                                    setValueB0(masterData.data.coefficient1.b0)
                                                                    setValueB1(masterData.data.coefficient1.b1)
                                                                    setValueB2(masterData.data.coefficient1.b2)
                                                                    setValueB3(masterData.data.coefficient1.b3)
                                                                    setValueB4(masterData.data.coefficient1.b4)
                                                                    setValueB5(masterData.data.coefficient1.b5)
                                                                    setValueB6(masterData.data.coefficient1.b6)
                                                                    setValueB7(masterData.data.coefficient1.b7)
                                                                    setValueD(masterData.data.coefficient1.d)

                                                                    let povertyRatio = await KuPovertyRatioApi.getDataByProvinceAndYear(data);
                                                                    //console.log(povertyRatio.data)
                                                                    setMeterValueX1(povertyRatio.data[0].x1.toFixed(4))
                                                                    setMeterValueX2(povertyRatio.data[0].x2.toFixed(4))
                                                                    setMeterValueX3(povertyRatio.data[0].x3)
                                                                    setMeterValueX4(povertyRatio.data[0].x4)
                                                                    setMeterValueX5(povertyRatio.data[0].x5)
                                                                    setMeterValueX6(povertyRatio.data[0].x6)
                                                                    setMeterValue(povertyRatio.data[0].y)

                                                                    setMeterLnValueX1((Math.log(povertyRatio.data[0].x1)).toFixed(4))
                                                                    setMeterLnValueX2((Math.log(povertyRatio.data[0].x2)).toFixed(4))
                                                                    setMeterLnValueX3((Math.log(povertyRatio.data[0].x3)).toFixed(4))
                                                                    setMeterLnValueX4((Math.log(povertyRatio.data[0].x4)).toFixed(4))
                                                                    setMeterLnValueX5((Math.log(povertyRatio.data[0].x5)).toFixed(4))
                                                                    setMeterLnValueX6((Math.log(povertyRatio.data[0].x6)).toFixed(4))
                                                                    let lnY = governEq(Math.log(povertyRatio.data[0].x1), Math.log(povertyRatio.data[0].x2), Math.log(povertyRatio.data[0].x3), Math.log(povertyRatio.data[0].x4), Math.log(povertyRatio.data[0].x5), Math.log(povertyRatio.data[0].x6), valueB0, valueB1, valueB2, valueB3, valueB4, valueB5, valueB6, valueB7, valueD)
                                                                    setMeterLnValue(lnY)

                                                                    setLoading(false)
                                                                }}
                                                            >
                                                                Reset เป็นค่าเริ่มต้น
                                                            </Button>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} sm={12} md={12} lg={8}>
                                                <Grid container direction="row" spacing={3} sx={{ pt: 1, pl: { xs: 0, md: 1 } }}>
                                                    <Grid container spacing={2} direction="column" justifyContent="center" alignItems="center" xs={12} sm={12} md={4} lg={4} sx={{ position: 'relative', maxHeight: '250', mt: { xs: '0px', sm: '0px', md: '0px', lg: '0px' } }}>
                                                        <Typography variant="subtitle1">
                                                            สัดส่วนประชากรวัยแรงงาน (15-60 ปี)
                                                        </Typography>
                                                        <Grid container spacing={2} direction="row" justifyContent="center" alignItems="center" sx={{ marginTop: '10px' }}>
                                                            <Typography variant="subtitle1">
                                                                สัมประสิทธ์
                                                            </Typography>
                                                            <TextField
                                                                type="number"
                                                                value={valueB1}
                                                                inputProps={{ min: 0, style: { textAlign: 'center' } }}
                                                                sx={{
                                                                    width: '100px',
                                                                    "& .MuiInputBase-root": {
                                                                        height: '40px'
                                                                    },
                                                                    marginLeft: '5px'
                                                                }}
                                                                variant="outlined"
                                                                onChange={(e) => {
                                                                    let newValue = e.target.value
                                                                    if (newValue) {
                                                                        let lnY = governEq(meterLnValueX1, meterLnValueX2, meterLnValueX3, meterLnValueX4, meterLnValueX5, meterLnValueX6, valueB0, newValue, valueB2, valueB3, valueB4, valueB5, valueB6, valueB7, valueD)
                                                                        setValueB1(newValue)
                                                                        if (lnY) {
                                                                            setMeterLnValue(lnY)
                                                                            let theLnY = Math.exp(lnY)
                                                                            setMeterValue(theLnY.toFixed(4))
                                                                        }
                                                                    }
                                                                }}
                                                            />
                                                        </Grid>
                                                        <IgrRadialGauge
                                                            height="250px" width="250px"
                                                            minimumValue={configData.min}
                                                            maximumValue={100}
                                                            scaleStartAngle={180}
                                                            scaleEndAngle={0}
                                                            scaleBrush="#c6c6c6"
                                                            scaleSweepDirection="Clockwise"
                                                            scaleOversweep={1}
                                                            scaleOversweepShape="Fitted"
                                                            value={meterValueX1}
                                                            interval={10}
                                                            labelExtent={0.65}
                                                            font="11px Verdana"
                                                            fontBrush="Black"
                                                            backingOversweep={0}
                                                            backingCornerRadius={0}
                                                            backingStrokeThickness={0}
                                                            backingOuterExtent={0.8}
                                                            backingInnerExtent={0.15}
                                                            rangeBrushes="#bd3829,#ffad08,#FFFF00,#47bd29"
                                                            rangeOutlines="#bd3829,#ffad08,#FFFF00,#47bd29"
                                                        >
                                                            <IgrRadialGaugeRange name="Poor" startValue={0} endValue={25} innerStartExtent={0.45} innerEndExtent={0.45} outerStartExtent={0.57} outerEndExtent={0.57} />
                                                            <IgrRadialGaugeRange name="prettyAverage" startValue={25} endValue={50} innerStartExtent={0.45} innerEndExtent={0.45} outerStartExtent={0.57} outerEndExtent={0.57} />
                                                            <IgrRadialGaugeRange name="Average" startValue={50} endValue={75} innerStartExtent={0.45} innerEndExtent={0.45} outerStartExtent={0.57} outerEndExtent={0.57} />
                                                            <IgrRadialGaugeRange name="Good" startValue={75} endValue={100} innerStartExtent={0.45} innerEndExtent={0.45} outerStartExtent={0.57} outerEndExtent={0.57} />
                                                        </IgrRadialGauge>
                                                        <Grid container spacing={2} direction="column" justifyContent="center" alignItems="center" sx={{ position: 'absolute', bottom: '5%' }}>
                                                            <Grid item>
                                                                <TextField
                                                                    type="number"
                                                                    value={meterValueX1}
                                                                    inputProps={{ min: 0, style: { textAlign: 'center' } }}
                                                                    sx={{
                                                                        width: '150px',
                                                                        "& .MuiInputBase-root": {
                                                                            height: '40px'
                                                                        },
                                                                        marginLeft: '5px'
                                                                    }}
                                                                    variant="outlined"
                                                                    onChange={(e) => {
                                                                        let val = e.target.value
                                                                        if (val) {
                                                                            let newValue = parseFloat(val.replace(/,/g, ""))
                                                                            let theLnX1 = Math.log(newValue)
                                                                            if (theLnX1 !== -Infinity) {
                                                                                let lnY = governEq(theLnX1, meterLnValueX2, meterLnValueX3, meterLnValueX4, meterLnValueX5, meterLnValueX6, valueB0, valueB1, valueB2, valueB3, valueB4, valueB5, valueB6, valueB7, valueD)
                                                                                if (!isNaN(lnY)) {
                                                                                    setMeterValueX1(newValue.toFixed(4))
                                                                                    setMeterLnValueX1(theLnX1.toFixed(4))
                                                                                    if (lnY) {
                                                                                        let theLnY = Math.exp(lnY)
                                                                                        setMeterValue(theLnY.toFixed(4))
                                                                                        setMeterLnValue(lnY)
                                                                                    }
                                                                                } else {
                                                                                    Swal.fire({
                                                                                        title: '',
                                                                                        text: 'ไม่สามารถคำนวณค่าได้',
                                                                                        icon: 'error',
                                                                                        // showCancelButton: true,
                                                                                        // cancelButtonText: 'ยกเลิก',
                                                                                        confirmButtonColor: '#3085d6',
                                                                                        // cancelButtonColor: '#d33',
                                                                                        confirmButtonText: 'ตกลง'
                                                                                    }).then(async (result) => {
                                                                                        if (result.isConfirmed) {
                                                                                        } else if (result.dismiss === Swal.DismissReason.cancel) {
                                                                                        }
                                                                                    })
                                                                                }
                                                                            } else {
                                                                                Swal.fire({
                                                                                    title: '',
                                                                                    text: 'ไม่สามารถคำนวณค่าได้',
                                                                                    icon: 'error',
                                                                                    // showCancelButton: true,
                                                                                    // cancelButtonText: 'ยกเลิก',
                                                                                    confirmButtonColor: '#3085d6',
                                                                                    // cancelButtonColor: '#d33',
                                                                                    confirmButtonText: 'ตกลง'
                                                                                }).then(async (result) => {
                                                                                    if (result.isConfirmed) {
                                                                                    } else if (result.dismiss === Swal.DismissReason.cancel) {
                                                                                    }
                                                                                })
                                                                            }
                                                                        }
                                                                    }}
                                                                />
                                                            </Grid>
                                                            <Grid item sx={{ width: { xs: '70%', sm: '40%', md: '80%', lg: '70%' } }}>
                                                                <Slider
                                                                    aria-label="Small steps"
                                                                    defaultValue={0.0}
                                                                    getAriaValueText={valuetext}
                                                                    step={0.05}
                                                                    min={configData.min}
                                                                    max={100}
                                                                    valueLabelDisplay="auto"
                                                                    onChange={handleChangeX1}
                                                                    size="small"
                                                                    value={meterValueX1}
                                                                />
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid container spacing={2} direction="column" justifyContent="start" alignItems="center" xs={12} sm={12} md={4} lg={4} sx={{ position: 'relative', maxHeight: '250', mt: { xs: '20px', sm: '20px', md: '0px', lg: '0px' } }}>
                                                        <Typography variant="subtitle1">
                                                            จำนวนคนต่างด้าวที่ได้รับอนุญาตทำงาน
                                                        </Typography>
                                                        <Grid container spacing={2} direction="row" justifyContent="center" alignItems="center" sx={{ marginTop: '10px' }}>
                                                            <Typography variant="subtitle1">
                                                                สัมประสิทธ์
                                                            </Typography>
                                                            <TextField
                                                                type="number"
                                                                value={valueB3}
                                                                inputProps={{ min: 0, style: { textAlign: 'center' } }}
                                                                sx={{
                                                                    width: '100px',
                                                                    "& .MuiInputBase-root": {
                                                                        height: '40px'
                                                                    },
                                                                    marginLeft: '5px'
                                                                }}
                                                                variant="outlined"
                                                                onChange={(e) => {
                                                                    let newValue = e.target.value
                                                                    if (newValue) {
                                                                        let lnY = governEq(meterLnValueX1, meterLnValueX2, meterLnValueX3, meterLnValueX4, meterLnValueX5, meterLnValueX6, valueB0, valueB1, valueB2, newValue, valueB4, valueB5, valueB6, valueB7, valueD)
                                                                        setValueB3(newValue)
                                                                        if (lnY) {
                                                                            let theLnY = Math.exp(lnY)
                                                                            setMeterValue(theLnY.toFixed(4))
                                                                            setMeterLnValue(lnY)
                                                                        }
                                                                    }
                                                                }}
                                                            />
                                                        </Grid>
                                                        <Grid container spacing={2} direction="row" justifyContent="center" alignItems="center" sx={{ mt: { xs: '10px', sm: '10px', md: '50px', lg: '50px' } }}> {/*ไม่สวย*/}
                                                            <NumericFormat
                                                                type="text"
                                                                customInput={TextField}
                                                                allowNegative={false}
                                                                thousandSeparator
                                                                value={meterValueX3}
                                                                inputProps={{ min: 0, style: { textAlign: 'center', fontSize: '30px' } }}
                                                                sx={{
                                                                    width: '150px',
                                                                    "& .MuiInputBase-root": {
                                                                        height: '100px'
                                                                    }
                                                                }}
                                                                variant="outlined"
                                                                onChange={(e) => {
                                                                    let val = e.target.value
                                                                    if (val) {
                                                                        let newValue = parseFloat(val.replace(/,/g, ""))
                                                                        let theLnX3 = Math.log(newValue)
                                                                        if (theLnX3 !== -Infinity) {
                                                                            let lnY = governEq(meterLnValueX1, meterLnValueX2, theLnX3, meterLnValueX4, meterLnValueX5, meterLnValueX6, valueB0, valueB1, valueB2, valueB3, valueB4, valueB5, valueB6, valueB7, valueD)
                                                                            if (!isNaN(lnY)) {
                                                                                setMeterValueX3(newValue)
                                                                                setMeterLnValueX3(theLnX3.toFixed(4))
                                                                                if (lnY) {
                                                                                    let theLnY = Math.exp(lnY)
                                                                                    setMeterValue(theLnY.toFixed(4))
                                                                                    setMeterLnValue(lnY)
                                                                                }
                                                                            } else {
                                                                                Swal.fire({
                                                                                    title: '',
                                                                                    text: 'ไม่สามารถคำนวณค่าได้',
                                                                                    icon: 'error',
                                                                                    // showCancelButton: true,
                                                                                    // cancelButtonText: 'ยกเลิก',
                                                                                    confirmButtonColor: '#3085d6',
                                                                                    // cancelButtonColor: '#d33',
                                                                                    confirmButtonText: 'ตกลง'
                                                                                }).then(async (result) => {
                                                                                    if (result.isConfirmed) {
                                                                                    } else if (result.dismiss === Swal.DismissReason.cancel) {
                                                                                    }
                                                                                })
                                                                            }
                                                                        } else {
                                                                            Swal.fire({
                                                                                title: '',
                                                                                text: 'ไม่สามารถคำนวณค่าได้',
                                                                                icon: 'error',
                                                                                // showCancelButton: true,
                                                                                // cancelButtonText: 'ยกเลิก',
                                                                                confirmButtonColor: '#3085d6',
                                                                                // cancelButtonColor: '#d33',
                                                                                confirmButtonText: 'ตกลง'
                                                                            }).then(async (result) => {
                                                                                if (result.isConfirmed) {
                                                                                } else if (result.dismiss === Swal.DismissReason.cancel) {
                                                                                }
                                                                            })
                                                                        }
                                                                    }
                                                                }}
                                                            />
                                                            <Typography sx={{ marginLeft: '10px', fontSize: '20px' }}>คน</Typography>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid container spacing={2} direction="column" justifyContent="start" alignItems="center" xs={12} sm={12} md={4} lg={4} sx={{ position: 'relative', maxHeight: '250', mt: { xs: '40px', sm: '40px', md: '0px', lg: '0px' } }}>
                                                        <Typography variant="subtitle1">
                                                            จำนวนแพทย์
                                                        </Typography>
                                                        <Grid container spacing={2} direction="row" justifyContent="center" alignItems="center" sx={{ marginTop: '10px' }}>
                                                            <Typography variant="subtitle1">
                                                                สัมประสิทธ์
                                                            </Typography>
                                                            <TextField
                                                                type="number"
                                                                inputProps={{ min: 0, style: { textAlign: 'center' } }}
                                                                value={valueB6}
                                                                sx={{
                                                                    width: '100px',
                                                                    "& .MuiInputBase-root": {
                                                                        height: '40px'
                                                                    },
                                                                    marginLeft: '5px'
                                                                }}
                                                                variant="outlined"
                                                                onChange={(e) => {
                                                                    let newValue = e.target.value
                                                                    if (newValue) {
                                                                        let lnY = governEq(meterLnValueX1, meterLnValueX2, meterLnValueX3, meterLnValueX4, meterLnValueX5, meterLnValueX6, valueB0, valueB1, valueB2, valueB3, valueB4, valueB5, newValue, valueB7, valueD)
                                                                        setValueB6(newValue)

                                                                        if (lnY) {
                                                                            let theLnY = Math.exp(lnY)
                                                                            setMeterValue(theLnY.toFixed(4))
                                                                            setMeterLnValue(lnY)
                                                                        }
                                                                    }
                                                                }}
                                                            />
                                                        </Grid>
                                                        <Grid container spacing={2} direction="row" justifyContent="center" alignItems="center" sx={{ mt: { xs: '10px', sm: '10px', md: '50px', lg: '50px' } }}> {/*ไม่สวย*/}
                                                            <NumericFormat
                                                                type="text"
                                                                customInput={TextField}
                                                                allowNegative={false}
                                                                thousandSeparator
                                                                value={meterValueX6}
                                                                inputProps={{ min: 0, style: { textAlign: 'center', fontSize: '30px' } }}
                                                                sx={{
                                                                    width: '150px',
                                                                    "& .MuiInputBase-root": {
                                                                        height: '100px'
                                                                    },
                                                                    size: '50px'
                                                                }}
                                                                variant="outlined"
                                                                onChange={(e) => {
                                                                    let val = e.target.value
                                                                    if (val) {
                                                                        let newValue = parseFloat(val.replace(/,/g, ""))
                                                                        let theLnX6 = Math.log(newValue)
                                                                        if (theLnX6 !== -Infinity) {
                                                                            let lnY = governEq(meterLnValueX1, meterLnValueX2, meterLnValueX3, meterLnValueX4, meterLnValueX5, theLnX6, valueB0, valueB1, valueB2, valueB3, valueB4, valueB5, valueB6, valueB7, valueD)
                                                                            if (!isNaN(lnY)) {
                                                                                setMeterValueX6(newValue)
                                                                                setMeterLnValueX6(theLnX6.toFixed(4))
                                                                                if (lnY) {
                                                                                    let theLnY = Math.exp(lnY)
                                                                                    setMeterValue(theLnY.toFixed(4))
                                                                                    setMeterLnValue(lnY)
                                                                                }
                                                                            } else {
                                                                                Swal.fire({
                                                                                    title: '',
                                                                                    text: 'ไม่สามารถคำนวณค่าได้',
                                                                                    icon: 'error',
                                                                                    // showCancelButton: true,
                                                                                    // cancelButtonText: 'ยกเลิก',
                                                                                    confirmButtonColor: '#3085d6',
                                                                                    // cancelButtonColor: '#d33',
                                                                                    confirmButtonText: 'ตกลง'
                                                                                }).then(async (result) => {
                                                                                    if (result.isConfirmed) {
                                                                                    } else if (result.dismiss === Swal.DismissReason.cancel) {
                                                                                    }
                                                                                })
                                                                            }
                                                                        } else {
                                                                            Swal.fire({
                                                                                title: '',
                                                                                text: 'ไม่สามารถคำนวณค่าได้',
                                                                                icon: 'error',
                                                                                // showCancelButton: true,
                                                                                // cancelButtonText: 'ยกเลิก',
                                                                                confirmButtonColor: '#3085d6',
                                                                                // cancelButtonColor: '#d33',
                                                                                confirmButtonText: 'ตกลง'
                                                                            }).then(async (result) => {
                                                                                if (result.isConfirmed) {
                                                                                } else if (result.dismiss === Swal.DismissReason.cancel) {
                                                                                }
                                                                            })
                                                                        }
                                                                    }
                                                                }}
                                                            />
                                                            <Typography sx={{ marginLeft: '10px', fontSize: '20px' }}>คน</Typography>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid container spacing={2} direction="column" justifyContent="center" alignItems="center" xs={12} sm={12} md={4} lg={4} sx={{ position: 'relative', maxHeight: '250', mt: { xs: '40px', sm: '40px', md: '0px', lg: '0px' } }}>
                                                        <Typography variant="subtitle1">
                                                            สัดส่วนประชากรสูงวัย (อายุ 60 ปีขึ้นไป)
                                                        </Typography>
                                                        <Grid container spacing={2} direction="row" justifyContent="center" alignItems="center" sx={{ marginTop: '10px' }}>
                                                            <Typography variant="subtitle1">
                                                                สัมประสิทธ์
                                                            </Typography>
                                                            <TextField
                                                                type="number"
                                                                value={valueB2}
                                                                inputProps={{ min: 0, style: { textAlign: 'center' } }}
                                                                sx={{
                                                                    width: '100px',
                                                                    "& .MuiInputBase-root": {
                                                                        height: '40px'
                                                                    },
                                                                    marginLeft: '5px'
                                                                }}
                                                                variant="outlined"
                                                                onChange={(e) => {
                                                                    let val = e.target.value
                                                                    if (val) {
                                                                        let newValue = parseFloat(val.replace(/,/g, ""))
                                                                        let lnY = governEq(meterLnValueX1, meterLnValueX2, meterLnValueX3, meterLnValueX4, meterLnValueX5, meterLnValueX6, valueB0, valueB1, newValue, valueB3, valueB4, valueB5, valueB6, valueB7, valueD)
                                                                        if (!isNaN(lnY)) {
                                                                            setValueB2(newValue)
                                                                            if (lnY) {
                                                                                let theLnY = Math.exp(lnY)
                                                                                setMeterValue(theLnY.toFixed(4))
                                                                                setMeterLnValue(lnY)
                                                                            }
                                                                        } else {
                                                                            Swal.fire({
                                                                                title: '',
                                                                                text: 'ไม่สามารถคำนวณค่าได้',
                                                                                icon: 'error',
                                                                                // showCancelButton: true,
                                                                                // cancelButtonText: 'ยกเลิก',
                                                                                confirmButtonColor: '#3085d6',
                                                                                // cancelButtonColor: '#d33',
                                                                                confirmButtonText: 'ตกลง'
                                                                            }).then(async (result) => {
                                                                                if (result.isConfirmed) {
                                                                                } else if (result.dismiss === Swal.DismissReason.cancel) {
                                                                                }
                                                                            })
                                                                        }
                                                                    }
                                                                }}
                                                            />
                                                        </Grid>
                                                        <IgrRadialGauge
                                                            height="250px" width="250px"
                                                            minimumValue={configData.min}
                                                            maximumValue={100}
                                                            scaleStartAngle={180}
                                                            scaleEndAngle={0}
                                                            scaleBrush="#c6c6c6"
                                                            scaleSweepDirection="Clockwise"
                                                            scaleOversweep={1}
                                                            scaleOversweepShape="Fitted"
                                                            value={meterValueX2}
                                                            interval={10}
                                                            labelExtent={0.65}
                                                            font="11px Verdana"
                                                            fontBrush="Black"
                                                            backingOversweep={0}
                                                            backingCornerRadius={0}
                                                            backingStrokeThickness={0}
                                                            backingOuterExtent={0.8}
                                                            backingInnerExtent={0.15}
                                                            rangeBrushes="#47bd29,#FFFF00, #ffad08 ,#bd3829"
                                                            rangeOutlines="#47bd29,#FFFF00, #ffad08 ,#bd3829"
                                                        >
                                                            <IgrRadialGaugeRange name="Poor" startValue={0} endValue={25} innerStartExtent={0.45} innerEndExtent={0.45} outerStartExtent={0.57} outerEndExtent={0.57} />
                                                            <IgrRadialGaugeRange name="prettyAverage" startValue={25} endValue={50} innerStartExtent={0.45} innerEndExtent={0.45} outerStartExtent={0.57} outerEndExtent={0.57} />
                                                            <IgrRadialGaugeRange name="Average" startValue={50} endValue={75} innerStartExtent={0.45} innerEndExtent={0.45} outerStartExtent={0.57} outerEndExtent={0.57} />
                                                            <IgrRadialGaugeRange name="Good" startValue={75} endValue={100} innerStartExtent={0.45} innerEndExtent={0.45} outerStartExtent={0.57} outerEndExtent={0.57} />
                                                        </IgrRadialGauge>
                                                        <Grid container spacing={2} direction="column" justifyContent="center" alignItems="center" sx={{ position: 'absolute', bottom: '5%' }}>
                                                            <Grid item>
                                                                <TextField
                                                                    type="number"
                                                                    value={meterValueX2}
                                                                    inputProps={{ min: 0, style: { textAlign: 'center' } }}
                                                                    sx={{
                                                                        width: '150px',
                                                                        "& .MuiInputBase-root": {
                                                                            height: '40px'
                                                                        },
                                                                        marginLeft: '5px'
                                                                    }}
                                                                    variant="outlined"
                                                                    onChange={(e) => {
                                                                        let val = e.target.value
                                                                        if (val) {
                                                                            let newValue = parseFloat(val.replace(/,/g, ""))
                                                                            let theLnX2 = Math.log(newValue)
                                                                            if (theLnX2 !== -Infinity) {
                                                                                let lnY = governEq(meterLnValueX1, theLnX2, meterLnValueX3, meterLnValueX4, meterLnValueX5, meterLnValueX6, valueB0, valueB1, valueB2, valueB3, valueB4, valueB5, valueB6, valueB7, valueD)
                                                                                if (!isNaN(lnY)) {
                                                                                    setMeterValueX2(newValue.toFixed(4))
                                                                                    setMeterLnValueX2(theLnX2.toFixed(4))
                                                                                    if (lnY) {
                                                                                        let theLnY = Math.exp(lnY)
                                                                                        setMeterValue(theLnY.toFixed(4))
                                                                                        setMeterLnValue(lnY)
                                                                                    }
                                                                                } else {
                                                                                    Swal.fire({
                                                                                        title: '',
                                                                                        text: 'ไม่สามารถคำนวณค่าได้',
                                                                                        icon: 'error',
                                                                                        // showCancelButton: true,
                                                                                        // cancelButtonText: 'ยกเลิก',
                                                                                        confirmButtonColor: '#3085d6',
                                                                                        // cancelButtonColor: '#d33',
                                                                                        confirmButtonText: 'ตกลง'
                                                                                    }).then(async (result) => {
                                                                                        if (result.isConfirmed) {
                                                                                        } else if (result.dismiss === Swal.DismissReason.cancel) {
                                                                                        }
                                                                                    })
                                                                                }
                                                                            } else {
                                                                                Swal.fire({
                                                                                    title: '',
                                                                                    text: 'ไม่สามารถคำนวณค่าได้',
                                                                                    icon: 'error',
                                                                                    // showCancelButton: true,
                                                                                    // cancelButtonText: 'ยกเลิก',
                                                                                    confirmButtonColor: '#3085d6',
                                                                                    // cancelButtonColor: '#d33',
                                                                                    confirmButtonText: 'ตกลง'
                                                                                }).then(async (result) => {
                                                                                    if (result.isConfirmed) {
                                                                                    } else if (result.dismiss === Swal.DismissReason.cancel) {
                                                                                    }
                                                                                })
                                                                            }
                                                                        }
                                                                    }}
                                                                />
                                                            </Grid>
                                                            <Grid item sx={{ width: { xs: '70%', sm: '40%', md: '80%', lg: '70%' } }}>
                                                                <Slider
                                                                    // aria-label="Small steps"
                                                                    // defaultValue={0.0}
                                                                    // getAriaValueText={valuetext}
                                                                    // step={0.05}
                                                                    // min={configData.min}
                                                                    // max={100}
                                                                    // valueLabelDisplay="auto"
                                                                    // onChange={handleChangeX2}
                                                                    // value={meterValueX2}

                                                                    aria-label="Small steps"
                                                                    defaultValue={0.0}
                                                                    getAriaValueText={valuetext}
                                                                    step={0.05}
                                                                    min={configData.min}
                                                                    max={100}
                                                                    valueLabelDisplay="auto"
                                                                    onChange={handleChangeX2}
                                                                    size="small"
                                                                    value={meterValueX2}
                                                                />
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid container spacing={2} direction="column" justifyContent="start" alignItems="center" xs={12} sm={12} md={4} lg={4} sx={{ position: 'relative', maxHeight: '250', mt: { xs: '20px', sm: '20px', md: '0px', lg: '0px' } }}>
                                                        <Typography variant="subtitle1">
                                                            จำนวนรวมรับแจ้งคดียาเสพติด
                                                        </Typography>
                                                        <Grid container spacing={2} direction="row" justifyContent="center" alignItems="center" sx={{ marginTop: '10px' }}>
                                                            <Typography variant="subtitle1">
                                                                สัมประสิทธ์
                                                            </Typography>
                                                            <TextField
                                                                type="number"
                                                                value={valueB4}
                                                                inputProps={{ min: 0, style: { textAlign: 'center' } }}
                                                                sx={{
                                                                    width: '100px',
                                                                    "& .MuiInputBase-root": {
                                                                        height: '40px'
                                                                    },
                                                                    marginLeft: '5px'
                                                                }}
                                                                variant="outlined"
                                                                onChange={(e) => {
                                                                    let val = e.target.value
                                                                    if (val) {
                                                                        let newValue = parseFloat(val.replace(/,/g, ""))
                                                                        let lnY = governEq(meterLnValueX1, meterLnValueX2, meterLnValueX3, meterLnValueX4, meterLnValueX5, meterLnValueX6, valueB0, valueB1, valueB2, valueB3, newValue, valueB5, valueB6, valueB7, valueD)
                                                                        if (!isNaN(lnY)) {
                                                                            setValueB4(newValue)
                                                                            if (lnY) {
                                                                                let theLnY = Math.exp(lnY)
                                                                                setMeterValue(theLnY.toFixed(4))
                                                                                setMeterLnValue(lnY)
                                                                            }
                                                                        } else {
                                                                            Swal.fire({
                                                                                title: '',
                                                                                text: 'ไม่สามารถคำนวณค่าได้',
                                                                                icon: 'error',
                                                                                // showCancelButton: true,
                                                                                // cancelButtonText: 'ยกเลิก',
                                                                                confirmButtonColor: '#3085d6',
                                                                                // cancelButtonColor: '#d33',
                                                                                confirmButtonText: 'ตกลง'
                                                                            }).then(async (result) => {
                                                                                if (result.isConfirmed) {
                                                                                } else if (result.dismiss === Swal.DismissReason.cancel) {
                                                                                }
                                                                            })
                                                                        }
                                                                    }
                                                                }}
                                                            />
                                                        </Grid>
                                                        <Grid container spacing={2} direction="row" justifyContent="center" alignItems="center" sx={{ mt: { xs: '10px', sm: '10px', md: '50px', lg: '50px' } }}> {/*ไม่สวย*/}
                                                            <NumericFormat
                                                                type="text"
                                                                customInput={TextField}
                                                                allowNegative={false}
                                                                thousandSeparator
                                                                value={meterValueX4}
                                                                inputProps={{ min: 0, style: { textAlign: 'center', fontSize: '30px' } }}
                                                                sx={{
                                                                    width: '150px',
                                                                    "& .MuiInputBase-root": {
                                                                        height: '100px'
                                                                    },
                                                                    size: '50px'
                                                                }}
                                                                variant="outlined"
                                                                onChange={(e) => {
                                                                    let val = e.target.value
                                                                    if (val) {
                                                                        let newValue = parseFloat(val.replace(/,/g, ""))
                                                                        let theLnX4 = Math.log(newValue)
                                                                        if (theLnX4 !== -Infinity) {
                                                                            let lnY = governEq(meterLnValueX1, meterLnValueX2, meterLnValueX3, theLnX4, meterLnValueX5, meterLnValueX6, valueB0, valueB1, valueB2, valueB3, valueB4, valueB5, valueB6, valueB7, valueD)
                                                                            if (!isNaN(lnY)) {
                                                                                setMeterValueX4(newValue)
                                                                                setMeterLnValueX4(theLnX4.toFixed(4))
                                                                                if (lnY) {
                                                                                    let theLnY = Math.exp(lnY)
                                                                                    setMeterValue(theLnY.toFixed(4))
                                                                                    setMeterLnValue(lnY)
                                                                                }
                                                                            } else {
                                                                                Swal.fire({
                                                                                    title: '',
                                                                                    text: 'ไม่สามารถคำนวณค่าได้',
                                                                                    icon: 'error',
                                                                                    // showCancelButton: true,
                                                                                    // cancelButtonText: 'ยกเลิก',
                                                                                    confirmButtonColor: '#3085d6',
                                                                                    // cancelButtonColor: '#d33',
                                                                                    confirmButtonText: 'ตกลง'
                                                                                }).then(async (result) => {
                                                                                    if (result.isConfirmed) {
                                                                                    } else if (result.dismiss === Swal.DismissReason.cancel) {
                                                                                    }
                                                                                })
                                                                            }
                                                                        } else {
                                                                            Swal.fire({
                                                                                title: '',
                                                                                text: 'ไม่สามารถคำนวณค่าได้',
                                                                                icon: 'error',
                                                                                // showCancelButton: true,
                                                                                // cancelButtonText: 'ยกเลิก',
                                                                                confirmButtonColor: '#3085d6',
                                                                                // cancelButtonColor: '#d33',
                                                                                confirmButtonText: 'ตกลง'
                                                                            }).then(async (result) => {
                                                                                if (result.isConfirmed) {
                                                                                } else if (result.dismiss === Swal.DismissReason.cancel) {
                                                                                }
                                                                            })
                                                                        }
                                                                    }
                                                                }}
                                                            />
                                                            <Typography sx={{ marginLeft: '10px', fontSize: '20px' }}>คดี</Typography>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid container spacing={2} direction="column" justifyContent="start" alignItems="center" xs={12} sm={12} md={4} lg={4} sx={{ position: 'relative', maxHeight: '250', mt: { xs: '40px', sm: '40px', md: '0px', lg: '0px' } }}>
                                                        <Typography variant="subtitle1">
                                                            จำนวนรับแจ้งคดีความผิดเกี่ยวกับชีวิต ร่างกาย ฯ
                                                        </Typography>
                                                        <Grid container spacing={2} direction="row" justifyContent="center" alignItems="center" sx={{ marginTop: '10px' }}>
                                                            <Typography variant="subtitle1">
                                                                สัมประสิทธ์
                                                            </Typography>
                                                            <TextField
                                                                type="number"
                                                                inputProps={{ min: 0, style: { textAlign: 'center' } }}
                                                                value={valueB5} sx={{
                                                                    width: '100px',
                                                                    "& .MuiInputBase-root": {
                                                                        height: '40px'
                                                                    },
                                                                    marginLeft: '5px'
                                                                }}
                                                                variant="outlined"
                                                                onChange={(e) => {
                                                                    let val = e.target.value
                                                                    if (val) {
                                                                        let newValue = parseFloat(val.replace(/,/g, ""))
                                                                        let lnY = governEq(meterLnValueX1, meterLnValueX2, meterLnValueX3, meterLnValueX4, meterLnValueX5, meterLnValueX6, valueB0, valueB1, valueB2, valueB3, valueB4, newValue, valueB6, valueB7, valueD)
                                                                        if (!isNaN(lnY)) {
                                                                            setValueB5(newValue)
                                                                            if (lnY) {
                                                                                let theLnY = Math.exp(lnY)
                                                                                setMeterValue(theLnY.toFixed(4))
                                                                                setMeterLnValue(lnY)
                                                                            }
                                                                        } else {
                                                                            Swal.fire({
                                                                                title: '',
                                                                                text: 'ไม่สามารถคำนวณค่าได้',
                                                                                icon: 'error',
                                                                                // showCancelButton: true,
                                                                                // cancelButtonText: 'ยกเลิก',
                                                                                confirmButtonColor: '#3085d6',
                                                                                // cancelButtonColor: '#d33',
                                                                                confirmButtonText: 'ตกลง'
                                                                            }).then(async (result) => {
                                                                                if (result.isConfirmed) {
                                                                                } else if (result.dismiss === Swal.DismissReason.cancel) {
                                                                                }
                                                                            })
                                                                        }
                                                                    }
                                                                }}
                                                            />
                                                        </Grid>
                                                        <Grid container spacing={2} direction="row" justifyContent="center" alignItems="center" sx={{ mt: { xs: '10px', sm: '10px', md: '50px', lg: '50px' } }}> {/*ไม่สวย*/}
                                                            <NumericFormat
                                                                type="text"
                                                                customInput={TextField}
                                                                allowNegative={false}
                                                                thousandSeparator
                                                                value={meterValueX5}
                                                                inputProps={{ min: 0, style: { textAlign: 'center', fontSize: '30px' } }}
                                                                sx={{
                                                                    width: '150px',
                                                                    "& .MuiInputBase-root": {
                                                                        height: '100px'
                                                                    },
                                                                    size: '50px'
                                                                }}
                                                                variant="outlined"
                                                                onChange={(e) => {
                                                                    let val = e.target.value
                                                                    if (val) {
                                                                        let newValue = parseFloat(val.replace(/,/g, ""))
                                                                        let theLnX5 = Math.log(newValue)
                                                                        if (theLnX5 !== -Infinity) {
                                                                            let lnY = governEq(meterLnValueX1, meterLnValueX2, meterLnValueX3, meterLnValueX4, theLnX5, meterLnValueX6, valueB0, valueB1, valueB2, valueB3, valueB4, valueB5, valueB6, valueB7, valueD)
                                                                            if (!isNaN(lnY)) {
                                                                                setMeterValueX5(newValue)
                                                                                setMeterLnValueX5(theLnX5.toFixed(4))
                                                                                if (lnY) {
                                                                                    let theLnY = Math.exp(lnY)
                                                                                    setMeterValue(theLnY.toFixed(4))
                                                                                    setMeterLnValue(lnY)
                                                                                }
                                                                            } else {
                                                                                Swal.fire({
                                                                                    title: '',
                                                                                    text: 'ไม่สามารถคำนวณค่าได้',
                                                                                    icon: 'error',
                                                                                    // showCancelButton: true,
                                                                                    // cancelButtonText: 'ยกเลิก',
                                                                                    confirmButtonColor: '#3085d6',
                                                                                    // cancelButtonColor: '#d33',
                                                                                    confirmButtonText: 'ตกลง'
                                                                                }).then(async (result) => {
                                                                                    if (result.isConfirmed) {
                                                                                    } else if (result.dismiss === Swal.DismissReason.cancel) {
                                                                                    }
                                                                                })
                                                                            }
                                                                        } else {
                                                                            Swal.fire({
                                                                                title: '',
                                                                                text: 'ไม่สามารถคำนวณค่าได้',
                                                                                icon: 'error',
                                                                                // showCancelButton: true,
                                                                                // cancelButtonText: 'ยกเลิก',
                                                                                confirmButtonColor: '#3085d6',
                                                                                // cancelButtonColor: '#d33',
                                                                                confirmButtonText: 'ตกลง'
                                                                            }).then(async (result) => {
                                                                                if (result.isConfirmed) {
                                                                                } else if (result.dismiss === Swal.DismissReason.cancel) {
                                                                                }
                                                                            })
                                                                        }
                                                                    }
                                                                }}
                                                            />
                                                            <Typography sx={{ marginLeft: '10px', fontSize: '20px' }}>ครั้งต่อปี</Typography>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid container spacing={2} direction="column" justifyContent="center" alignItems="center" xs={12} sm={12} md={12} lg={12} sx={{ mt: '0px !important' }} >
                                            <Grid item xs={12} sm={12} md={12} lg={8} direction="row">
                                                <Typography variant="subtitle1" component="h3" sx={{ pl: "56px", mb: "10px", display: "block", color: "#01696A", textAlign: "center", fontWeight: 'regular' }}>* สัดส่วนคนจน ถ้ามีค่าน้อย หมายถึง ในจังหวัดมีจำนวนคนจนน้อย ถ้ามีค่ามาก หมายถึง ในจังหวัดมีจำนวนคนจนมาก</Typography>
                                                <Typography variant="subtitle1" component="h3" sx={{ pl: "56px", mb: "10px", display: "block", color: "#01696A", textAlign: "center", fontWeight: 'regular' }}>** ค่าสัมประสิทธิ์  เป็นค่าแสดงค่าความยืดหยุ่น (elasticity) คือ เมื่อตัวแปรอิสระเปลี่ยนแปลงไปร้อยละ 1 จะทำให้ตัวแปรตาม (สัดส่วนคนจน) เปลี่ยนแปลงไปร้อยละเท่าใด เช่น ค่าสัมประสิทธิ์ของตัวแปรสัดส่วนประชากรในวัยทำงาน มีค่าเท่ากับ -9.98</Typography>
                                                <Typography variant="subtitle1" component="h3" sx={{ pl: "56px", mb: "10px", display: "block", color: "#01696A", textAlign: "center", fontWeight: 'regular' }}>หมายความว่า ถ้าหากมีสัดส่วนประชากรวัยทำงานเพิ่มขึ้นร้อยละ 1 จะทำให้สัดส่วนคนจนในจังหวัดนั้นลดลงร้อยละ 9.98 ดังนั้น ถ้าค่าสัมประสิทธิ์เป็นลบ หมายถึง ถ้าตัวแปรนั้นมีค่ามาก จะมีผลทำให้สัดส่วนคนจนลดลง ถ้าค่าสัมประสิทธิ์มีค่าเป็นบวก หมายถึง ถ้าตัวแปรนั้นมีค่ามาก จะมีผลทำให้สัดส่วนคนจนเพิ่มขึ้น</Typography>

                                            </Grid>
                                        </Grid>
                                        <Grid container direction="row" sx={{ mt: { xs: '0px', sm: '0px', md: '0px', lg: '0px' }, mb: '0px' }}>
                                            <Grid container spacing={2} direction="column" justifyContent="center" alignItems="center" xs={12} sm={12} md={12} lg={12} >
                                                <Typography component="h3" variant="subtitle1" sx={{ pt: '0px', color: '#01696A', fontWeight: 'regular' }}>
                                                    *** ทดลองปรับค่าปัจจัยต่างๆ เพื่อคำนวณสัดส่วนความยากจนตามแบบจำลอง
                                                    <IconButton onClick={(e) => { setDialogResetPassword(true) }}>
                                                        <InfoIcon />
                                                    </IconButton>
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                        <Divider />
                                        <Grid container direction="row" spacing={2} sx={{ mt: '20px !important' }}>
                                            <Grid container spacing={2} direction="column" justifyContent="center" alignItems="center" xs={12} sm={12} md={12} lg={4} sx={{ mt: '20px !important' }} >
                                                <Grid item direction="row" xs={12} sm={12} md={12} lg={12} justifyContent="center" justifyItems="center" alignContent="center" alignItems="center" sx={{ overflow: 'hidden', position: 'relative' }}>
                                                    <Grid container direction="column" justifyContent="center" alignItems="center">
                                                        <Typography variant="subtitle1">ln(สัดส่วนคนจน)</Typography>
                                                    </Grid>
                                                    <IgrRadialGauge
                                                        height="500px" width="500px"
                                                        minimumValue={configData.min}
                                                        maximumValue={configData.max}
                                                        scaleStartAngle={180}
                                                        scaleEndAngle={0}
                                                        scaleBrush="#c6c6c6"
                                                        scaleSweepDirection="Clockwise"
                                                        scaleOversweep={1}
                                                        scaleOversweepShape="Fitted"
                                                        value={meterLnValue}
                                                        interval={1}
                                                        labelExtent={0.65}
                                                        font="11px Verdana"
                                                        fontBrush="Black"
                                                        backingOversweep={0}
                                                        backingCornerRadius={0}
                                                        backingStrokeThickness={0}
                                                        backingOuterExtent={0.8}
                                                        backingInnerExtent={0.15}
                                                        rangeBrushes="#47bd29,#FFFF00,#ffad08 ,#bd3829"
                                                        rangeOutlines="#47bd29,#FFFF00,#ffad08 ,#bd3829"
                                                    >
                                                        <IgrRadialGaugeRange name="Poor" startValue={0} endValue={2.5} innerStartExtent={0.45} innerEndExtent={0.45} outerStartExtent={0.57} outerEndExtent={0.57} />
                                                        <IgrRadialGaugeRange name="prettyAverage" startValue={2.5} endValue={5.0} innerStartExtent={0.45} innerEndExtent={0.45} outerStartExtent={0.57} outerEndExtent={0.57} />
                                                        <IgrRadialGaugeRange name="Average" startValue={5.0} endValue={7.5} innerStartExtent={0.45} innerEndExtent={0.45} outerStartExtent={0.57} outerEndExtent={0.57} />
                                                        <IgrRadialGaugeRange name="Good" startValue={7.5} endValue={10.0} innerStartExtent={0.45} innerEndExtent={0.45} outerStartExtent={0.57} outerEndExtent={0.57} />
                                                    </IgrRadialGauge>
                                                    <Grid container spacing={2} direction="column" justifyContent="center" alignItems="center" sx={{ position: 'absolute', bottom: { xs: '30%', sm: '30%', md: '30%', lg: '40%' } }}>
                                                        <Typography item sx={{ fontSize: '30px' }}>
                                                            {meterLnValue}
                                                        </Typography>
                                                        <Grid >
                                                            <Typography variant="subtitle2" noWrap sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                                ผลการประมาณค่าแบบจำลองเศรษฐมิติแสดงความยากจนรายจังหวัด
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} sm={12} md={12} lg={8} sx={{ mt: '20px !important' }}>
                                                <Grid container direction="row" spacing={3} sx={{ pt: 1, pl: { xs: 0, md: 1 } }}>
                                                    <Grid container spacing={2} direction="column" justifyContent="center" alignItems="center" xs={12} sm={12} md={4} lg={4} sx={{ position: 'relative', maxHeight: '250' }}>
                                                        <Typography variant="subtitle1">
                                                            ln(สัดส่วนประชากรวัยแรงงาน (15-60 ปี))
                                                        </Typography>
                                                        <Grid container spacing={2} direction="row" justifyContent="center" alignItems="center" sx={{ marginTop: '10px' }}>
                                                            <Typography variant="subtitle1">
                                                                สัมประสิทธ์
                                                            </Typography>
                                                            <TextField
                                                                type="number"
                                                                disabled={true}
                                                                value={valueB1}
                                                                inputProps={{ min: 0, style: { textAlign: 'center' } }}
                                                                sx={{
                                                                    width: '100px',
                                                                    "& .MuiInputBase-root": {
                                                                        height: '40px'
                                                                    },
                                                                    marginLeft: '5px'
                                                                }}
                                                                variant="outlined"
                                                                onChange={(e) => {
                                                                    let val = e.target.value
                                                                    if (val) {
                                                                        let newValue = parseFloat(val.replace(/,/g, ""))
                                                                        let lnY = governEq(meterLnValueX1, meterLnValueX2, meterLnValueX3, meterLnValueX4, meterLnValueX5, meterLnValueX6, valueB0, newValue, valueB2, valueB3, valueB4, valueB5, valueB6, valueB7, valueD)
                                                                        if (!isNaN(lnY)) {
                                                                            setValueB1(newValue)
                                                                            if (lnY) {
                                                                                let theLnY = Math.exp(lnY)
                                                                                setMeterValue(theLnY.toFixed(4))
                                                                                setMeterLnValue(lnY)
                                                                            }
                                                                        } else {
                                                                            Swal.fire({
                                                                                title: '',
                                                                                text: 'ไม่สามารถคำนวณค่าได้',
                                                                                icon: 'error',
                                                                                // showCancelButton: true,
                                                                                // cancelButtonText: 'ยกเลิก',
                                                                                confirmButtonColor: '#3085d6',
                                                                                // cancelButtonColor: '#d33',
                                                                                confirmButtonText: 'ตกลง'
                                                                            }).then(async (result) => {
                                                                                if (result.isConfirmed) {
                                                                                } else if (result.dismiss === Swal.DismissReason.cancel) {
                                                                                }
                                                                            })
                                                                        }
                                                                    }
                                                                }}
                                                            />
                                                        </Grid>
                                                        <IgrRadialGauge
                                                            height="250px" width="250px"
                                                            minimumValue={configData.min}
                                                            maximumValue={configData.max}
                                                            scaleStartAngle={180}
                                                            scaleEndAngle={0}
                                                            scaleBrush="#c6c6c6"
                                                            scaleSweepDirection="Clockwise"
                                                            scaleOversweep={1}
                                                            scaleOversweepShape="Fitted"
                                                            value={meterLnValueX1}
                                                            interval={1}
                                                            labelExtent={0.65}
                                                            font="11px Verdana"
                                                            fontBrush="Black"
                                                            backingOversweep={0}
                                                            backingCornerRadius={0}
                                                            backingStrokeThickness={0}
                                                            backingOuterExtent={0.8}
                                                            backingInnerExtent={0.15}
                                                            rangeBrushes="#bd3829,#ffad08,#FFFF00,#47bd29"
                                                            rangeOutlines="#bd3829,#ffad08,#FFFF00,#47bd29"
                                                        >
                                                            <IgrRadialGaugeRange name="Poor" startValue={0} endValue={2.5} innerStartExtent={0.45} innerEndExtent={0.45} outerStartExtent={0.57} outerEndExtent={0.57} />
                                                            <IgrRadialGaugeRange name="prettyAverage" startValue={2.5} endValue={5.0} innerStartExtent={0.45} innerEndExtent={0.45} outerStartExtent={0.57} outerEndExtent={0.57} />
                                                            <IgrRadialGaugeRange name="Average" startValue={5.0} endValue={7.5} innerStartExtent={0.45} innerEndExtent={0.45} outerStartExtent={0.57} outerEndExtent={0.57} />
                                                            <IgrRadialGaugeRange name="Good" startValue={7.5} endValue={10.0} innerStartExtent={0.45} innerEndExtent={0.45} outerStartExtent={0.57} outerEndExtent={0.57} />
                                                        </IgrRadialGauge>
                                                        <Grid container spacing={2} direction="column" justifyContent="center" alignItems="center" sx={{ position: 'absolute', bottom: '5%' }}>
                                                            <Grid item>
                                                                <TextField
                                                                    type="number"
                                                                    value={meterLnValueX1}
                                                                    disabled={true}
                                                                    inputProps={{ min: 0, style: { textAlign: 'center' } }}
                                                                    sx={{
                                                                        width: '150px',
                                                                        "& .MuiInputBase-root": {
                                                                            height: '40px'
                                                                        },
                                                                        marginLeft: '5px'
                                                                    }}
                                                                    variant="outlined"
                                                                    onChange={(e) => {
                                                                        let newValue = e.target.value
                                                                        if (newValue) {
                                                                            let lnY = governEq(newValue, meterLnValueX2, meterLnValueX3, meterLnValueX4, meterLnValueX5, meterLnValueX6, valueB0, valueB1, valueB2, valueB3, valueB4, valueB5, valueB6, valueB7, valueD)
                                                                            setMeterLnValueX1(newValue)

                                                                            let theX1 = Math.exp(newValue / 10)
                                                                            setMeterValueX1(theX1)

                                                                            if (lnY) {
                                                                                let theLnY = Math.exp(lnY)
                                                                                setMeterValue(theLnY.toFixed(4))
                                                                                setMeterLnValue(lnY)
                                                                            }
                                                                        }
                                                                    }}
                                                                />
                                                            </Grid>
                                                            {/* <Grid item sx={{ width: { xs: '70%', sm: '40%', md: '80%', lg: '70%' } }}>
                                                                <Slider
                                                                    aria-label="Small steps"
                                                                    defaultValue={0.0}
                                                                    getAriaValueText={valuetext}
                                                                    step={0.05}
                                                                    min={configData.min}
                                                                    max={configData.max}
                                                                    valueLabelDisplay="auto"
                                                                    onChange={handleChangeLnX1}
                                                                    size="small"
                                                                    value={meterLnValueX1}
                                                                />
                                                            </Grid> */}
                                                        </Grid>
                                                    </Grid>
                                                    <Grid container spacing={2} direction="column" justifyContent="center" alignItems="center" xs={12} sm={12} md={4} lg={4} sx={{ position: 'relative', maxHeight: '250' }}>
                                                        <Typography variant="subtitle1">
                                                            ln(จำนวนคนต่างด้าวที่ได้รับอนุญาตทำงาน)
                                                        </Typography>
                                                        <Grid container spacing={2} direction="row" justifyContent="center" alignItems="center" sx={{ marginTop: '10px' }}>
                                                            <Typography variant="subtitle1">
                                                                สัมประสิทธ์
                                                            </Typography>
                                                            <TextField
                                                                type="number"
                                                                value={valueB3}
                                                                disabled={true}
                                                                inputProps={{ min: 0, style: { textAlign: 'center' } }}
                                                                sx={{
                                                                    width: '100px',
                                                                    "& .MuiInputBase-root": {
                                                                        height: '40px'
                                                                    },
                                                                    marginLeft: '5px'
                                                                }}
                                                                variant="outlined"
                                                                onChange={(e) => {
                                                                    let val = e.target.value
                                                                    if (val) {
                                                                        let newValue = parseFloat(val.replace(/,/g, ""))
                                                                        let lnY = governEq(meterLnValueX1, meterLnValueX2, meterLnValueX3, meterLnValueX4, meterLnValueX5, meterLnValueX6, valueB0, valueB1, valueB2, newValue, valueB4, valueB5, valueB6, valueB7, valueD)
                                                                        if (!isNaN(lnY)) {
                                                                            setValueB3(newValue)
                                                                            if (lnY) {
                                                                                let theLnY = Math.exp(lnY)
                                                                                setMeterValue(theLnY.toFixed(4))
                                                                                setMeterLnValue(lnY)
                                                                            }
                                                                        } else {
                                                                            Swal.fire({
                                                                                title: '',
                                                                                text: 'ไม่สามารถคำนวณค่าได้',
                                                                                icon: 'error',
                                                                                // showCancelButton: true,
                                                                                // cancelButtonText: 'ยกเลิก',
                                                                                confirmButtonColor: '#3085d6',
                                                                                // cancelButtonColor: '#d33',
                                                                                confirmButtonText: 'ตกลง'
                                                                            }).then(async (result) => {
                                                                                if (result.isConfirmed) {
                                                                                } else if (result.dismiss === Swal.DismissReason.cancel) {
                                                                                }
                                                                            })
                                                                        }
                                                                    }
                                                                }}
                                                            />
                                                        </Grid>
                                                        <IgrRadialGauge
                                                            height="250px" width="250px"
                                                            minimumValue={configData.min}
                                                            maximumValue={configData.max}
                                                            scaleStartAngle={180}
                                                            scaleEndAngle={0}
                                                            scaleBrush="#c6c6c6"
                                                            scaleSweepDirection="Clockwise"
                                                            scaleOversweep={1}
                                                            scaleOversweepShape="Fitted"
                                                            value={meterLnValueX3}
                                                            interval={1}
                                                            labelExtent={0.65}
                                                            font="11px Verdana"
                                                            fontBrush="Black"
                                                            backingOversweep={0}
                                                            backingCornerRadius={0}
                                                            backingStrokeThickness={0}
                                                            backingOuterExtent={0.8}
                                                            backingInnerExtent={0.15}
                                                            rangeBrushes="#bd3829,#ffad08,#FFFF00,#47bd29"
                                                            rangeOutlines="#bd3829,#ffad08,#FFFF00,#47bd29"
                                                        >
                                                            <IgrRadialGaugeRange name="Poor" startValue={0} endValue={2.5} innerStartExtent={0.45} innerEndExtent={0.45} outerStartExtent={0.57} outerEndExtent={0.57} />
                                                            <IgrRadialGaugeRange name="prettyAverage" startValue={2.5} endValue={5.0} innerStartExtent={0.45} innerEndExtent={0.45} outerStartExtent={0.57} outerEndExtent={0.57} />
                                                            <IgrRadialGaugeRange name="Average" startValue={5.0} endValue={7.5} innerStartExtent={0.45} innerEndExtent={0.45} outerStartExtent={0.57} outerEndExtent={0.57} />
                                                            <IgrRadialGaugeRange name="Good" startValue={7.5} endValue={10.0} innerStartExtent={0.45} innerEndExtent={0.45} outerStartExtent={0.57} outerEndExtent={0.57} />
                                                        </IgrRadialGauge>
                                                        <Grid container spacing={2} direction="column" justifyContent="center" alignItems="center" sx={{ position: 'absolute', bottom: '5%' }}>
                                                            <Grid item>
                                                                <TextField
                                                                    type="number"
                                                                    value={meterLnValueX3}
                                                                    disabled={true}
                                                                    inputProps={{ min: 0, style: { textAlign: 'center' } }}
                                                                    sx={{
                                                                        width: '150px',
                                                                        "& .MuiInputBase-root": {
                                                                            height: '40px'
                                                                        },
                                                                        marginLeft: '5px'
                                                                    }}
                                                                    variant="outlined"
                                                                    onChange={(e) => {
                                                                        let newValue = e.target.value
                                                                        if (newValue) {
                                                                            let lnY = governEq(meterLnValueX3, meterLnValueX2, newValue, meterLnValueX4, meterLnValueX5, meterLnValueX6, valueB0, valueB1, valueB2, valueB3, valueB4, valueB5, valueB6, valueB7, valueD)
                                                                            setMeterLnValueX3(newValue)

                                                                            let theX3 = Math.exp(newValue)
                                                                            theX3 = Math.round(theX3)
                                                                            setMeterValueX3(theX3)

                                                                            if (lnY) {
                                                                                let theLnY = Math.exp(lnY)
                                                                                setMeterValue(theLnY.toFixed(4))
                                                                                setMeterLnValue(lnY)
                                                                            }
                                                                        }
                                                                    }}
                                                                />
                                                            </Grid>
                                                            {/* <Grid item sx={{ width: { xs: '70%', sm: '40%', md: '80%', lg: '70%' } }}>
                                                                <Slider
                                                                    aria-label="Small steps"
                                                                    defaultValue={0.0}
                                                                    getAriaValueText={valuetext}
                                                                    step={0.05}
                                                                    min={configData.min}
                                                                    max={configData.max}
                                                                    valueLabelDisplay="auto"
                                                                    onChange={handleChangeLnX3}
                                                                    value={meterLnValueX3}
                                                                />
                                                            </Grid> */}
                                                        </Grid>
                                                    </Grid>
                                                    <Grid container spacing={2} direction="column" justifyContent="center" alignItems="center" xs={12} sm={12} md={4} lg={4} sx={{ position: 'relative', maxHeight: '250' }}>
                                                        <Typography variant="subtitle1">
                                                            ln(จำนวนแพทย์)
                                                        </Typography>
                                                        <Grid container spacing={2} direction="row" justifyContent="center" alignItems="center" sx={{ marginTop: '10px' }}>
                                                            <Typography variant="subtitle1">
                                                                สัมประสิทธ์
                                                            </Typography>
                                                            <TextField
                                                                type="number"
                                                                value={valueB6}
                                                                disabled={true}
                                                                inputProps={{ min: 0, style: { textAlign: 'center' } }}
                                                                sx={{
                                                                    width: '100px',
                                                                    "& .MuiInputBase-root": {
                                                                        height: '40px'
                                                                    },
                                                                    marginLeft: '5px'
                                                                }}
                                                                variant="outlined"
                                                                onChange={(e) => {
                                                                    let val = e.target.value
                                                                    if (val) {
                                                                        let newValue = parseFloat(val.replace(/,/g, ""))
                                                                        let lnY = governEq(meterLnValueX1, meterLnValueX2, meterLnValueX3, meterLnValueX4, meterLnValueX5, meterLnValueX6, valueB0, valueB1, valueB2, valueB3, valueB4, valueB5, newValue, valueB7, valueD)
                                                                        if (!isNaN(lnY)) {
                                                                            setValueB6(newValue)
                                                                            if (lnY) {
                                                                                let theLnY = Math.exp(lnY)
                                                                                setMeterValue(theLnY.toFixed(4))
                                                                                setMeterLnValue(lnY)
                                                                            }
                                                                        } else {
                                                                            Swal.fire({
                                                                                title: '',
                                                                                text: 'ไม่สามารถคำนวณค่าได้',
                                                                                icon: 'error',
                                                                                // showCancelButton: true,
                                                                                // cancelButtonText: 'ยกเลิก',
                                                                                confirmButtonColor: '#3085d6',
                                                                                // cancelButtonColor: '#d33',
                                                                                confirmButtonText: 'ตกลง'
                                                                            }).then(async (result) => {
                                                                                if (result.isConfirmed) {
                                                                                } else if (result.dismiss === Swal.DismissReason.cancel) {
                                                                                }
                                                                            })
                                                                        }
                                                                    }
                                                                }}
                                                            />
                                                        </Grid>
                                                        <IgrRadialGauge
                                                            height="250px" width="250px"
                                                            minimumValue={configData.min}
                                                            maximumValue={configData.max}
                                                            scaleStartAngle={180}
                                                            scaleEndAngle={0}
                                                            scaleBrush="#c6c6c6"
                                                            scaleSweepDirection="Clockwise"
                                                            scaleOversweep={1}
                                                            scaleOversweepShape="Fitted"
                                                            value={meterLnValueX6}
                                                            interval={1}
                                                            labelExtent={0.65}
                                                            font="11px Verdana"
                                                            fontBrush="Black"
                                                            backingOversweep={0}
                                                            backingCornerRadius={0}
                                                            backingStrokeThickness={0}
                                                            backingOuterExtent={0.8}
                                                            backingInnerExtent={0.15}
                                                            rangeBrushes="#bd3829,#ffad08,#FFFF00,#47bd29"
                                                            rangeOutlines="#bd3829,#ffad08,#FFFF00,#47bd29"
                                                        >
                                                            <IgrRadialGaugeRange name="Poor" startValue={0} endValue={2.5} innerStartExtent={0.45} innerEndExtent={0.45} outerStartExtent={0.57} outerEndExtent={0.57} />
                                                            <IgrRadialGaugeRange name="prettyAverage" startValue={2.5} endValue={5.0} innerStartExtent={0.45} innerEndExtent={0.45} outerStartExtent={0.57} outerEndExtent={0.57} />
                                                            <IgrRadialGaugeRange name="Average" startValue={5.0} endValue={7.5} innerStartExtent={0.45} innerEndExtent={0.45} outerStartExtent={0.57} outerEndExtent={0.57} />
                                                            <IgrRadialGaugeRange name="Good" startValue={7.5} endValue={10.0} innerStartExtent={0.45} innerEndExtent={0.45} outerStartExtent={0.57} outerEndExtent={0.57} />
                                                        </IgrRadialGauge>
                                                        <Grid container spacing={2} direction="column" justifyContent="center" alignItems="center" sx={{ position: 'absolute', bottom: '5%' }}>
                                                            <Grid item>
                                                                <TextField
                                                                    type="number"
                                                                    value={meterLnValueX6}
                                                                    disabled={true}
                                                                    inputProps={{ min: 0, style: { textAlign: 'center' } }}
                                                                    sx={{
                                                                        width: '150px',
                                                                        "& .MuiInputBase-root": {
                                                                            height: '40px'
                                                                        },
                                                                        marginLeft: '5px'
                                                                    }}
                                                                    variant="outlined"
                                                                    onChange={(e) => {
                                                                        let newValue = e.target.value
                                                                        if (newValue) {
                                                                            let lnY = governEq(meterLnValueX1, meterLnValueX2, meterLnValueX3, meterLnValueX4, meterLnValueX5, newValue, valueB0, valueB1, valueB2, valueB3, valueB4, valueB5, valueB6, valueB7, valueD)
                                                                            setMeterLnValueX6(newValue)

                                                                            let theX6 = Math.exp(newValue)
                                                                            theX6 = Math.round(theX6)
                                                                            setMeterValueX6(theX6)

                                                                            if (lnY) {
                                                                                let theLnY = Math.exp(lnY)
                                                                                setMeterValue(theLnY.toFixed(4))
                                                                                setMeterLnValue(lnY)
                                                                            }
                                                                        }
                                                                    }}
                                                                />
                                                            </Grid>
                                                            {/* <Grid item sx={{ width: { xs: '70%', sm: '40%', md: '80%', lg: '70%' } }}>
                                                                <Slider
                                                                    aria-label="Small steps"
                                                                    defaultValue={0.0}
                                                                    getAriaValueText={valuetext}
                                                                    step={0.05}
                                                                    min={configData.min}
                                                                    max={configData.max}
                                                                    valueLabelDisplay="auto"
                                                                    onChange={handleChangeLnX6}
                                                                    value={meterLnValueX6}
                                                                />
                                                            </Grid> */}
                                                        </Grid>
                                                    </Grid>
                                                    <Grid container spacing={2} direction="column" justifyContent="center" alignItems="center" xs={12} sm={12} md={4} lg={4} sx={{ position: 'relative', maxHeight: '250' }}>
                                                        <Typography variant="subtitle1">
                                                            ln(สัดส่วนประชากรสูงวัย (อายุ 60 ปีขึ้นไป))
                                                        </Typography>
                                                        <Grid container spacing={2} direction="row" justifyContent="center" alignItems="center" sx={{ marginTop: '10px' }}>
                                                            <Typography variant="subtitle1">
                                                                สัมประสิทธ์
                                                            </Typography>
                                                            <TextField
                                                                type="number"
                                                                value={valueB2}
                                                                disabled={true}
                                                                inputProps={{ min: 0, style: { textAlign: 'center' } }}
                                                                sx={{
                                                                    width: '100px',
                                                                    "& .MuiInputBase-root": {
                                                                        height: '40px'
                                                                    },
                                                                    marginLeft: '5px'
                                                                }}
                                                                variant="outlined"
                                                                onChange={(e) => {
                                                                    let val = e.target.value
                                                                    if (val) {
                                                                        let newValue = parseFloat(val.replace(/,/g, ""))
                                                                        let lnY = governEq(meterLnValueX1, meterLnValueX2, meterLnValueX3, meterLnValueX4, meterLnValueX5, meterLnValueX6, valueB0, valueB1, newValue, valueB3, valueB4, valueB5, valueB6, valueB7, valueD)
                                                                        if (!isNaN(lnY)) {
                                                                            setValueB2(newValue)
                                                                            if (lnY) {
                                                                                let theLnY = Math.exp(lnY)
                                                                                setMeterValue(theLnY.toFixed(4))
                                                                                setMeterLnValue(lnY)
                                                                            }
                                                                        } else {
                                                                            Swal.fire({
                                                                                title: '',
                                                                                text: 'ไม่สามารถคำนวณค่าได้',
                                                                                icon: 'error',
                                                                                // showCancelButton: true,
                                                                                // cancelButtonText: 'ยกเลิก',
                                                                                confirmButtonColor: '#3085d6',
                                                                                // cancelButtonColor: '#d33',
                                                                                confirmButtonText: 'ตกลง'
                                                                            }).then(async (result) => {
                                                                                if (result.isConfirmed) {
                                                                                } else if (result.dismiss === Swal.DismissReason.cancel) {
                                                                                }
                                                                            })
                                                                        }
                                                                    }
                                                                }}
                                                            />
                                                        </Grid>
                                                        <IgrRadialGauge
                                                            height="250px" width="250px"
                                                            minimumValue={configData.min}
                                                            maximumValue={configData.max}
                                                            scaleStartAngle={180}
                                                            scaleEndAngle={0}
                                                            scaleBrush="#c6c6c6"
                                                            scaleSweepDirection="Clockwise"
                                                            scaleOversweep={1}
                                                            scaleOversweepShape="Fitted"
                                                            value={meterLnValueX2}
                                                            interval={1}
                                                            labelExtent={0.65}
                                                            font="11px Verdana"
                                                            fontBrush="Black"
                                                            backingOversweep={0}
                                                            backingCornerRadius={0}
                                                            backingStrokeThickness={0}
                                                            backingOuterExtent={0.8}
                                                            backingInnerExtent={0.15}
                                                            rangeBrushes="#47bd29,#FFFF00, #ffad08 ,#bd3829"
                                                            rangeOutlines="#47bd29,#FFFF00, #ffad08 ,#bd3829"
                                                        >
                                                            <IgrRadialGaugeRange name="Poor" startValue={0} endValue={2.5} innerStartExtent={0.45} innerEndExtent={0.45} outerStartExtent={0.57} outerEndExtent={0.57} />
                                                            <IgrRadialGaugeRange name="prettyAverage" startValue={2.5} endValue={5.0} innerStartExtent={0.45} innerEndExtent={0.45} outerStartExtent={0.57} outerEndExtent={0.57} />
                                                            <IgrRadialGaugeRange name="Average" startValue={5.0} endValue={7.5} innerStartExtent={0.45} innerEndExtent={0.45} outerStartExtent={0.57} outerEndExtent={0.57} />
                                                            <IgrRadialGaugeRange name="Good" startValue={7.5} endValue={10.0} innerStartExtent={0.45} innerEndExtent={0.45} outerStartExtent={0.57} outerEndExtent={0.57} />
                                                        </IgrRadialGauge>
                                                        <Grid container spacing={2} direction="column" justifyContent="center" alignItems="center" sx={{ position: 'absolute', bottom: '5%' }}>
                                                            <Grid item>
                                                                <TextField
                                                                    type="number"
                                                                    value={meterLnValueX2}
                                                                    disabled={true}
                                                                    inputProps={{ min: 0, style: { textAlign: 'center' } }}
                                                                    sx={{
                                                                        width: '150px',
                                                                        "& .MuiInputBase-root": {
                                                                            height: '40px'
                                                                        },
                                                                        marginLeft: '5px'
                                                                    }}
                                                                    variant="outlined"
                                                                    onChange={(e) => {
                                                                        let newValue = e.target.value
                                                                        if (newValue) {
                                                                            let lnY = governEq(meterLnValueX1, newValue, meterLnValueX3, meterLnValueX4, meterLnValueX5, meterLnValueX6, valueB0, valueB1, valueB2, valueB3, valueB4, valueB5, valueB6, valueB7, valueD)
                                                                            setMeterLnValueX2(newValue)

                                                                            let theX2 = Math.exp(newValue)
                                                                            setMeterValueX2(theX2)

                                                                            if (lnY) {
                                                                                let theLnY = Math.exp(lnY)
                                                                                setMeterValue(theLnY.toFixed(4))
                                                                                setMeterLnValue(lnY)
                                                                            }
                                                                        }
                                                                    }}
                                                                />
                                                            </Grid>
                                                            {/* <Grid item sx={{ width: { xs: '70%', sm: '40%', md: '80%', lg: '70%' } }}>
                                                                <Slider
                                                                    aria-label="Small steps"
                                                                    defaultValue={0.0}
                                                                    getAriaValueText={valuetext}
                                                                    step={0.05}
                                                                    min={configData.min}
                                                                    max={configData.max}
                                                                    valueLabelDisplay="auto"
                                                                    onChange={handleChangeLnX2}
                                                                    value={meterLnValueX2}
                                                                />
                                                            </Grid> */}
                                                        </Grid>
                                                    </Grid>
                                                    <Grid container spacing={2} direction="column" justifyContent="center" alignItems="center" xs={12} sm={12} md={4} lg={4} sx={{ position: 'relative', maxHeight: '250' }}>
                                                        <Typography variant="subtitle1">
                                                            ln(จำนวนรวมรับแจ้งคดียาเสพติด)
                                                        </Typography>
                                                        <Grid container spacing={2} direction="row" justifyContent="center" alignItems="center" sx={{ marginTop: '10px' }}>
                                                            <Typography variant="subtitle1">
                                                                สัมประสิทธ์
                                                            </Typography>
                                                            <TextField
                                                                type="number"
                                                                value={valueB4}
                                                                disabled={true}
                                                                inputProps={{ min: 0, style: { textAlign: 'center' } }}
                                                                sx={{
                                                                    width: '100px',
                                                                    "& .MuiInputBase-root": {
                                                                        height: '40px'
                                                                    },
                                                                    marginLeft: '5px'
                                                                }}
                                                                variant="outlined"
                                                                onChange={(e) => {
                                                                    let val = e.target.value
                                                                    if (val) {
                                                                        let newValue = parseFloat(val.replace(/,/g, ""))
                                                                        let lnY = governEq(meterLnValueX1, meterLnValueX2, meterLnValueX3, meterLnValueX4, meterLnValueX5, meterLnValueX6, valueB0, valueB1, valueB2, valueB3, newValue, valueB5, valueB6, valueB7, valueD)
                                                                        if (!isNaN(lnY)) {
                                                                            setValueB4(newValue)
                                                                            if (lnY) {
                                                                                let theLnY = Math.exp(lnY)
                                                                                setMeterValue(theLnY.toFixed(4))
                                                                                setMeterLnValue(lnY)
                                                                            }
                                                                        } else {
                                                                            Swal.fire({
                                                                                title: '',
                                                                                text: 'ไม่สามารถคำนวณค่าได้',
                                                                                icon: 'error',
                                                                                // showCancelButton: true,
                                                                                // cancelButtonText: 'ยกเลิก',
                                                                                confirmButtonColor: '#3085d6',
                                                                                // cancelButtonColor: '#d33',
                                                                                confirmButtonText: 'ตกลง'
                                                                            }).then(async (result) => {
                                                                                if (result.isConfirmed) {
                                                                                } else if (result.dismiss === Swal.DismissReason.cancel) {
                                                                                }
                                                                            })
                                                                        }
                                                                    }
                                                                }}
                                                            />
                                                        </Grid>
                                                        <IgrRadialGauge
                                                            height="250px" width="250px"
                                                            minimumValue={configData.min}
                                                            maximumValue={configData.max}
                                                            scaleStartAngle={180}
                                                            scaleEndAngle={0}
                                                            scaleBrush="#c6c6c6"
                                                            scaleSweepDirection="Clockwise"
                                                            scaleOversweep={1}
                                                            scaleOversweepShape="Fitted"
                                                            value={meterLnValueX4}
                                                            interval={1}
                                                            labelExtent={0.65}
                                                            font="11px Verdana"
                                                            fontBrush="Black"
                                                            backingOversweep={0}
                                                            backingCornerRadius={0}
                                                            backingStrokeThickness={0}
                                                            backingOuterExtent={0.8}
                                                            backingInnerExtent={0.15}
                                                            rangeBrushes="#47bd29,#FFFF00, #ffad08 ,#bd3829"
                                                            rangeOutlines="#47bd29,#FFFF00, #ffad08 ,#bd3829"
                                                        >
                                                            <IgrRadialGaugeRange name="Poor" startValue={0} endValue={2.5} innerStartExtent={0.45} innerEndExtent={0.45} outerStartExtent={0.57} outerEndExtent={0.57} />
                                                            <IgrRadialGaugeRange name="prettyAverage" startValue={2.5} endValue={5.0} innerStartExtent={0.45} innerEndExtent={0.45} outerStartExtent={0.57} outerEndExtent={0.57} />
                                                            <IgrRadialGaugeRange name="Average" startValue={5.0} endValue={7.5} innerStartExtent={0.45} innerEndExtent={0.45} outerStartExtent={0.57} outerEndExtent={0.57} />
                                                            <IgrRadialGaugeRange name="Good" startValue={7.5} endValue={10.0} innerStartExtent={0.45} innerEndExtent={0.45} outerStartExtent={0.57} outerEndExtent={0.57} />
                                                        </IgrRadialGauge>
                                                        <Grid container spacing={2} direction="column" justifyContent="center" alignItems="center" sx={{ position: 'absolute', bottom: '5%' }}>
                                                            <Grid item>
                                                                <TextField
                                                                    type="number"
                                                                    value={meterLnValueX4}
                                                                    disabled={true}
                                                                    inputProps={{ min: 0, style: { textAlign: 'center' } }}
                                                                    sx={{
                                                                        width: '150px',
                                                                        "& .MuiInputBase-root": {
                                                                            height: '40px'
                                                                        },
                                                                        marginLeft: '5px'
                                                                    }}
                                                                    variant="outlined"
                                                                    onChange={(e) => {
                                                                        let newValue = e.target.value
                                                                        if (newValue) {
                                                                            let lnY = governEq(meterLnValueX1, meterLnValueX2, meterLnValueX3, newValue, meterLnValueX5, meterLnValueX6, valueB0, valueB1, valueB2, valueB3, valueB4, valueB5, valueB6, valueB7, valueD)
                                                                            setMeterLnValueX4(newValue)

                                                                            let theX4 = Math.exp(newValue)
                                                                            theX4 = Math.round(theX4)
                                                                            setMeterValueX2(theX4)

                                                                            if (lnY) {
                                                                                let theLnY = Math.exp(lnY)
                                                                                setMeterValue(theLnY.toFixed(4))
                                                                                setMeterLnValue(lnY)
                                                                            }
                                                                        }
                                                                    }}
                                                                />
                                                            </Grid>
                                                            {/* <Grid item sx={{ width: { xs: '70%', sm: '40%', md: '80%', lg: '70%' } }}>
                                                                <Slider
                                                                    aria-label="Small steps"
                                                                    defaultValue={0.0}
                                                                    getAriaValueText={valuetext}
                                                                    step={0.05}
                                                                    min={configData.min}
                                                                    max={configData.max}
                                                                    valueLabelDisplay="auto"
                                                                    onChange={handleChangeLnX4}
                                                                    value={meterLnValueX4}
                                                                />
                                                            </Grid> */}
                                                        </Grid>
                                                    </Grid>
                                                    <Grid container spacing={2} direction="column" justifyContent="center" alignItems="center" xs={12} sm={12} md={4} lg={4} sx={{ position: 'relative', maxHeight: '250' }}>
                                                        <Typography variant="subtitle1">
                                                            ln(จำนวนรับแจ้งคดีความผิดเกี่ยวกับชีวิต ร่างกาย ฯ)
                                                        </Typography>
                                                        <Grid container spacing={2} direction="row" justifyContent="center" alignItems="center" sx={{ marginTop: '10px' }}>
                                                            <Typography variant="subtitle1">
                                                                สัมประสิทธ์
                                                            </Typography>
                                                            <TextField
                                                                type="number"
                                                                disabled={true}
                                                                inputProps={{ min: 0, style: { textAlign: 'center' } }}
                                                                value={valueB5} sx={{
                                                                    width: '100px',
                                                                    "& .MuiInputBase-root": {
                                                                        height: '40px'
                                                                    },
                                                                    marginLeft: '5px'
                                                                }}
                                                                variant="outlined"
                                                                onChange={(e) => {
                                                                    let val = e.target.value
                                                                    if (val) {
                                                                        let newValue = parseFloat(val.replace(/,/g, ""))
                                                                        let lnY = governEq(meterLnValueX1, meterLnValueX2, meterLnValueX3, meterLnValueX4, meterLnValueX5, meterLnValueX6, valueB0, valueB1, valueB2, valueB3, valueB4, newValue, valueB6, valueB7, valueD)
                                                                        if (!isNaN(lnY)) {
                                                                            setValueB5(newValue)
                                                                            if (lnY) {
                                                                                let theLnY = Math.exp(lnY)
                                                                                setMeterValue(theLnY.toFixed(4))
                                                                                setMeterLnValue(lnY)
                                                                            }
                                                                        } else {
                                                                            Swal.fire({
                                                                                title: '',
                                                                                text: 'ไม่สามารถคำนวณค่าได้',
                                                                                icon: 'error',
                                                                                // showCancelButton: true,
                                                                                // cancelButtonText: 'ยกเลิก',
                                                                                confirmButtonColor: '#3085d6',
                                                                                // cancelButtonColor: '#d33',
                                                                                confirmButtonText: 'ตกลง'
                                                                            }).then(async (result) => {
                                                                                if (result.isConfirmed) {
                                                                                } else if (result.dismiss === Swal.DismissReason.cancel) {
                                                                                }
                                                                            })
                                                                        }
                                                                    }
                                                                }}
                                                            />
                                                        </Grid>
                                                        <IgrRadialGauge
                                                            height="250px" width="250px"
                                                            minimumValue={configData.min}
                                                            maximumValue={configData.max}
                                                            scaleStartAngle={180}
                                                            scaleEndAngle={0}
                                                            scaleBrush="#c6c6c6"
                                                            scaleSweepDirection="Clockwise"
                                                            scaleOversweep={1}
                                                            scaleOversweepShape="Fitted"
                                                            value={meterLnValueX5}
                                                            interval={1}
                                                            labelExtent={0.65}
                                                            font="11px Verdana"
                                                            fontBrush="Black"
                                                            backingOversweep={0}
                                                            backingCornerRadius={0}
                                                            backingStrokeThickness={0}
                                                            backingOuterExtent={0.8}
                                                            backingInnerExtent={0.15}
                                                            rangeBrushes="#47bd29,#FFFF00, #ffad08 ,#bd3829"
                                                            rangeOutlines="#47bd29,#FFFF00, #ffad08 ,#bd3829"
                                                        >
                                                            <IgrRadialGaugeRange name="Poor" startValue={0} endValue={2.5} innerStartExtent={0.45} innerEndExtent={0.45} outerStartExtent={0.57} outerEndExtent={0.57} />
                                                            <IgrRadialGaugeRange name="prettyAverage" startValue={2.5} endValue={5.0} innerStartExtent={0.45} innerEndExtent={0.45} outerStartExtent={0.57} outerEndExtent={0.57} />
                                                            <IgrRadialGaugeRange name="Average" startValue={5.0} endValue={7.5} innerStartExtent={0.45} innerEndExtent={0.45} outerStartExtent={0.57} outerEndExtent={0.57} />
                                                            <IgrRadialGaugeRange name="Good" startValue={7.5} endValue={10.0} innerStartExtent={0.45} innerEndExtent={0.45} outerStartExtent={0.57} outerEndExtent={0.57} />
                                                        </IgrRadialGauge>
                                                        <Grid container spacing={2} direction="column" justifyContent="center" alignItems="center" sx={{ position: 'absolute', bottom: '5%' }}>
                                                            <Grid item>
                                                                <TextField
                                                                    type="number"
                                                                    value={meterLnValueX5}
                                                                    disabled={true}
                                                                    inputProps={{ min: 0, style: { textAlign: 'center' } }}
                                                                    sx={{
                                                                        width: '150px',
                                                                        "& .MuiInputBase-root": {
                                                                            height: '40px'
                                                                        },
                                                                        marginLeft: '5px'
                                                                    }}
                                                                    variant="outlined"
                                                                    onChange={(e) => {
                                                                        let newValue = e.target.value
                                                                        if (newValue) {
                                                                            let lnY = governEq(meterLnValueX1, meterLnValueX2, meterLnValueX3, meterLnValueX4, newValue, meterLnValueX6, valueB0, valueB1, valueB2, valueB3, valueB4, valueB5, valueB6, valueB7, valueD)
                                                                            setMeterLnValueX5(newValue)

                                                                            let theX5 = Math.exp(newValue)
                                                                            theX5 = Math.round(theX5)
                                                                            setMeterValueX5(theX5)

                                                                            if (lnY) {
                                                                                let theLnY = Math.exp(lnY)
                                                                                setMeterValue(theLnY.toFixed(4))
                                                                                setMeterLnValue(lnY)
                                                                            }
                                                                        }
                                                                    }}
                                                                />
                                                            </Grid>
                                                            {/* <Grid item sx={{ width: { xs: '70%', sm: '40%', md: '80%', lg: '70%' } }}>
                                                                <Slider
                                                                    aria-label="Small steps"
                                                                    defaultValue={0.0}
                                                                    getAriaValueText={valuetext}
                                                                    step={0.05}
                                                                    min={configData.min}
                                                                    max={configData.max}
                                                                    valueLabelDisplay="auto"
                                                                    onChange={handleChangeLnX5}
                                                                    value={meterLnValueX5}
                                                                />
                                                            </Grid> */}
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Divider style={{ width: '100%' }} />
                                        <Grid container direction="row" item justifyContent="start" justifyItems="start" alignContent="center" alignItems="center" sx={{ mt: '0px !important' }}>
                                            <Typography variant="subtitle1" sx={{ pl: '30px' }}>
                                                แนวโน้มสัดส่วนคนจน
                                            </Typography>
                                            <Grid item xs={12} sm={3} md={3} lg={3} >
                                                <Autocomplete
                                                    id="provinces_2"
                                                    value={search2.province}
                                                    sx={{
                                                        "& .MuiInputBase-root": {
                                                            height: '50px'
                                                        },
                                                        marginLeft: '10px',
                                                        mt: '10px',
                                                    }}
                                                    onChange={async (event, newValue) => {
                                                        if (newValue) {
                                                            //console.log(newValue)
                                                            setSearch2(search2 => ({ ...search2, ...{ province: newValue } }))
                                                            setAXaxis([{
                                                                scaleType: 'band',
                                                                data: [],
                                                                id: 'years',
                                                                label: 'years',
                                                            }])
                                                            setAYaxis([{
                                                                type: 'line',
                                                                id: 'provertyRatio',
                                                                yAxisKey: 'provertyRatio',
                                                                data: [],
                                                                label: 'provertyRatio',
                                                            }])
                                                            let data = {
                                                                provinceId: newValue.province_id,
                                                                year: search2.year.year,
                                                                toYear: search2.toYear.year,
                                                                x1: search2.x1,
                                                                x2: search2.x2,
                                                                x3: search2.x3,
                                                                x4: search2.x4,
                                                                x5: search2.x5,
                                                                x6: search2.x6
                                                            }

                                                            //console.log(search2.province)

                                                            let dataList = await KuPovertyRatioApi.getDataFromList(data);
                                                            //console.log(dataList.data[0][1])
                                                            //console.log(aYaxis)
                                                            setAXaxis(dataList.data[0][0])
                                                            setAYaxis(dataList.data[0][1])
                                                        } else {

                                                        }
                                                    }}
                                                    options={configData.province}
                                                    getOptionLabel={(option) => option.province}
                                                    renderInput={(params) => (
                                                        <TextField {...params} label="จังหวัด" />
                                                    )}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={3} md={3} lg={3} >
                                                <Autocomplete
                                                    id="years_2_1"
                                                    value={search2.year}
                                                    sx={{
                                                        "& .MuiInputBase-root": {
                                                            height: '50px'
                                                        },
                                                        marginLeft: '10px',
                                                        mt: '10px',
                                                    }}
                                                    onChange={async (event, newValue) => {
                                                        if (newValue) {
                                                            //console.log(newValue)

                                                            setAXaxis([{
                                                                scaleType: 'band',
                                                                data: [],
                                                                id: 'years',
                                                                label: 'years',
                                                            }])
                                                            setAYaxis([{
                                                                type: 'line',
                                                                id: 'provertyRatio',
                                                                yAxisKey: 'provertyRatio',
                                                                data: [],
                                                                label: 'provertyRatio',

                                                            }])

                                                            if (newValue.year < search2.toYear.year && search2.toYear.year != null) {
                                                                setSearch2(search2 => ({ ...search2, ...{ year: newValue } }))
                                                                let data = {
                                                                    provinceId: search2.province.provinceId ? search2.province.provinceId : search2.province.province_id,
                                                                    year: newValue.year,
                                                                    toYear: search2.toYear.year,
                                                                    x1: search2.x1,
                                                                    x2: search2.x2,
                                                                    x3: search2.x3,
                                                                    x4: search2.x4,
                                                                    x5: search2.x5,
                                                                    x6: search2.x6
                                                                }
                                                                //console.log(search2.province)
                                                                let dataList = await KuPovertyRatioApi.getDataFromList(data);
                                                                //console.log(dataList.data[0][1])
                                                                //console.log(aYaxis)
                                                                setAXaxis(dataList.data[0][0])
                                                                setAYaxis(dataList.data[0][1])
                                                            } else {
                                                                Swal.fire({
                                                                    title: 'ปีต้องน้อยกว่า',
                                                                    icon: 'warning'
                                                                })
                                                                setSearch2(search2 => ({ ...search2, ...{ toYear: newValue, year: newValue } }))
                                                                let data = {
                                                                    provinceId: search2.province.provinceId ? search2.province.provinceId : search2.province.province_id,
                                                                    year: newValue.year,
                                                                    toYear: newValue.year,
                                                                    x1: search2.x1,
                                                                    x2: search2.x2,
                                                                    x3: search2.x3,
                                                                    x4: search2.x4,
                                                                    x5: search2.x5,
                                                                    x6: search2.x6
                                                                }
                                                                //console.log(search2.province)

                                                                let dataList = await KuPovertyRatioApi.getDataFromList(data);
                                                                //console.log(dataList.data[0][1])
                                                                //console.log(aYaxis)
                                                                setAXaxis(dataList.data[0][0])
                                                                setAYaxis(dataList.data[0][1])
                                                            }
                                                        }
                                                    }}
                                                    options={configData.year}
                                                    getOptionLabel={(option) => option.year}
                                                    renderInput={(params) => (
                                                        <TextField {...params} label="ตั้งแต่ปี" />
                                                    )}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={3} md={3} lg={3} >
                                                <Autocomplete
                                                    id="years_2_2"
                                                    value={search2.toYear}
                                                    sx={{
                                                        "& .MuiInputBase-root": {
                                                            height: '50px'
                                                        },
                                                        marginLeft: '10px',
                                                        mt: '10px',
                                                    }}
                                                    onChange={async (event, newValue) => {
                                                        if (newValue) {
                                                            ////console.log(newValue, search.year.year)

                                                            setAXaxis([{
                                                                scaleType: 'band',
                                                                data: [],
                                                                id: 'years',
                                                                label: 'years',
                                                            }])
                                                            setAYaxis([{
                                                                type: 'line',
                                                                id: 'provertyRatio',
                                                                yAxisKey: 'provertyRatio',
                                                                data: [],
                                                                label: 'provertyRatio',
                                                                color: 'red'
                                                            }])

                                                            if (newValue.year > search2.year.year && search2.year.year != null) {

                                                                setSearch2(search2 => ({ ...search2, ...{ toYear: newValue } }))

                                                                let data = {
                                                                    provinceId: search2.province.provinceId ? search2.province.provinceId : search2.province.province_id,
                                                                    year: search2.year.year,
                                                                    toYear: newValue.year,
                                                                    x1: search2.x1,
                                                                    x2: search2.x2,
                                                                    x3: search2.x3,
                                                                    x4: search2.x4,
                                                                    x5: search2.x5,
                                                                    x6: search2.x6
                                                                }

                                                                let dataList = await KuPovertyRatioApi.getDataFromList(data);
                                                                //console.log(dataList.data[0][1])
                                                                //console.log(aYaxis)
                                                                setAXaxis(dataList.data[0][0])
                                                                setAYaxis(dataList.data[0][1])
                                                            } else {
                                                                Swal.fire({
                                                                    title: 'ปีต้องมากกว่า',
                                                                    icon: 'warning'
                                                                })

                                                                setSearch2(search2 => ({ ...search2, ...{ toYear: newValue, year: newValue } }))

                                                                let data = {
                                                                    provinceId: search2.province.provinceId ? search2.province.provinceId : search2.province.province_id,
                                                                    year: newValue.year,
                                                                    toYear: newValue.year,
                                                                    x1: search2.x1,
                                                                    x2: search2.x2,
                                                                    x3: search2.x3,
                                                                    x4: search2.x4,
                                                                    x5: search2.x5,
                                                                    x6: search2.x6
                                                                }

                                                                let dataList = await KuPovertyRatioApi.getDataFromList(data);
                                                                //console.log(dataList.data[0][1])
                                                                //console.log(aYaxis)
                                                                setAXaxis(dataList.data[0][0])
                                                                setAYaxis(dataList.data[0][1])
                                                            }
                                                        }
                                                    }}
                                                    options={configData.year}
                                                    getOptionLabel={(option) => option.year}
                                                    renderInput={(params) => (
                                                        <TextField {...params} label="ถึงปี" />
                                                    )}
                                                />
                                            </Grid>
                                        </Grid>
                                        <Grid container direction="row" justifyContent="center" justifyItems="center" alignContent="center" alignItems="center" spacing={2} sx={{ mt: '30px' }}>
                                            <Grid item alignContent="center" alignItems="center" xs={12} sm={12} md={8} lg={8}>
                                                <ResponsiveChartContainer
                                                    xAxis={aXaxis}
                                                    yAxis={[{ id: 'provertyRatio' }, { id: 'ratios' }]}
                                                    series={aYaxis}
                                                    height={500}
                                                    margin={{ left: 70, right: 70 }}
                                                    sx={{
                                                        [`.${axisClasses.left} .${axisClasses.label}`]: {
                                                            transform: 'translate(-25px, 0)',
                                                        },
                                                        [`.${axisClasses.right} .${axisClasses.label}`]: {
                                                            transform: 'translate(30px, 0)',
                                                        },
                                                    }}
                                                >
                                                    <BarPlot />
                                                    <LinePlot />
                                                    <ChartsXAxis axisId="years" label="ปี" />
                                                    <ChartsYAxis axisId="ratios" label="สัตส่วนตัวแปรที่เกี่ยวข้อง" />
                                                    <ChartsYAxis axisId="provertyRatio" position="right" label="สัดส่วนความยากจน" />
                                                </ResponsiveChartContainer>
                                            </Grid>
                                            <Grid item xs={12} sm={12} md={4} lg={4} sx={{ py: 1 }} alignContent="center" alignItems="center">
                                                <Typography variant="subtitle1">
                                                    เลือกข้อมูลที่ต้องการแสดงในแผนภาพ
                                                </Typography>
                                                <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
                                                    <FormControlLabel
                                                        label="สัดส่วนวัยแรงงาน (15-59 ปี)"
                                                        control={<Checkbox checked={search2.x1} onChange={handleChange1} sx={{
                                                            color: "#2E96FF",
                                                            '&.Mui-checked': {
                                                                color: "#2E96FF",
                                                            },
                                                        }} />}
                                                    />
                                                    <FormControlLabel
                                                        label="สัดส่วนวัยสูงอายุ (60 ปีขึ้นไป)"
                                                        control={<Checkbox checked={search2.x2} onChange={handleChange2} sx={{
                                                            color: "#B800D8",
                                                            '&.Mui-checked': {
                                                                color: "#B800D8",
                                                            },
                                                        }} />}
                                                    />
                                                    <FormControlLabel
                                                        label="สัดส่วนคนต่างด้าว"
                                                        control={<Checkbox checked={search2.x3} onChange={handleChange3} sx={{
                                                            color: "#60009B",
                                                            '&.Mui-checked': {
                                                                color: "#60009B",
                                                            },
                                                        }} />}
                                                    />
                                                    <FormControlLabel
                                                        label="สัดส่วนรวมรับแจ้งคดียาเสพติด"
                                                        control={<Checkbox checked={search2.x4} onChange={handleChange4} sx={{
                                                            color: "#2731C8",
                                                            '&.Mui-checked': {
                                                                color: "#2731C8",
                                                            },
                                                        }} />}
                                                    />
                                                    <FormControlLabel
                                                        label="สัดส่วนรับฐานความผิดพิเศษ"
                                                        control={<Checkbox checked={search2.x5} onChange={handleChange5} sx={{
                                                            color: "#03008D",
                                                            '&.Mui-checked': {
                                                                color: "#03008D",
                                                            },
                                                        }} />}
                                                    />
                                                    <FormControlLabel
                                                        label="สัดส่วนจำนวนแพทย์"
                                                        control={<Checkbox checked={search2.x6} onChange={handleChange6} sx={{
                                                            color: "#02B2AF",
                                                            '&.Mui-checked': {
                                                                color: "#02B2AF",
                                                            },
                                                        }} />}
                                                    />
                                                </Box>
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
                            <Dialog fullWidth open={dialogResetPassword} sx={{ width: '100%', height: '100%' }} onClose={() => { setDialogResetPassword(false) }} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-slide-description" maxWidth="800px">
                                <Grid container spacing={2} sx={{ pt: 2, pb: '20px', pl: 2, pr: 2 }}>
                                    <Grid container direction="row" sx={{ mt: '20px', mb: '20px' }}>
                                        <Grid item container direction="column" justifyContent="center" alignItems="center" xs={12} sm={12} md={12} lg={7} sx={{ width: '100%', overflow: 'hidden', justifyContent: 'center', alignContent: 'center' }}>
                                            <Paper sx={{ width: '100%', justifyContent: 'center', alignContent: 'center' }}>
                                                <img src={"/images/formula.png"} width={'100%'} className="image" />
                                            </Paper>
                                        </Grid>
                                        <Grid item container direction="column" justifyContent="center" alignItems="center" xs={12} sm={12} md={12} lg={5} sx={{ width: '100%', overflow: 'hidden', justifyContent: 'center', alignContent: 'center' }}>
                                            <Paper sx={{ width: '100%', justifyContent: 'center', alignContent: 'center' }}>
                                                <TableContainer component={Paper} sx={{ backgroundColor: '#ffffff' }}>
                                                    <Table sx={{ height: "10px" }} stickyHeader aria-label="custom pagination table">
                                                        <TableHead>
                                                            <TableRow sx={{ backgroundColor: '#f7f7f7' }}>
                                                                <TableCell sx={{ pl: { xs: 1, sm: 2, md: 2 }, verticalAlign: 'center', py: 1 }} align={"center"}>สัญลักษณ์</TableCell>
                                                                <TableCell sx={{ pl: { xs: 1, sm: 2, md: 2 }, verticalAlign: 'center', py: 1 }} align={"center"}>ความหมาย</TableCell>
                                                                <TableCell sx={{ pl: { xs: 1, sm: 2, md: 2 }, verticalAlign: 'center', py: 1 }} align={"center"}>สัมประสิทธ์</TableCell>
                                                                <TableCell sx={{ pl: { xs: 1, sm: 2, md: 2 }, verticalAlign: 'center', py: 1 }} align={"center"}>ค่าเบี่ยงเบน</TableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            <TableRow>
                                                                <TableCell sx={{ pl: { xs: 1, sm: 2, md: 2 }, verticalAlign: 'center', py: 1 }} align={"center"}><img src={"/images/beta0.png"} width={'60%'} className="image" /></TableCell>
                                                                <TableCell sx={{ pl: { xs: 1, sm: 2, md: 2 }, verticalAlign: 'center', py: 1 }} align={"center"}>สัมประสิทธ์คงที่</TableCell>
                                                                <TableCell sx={{ pl: { xs: 1, sm: 2, md: 2 }, verticalAlign: 'center', py: 1 }} align={"center"}>
                                                                    <TextField
                                                                        type="number"
                                                                        fullWidth
                                                                        value={valueB0}
                                                                        inputProps={{ min: 0, style: { textAlign: 'center' } }}
                                                                        sx={{ py: '3px' }}
                                                                        variant="outlined"
                                                                        onChange={(e) => {
                                                                            let val = e.target.value
                                                                            if (val) {
                                                                                let newValue = parseFloat(val.replace(/,/g, ""))
                                                                                let lnY = governEq(meterLnValueX1, meterLnValueX2, meterLnValueX3, meterLnValueX4, meterLnValueX5, meterLnValueX6, newValue, valueB1, valueB2, valueB3, valueB4, valueB5, valueB6, valueB7, valueD)
                                                                                if (!isNaN(lnY)) {
                                                                                    setValueB0(newValue)
                                                                                    if (lnY) {
                                                                                        let theLnY = Math.exp(lnY)
                                                                                        setMeterValue(theLnY.toFixed(4))
                                                                                        setMeterLnValue(lnY)
                                                                                    }
                                                                                } else {
                                                                                    Swal.fire({
                                                                                        title: '',
                                                                                        text: 'ไม่สามารถคำนวณค่าได้',
                                                                                        icon: 'error',
                                                                                        // showCancelButton: true,
                                                                                        // cancelButtonText: 'ยกเลิก',
                                                                                        confirmButtonColor: '#3085d6',
                                                                                        // cancelButtonColor: '#d33',
                                                                                        confirmButtonText: 'ตกลง'
                                                                                    }).then(async (result) => {
                                                                                        if (result.isConfirmed) {
                                                                                        } else if (result.dismiss === Swal.DismissReason.cancel) {
                                                                                        }
                                                                                    })
                                                                                }
                                                                            }
                                                                        }}
                                                                    />
                                                                </TableCell>
                                                                <TableCell sx={{ pl: { xs: 1, sm: 2, md: 2 }, verticalAlign: 'center', py: 1 }} align={"center"}>4.4245</TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell sx={{ pl: { xs: 1, sm: 2, md: 2 }, verticalAlign: 'center', py: 1 }} align={"center"}><img src={"/images/beta7.png"} width={'60%'} className="image" /></TableCell>
                                                                <TableCell sx={{ pl: { xs: 1, sm: 2, md: 2 }, verticalAlign: 'center', py: 1 }} align={"center"}>ค่าสัมประสิทธ์ตัวแปรหุ่น</TableCell>
                                                                <TableCell sx={{ pl: { xs: 1, sm: 2, md: 2 }, verticalAlign: 'center', py: 1 }} align={"center"}>
                                                                    <TextField
                                                                        type="number"
                                                                        fullWidth
                                                                        value={valueB7}
                                                                        inputProps={{ min: 0, style: { textAlign: 'center' } }}
                                                                        sx={{ py: '3px' }}
                                                                        variant="outlined"
                                                                        onChange={(e) => {
                                                                            let val = e.target.value
                                                                            if (val) {
                                                                                let newValue = parseFloat(val.replace(/,/g, ""))
                                                                                let lnY = governEq(meterLnValueX1, meterLnValueX2, meterLnValueX3, meterLnValueX4, meterLnValueX5, meterLnValueX6, valueB0, valueB1, valueB2, valueB3, valueB4, valueB5, valueB6, newValue, valueD)
                                                                                if (!isNaN(lnY)) {
                                                                                    setValueB7(newValue)
                                                                                    if (lnY) {
                                                                                        let theLnY = Math.exp(lnY)
                                                                                        setMeterValue(theLnY.toFixed(4))
                                                                                        setMeterLnValue(lnY)
                                                                                    }
                                                                                } else {
                                                                                    Swal.fire({
                                                                                        title: '',
                                                                                        text: 'ไม่สามารถคำนวณค่าได้',
                                                                                        icon: 'error',
                                                                                        // showCancelButton: true,
                                                                                        // cancelButtonText: 'ยกเลิก',
                                                                                        confirmButtonColor: '#3085d6',
                                                                                        // cancelButtonColor: '#d33',
                                                                                        confirmButtonText: 'ตกลง'
                                                                                    }).then(async (result) => {
                                                                                        if (result.isConfirmed) {
                                                                                        } else if (result.dismiss === Swal.DismissReason.cancel) {
                                                                                        }
                                                                                    })
                                                                                }
                                                                            }
                                                                        }}
                                                                    />
                                                                </TableCell>
                                                                <TableCell sx={{ pl: { xs: 1, sm: 2, md: 2 }, verticalAlign: 'center', py: 1 }} align={"center"}>0.0979</TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell sx={{ pl: { xs: 1, sm: 2, md: 2 }, verticalAlign: 'center', py: 1 }} align={"center"}><img src={"/images/deta.png"} width={'45%'} className="image" /></TableCell>
                                                                <TableCell sx={{ pl: { xs: 1, sm: 2, md: 2 }, verticalAlign: 'center', py: 1 }} align={"center"}>ตัวแปรหุ่น ซึ่ง D1 = 1 ถ้าเป็นจังหวัดชายแดน</TableCell>
                                                                <TableCell sx={{ pl: { xs: 1, sm: 2, md: 2 }, verticalAlign: 'center', py: 1 }} align={"center"}>
                                                                    <TextField
                                                                        type="number"
                                                                        fullWidth
                                                                        value={valueD}
                                                                        inputProps={{ min: 0, style: { textAlign: 'center' } }}
                                                                        sx={{ py: '3px' }}
                                                                        variant="outlined"
                                                                        onChange={(e) => {
                                                                            let val = e.target.value
                                                                            if (val) {
                                                                                let newValue = parseFloat(val.replace(/,/g, ""))
                                                                                let lnY = governEq(meterLnValueX1, meterLnValueX2, meterLnValueX3, meterLnValueX4, meterLnValueX5, meterLnValueX6, valueB0, valueB1, valueB2, valueB3, valueB4, valueB5, valueB6, valueB7, newValue)
                                                                                if (!isNaN(lnY)) {
                                                                                    setValueD(newValue)
                                                                                    if (lnY) {
                                                                                        let theLnY = Math.exp(lnY)
                                                                                        setMeterValue(theLnY.toFixed(4))
                                                                                        setMeterLnValue(lnY)
                                                                                    }
                                                                                } else {
                                                                                    Swal.fire({
                                                                                        title: '',
                                                                                        text: 'ไม่สามารถคำนวณค่าได้',
                                                                                        icon: 'error',
                                                                                        // showCancelButton: true,
                                                                                        // cancelButtonText: 'ยกเลิก',
                                                                                        confirmButtonColor: '#3085d6',
                                                                                        // cancelButtonColor: '#d33',
                                                                                        confirmButtonText: 'ตกลง'
                                                                                    }).then(async (result) => {
                                                                                        if (result.isConfirmed) {
                                                                                        } else if (result.dismiss === Swal.DismissReason.cancel) {
                                                                                        }
                                                                                    })
                                                                                }
                                                                            }
                                                                        }}
                                                                    />
                                                                </TableCell>
                                                                <TableCell sx={{ pl: { xs: 1, sm: 2, md: 2 }, verticalAlign: 'center', py: 1 }} align={"center"}>0.1063</TableCell>
                                                            </TableRow>
                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>
                                            </Paper>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Dialog>
                        </>
                }
            </ThemeProvider>
        </React.Fragment>
    );
}