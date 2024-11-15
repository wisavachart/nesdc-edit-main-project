import React, { Component, useContext, useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Header from "./Header";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import Footer from "./Footer";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { AppBar, Checkbox, RadioGroup } from "@mui/material";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import Chip from "@mui/material/Chip";
import { Controller, useForm, useWatch } from "react-hook-form";
import axios from "axios";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import PageLoading from "../../component/pageLoading";
import CircularProgress from "@mui/material/CircularProgress";
import DoneIcon from "@mui/icons-material/Done";
import ErrorIcon from "@mui/icons-material/Error";
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
import ReplyIcon from "@mui/icons-material/Reply";
import Autocomplete from "@mui/material/Autocomplete";
import CurriculumApi from "../../api/CurriculumApi";
import FacultyApi from "../../api/FacultyApi";
import ProvincesComponent from "./ProvincesComponent";
import AddressInput from "./ProvincesComponent";
import Swal from "sweetalert2";
import PositionComponent from "./PositionComponent";
import KuPovertyRatioApi from "../../api/KuPovertyRatioApi";
import Backdrop from "@mui/material/Backdrop";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import logo from "/public/images/LogoThaiSmaller.png";
import { NumericFormat } from "react-number-format";
import Link from "@mui/material/Link";

import {
  IgrRadialGaugeModule,
  IgrRadialGauge,
  IgrRadialGaugeRange,
} from "igniteui-react-gauges";
import Chart, {
  CommonSeriesSettings,
  Series,
  ValueAxis,
  Export,
  Legend,
  Tooltip,
  Title,
  Format,
} from "devextreme-react/chart";
IgrRadialGaugeModule.register();

import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Paper from "@mui/material/Paper";

import { ResponsiveChartContainer } from "@mui/x-charts/ResponsiveChartContainer";
import { LinePlot } from "@mui/x-charts/LineChart";
import { BarPlot } from "@mui/x-charts/BarChart";
import { ChartsXAxis } from "@mui/x-charts/ChartsXAxis";
import { ChartsYAxis } from "@mui/x-charts/ChartsYAxis";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import { BarChart } from "@mui/x-charts/BarChart";
import { LineChart } from "@mui/x-charts/LineChart";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: "Kanit",
      textTransform: "none",
      // fontSize: 16,
    },
  },
});

export default function StaticDataComponent() {
  const [loading, setLoading] = useState(true);
  const [menu, setMenu] = useState(null);
  const pathname = location.pathname;
  const openMenu = Boolean(menu);
  const [graph1, setGraph1] = useState([
    {
      dataset: [
        {
          data: [0],
          label: "",
          id: "uDataId",
        },
      ],
      label: [],
      graphNo: null,
      developFactor: null,
    },
  ]);
  const [graph2, setGraph2] = useState([
    {
      dataset: [
        {
          data: [0],
          label: "mo",
          id: "uDataId",
        },
      ],
      label: ["9999"],
      graphNo: null,
      developFactor: null,
    },
  ]);
  const [graph3, setGraph3] = useState([
    {
      dataset: [
        {
          data: [0],
          label: "",
          id: "uDataId",
        },
      ],
      label: [],
      graphNo: null,
      developFactor: null,
    },
  ]);
  const [graph4, setGraph4] = useState([
    {
      dataset: [
        {
          data: [0],
          label: "",
          id: "uDataId",
        },
      ],
      label: [],
      graphNo: null,
      developFactor: null,
    },
  ]);

  const fetchData = async () => {
    setLoading(true);

    let data1 = {
      provinceId: null,
      graphNo: 1,
      developFactor: "population",
    };

    let dataList1 = await KuPovertyRatioApi.getDataGraph(data1);
    console.log("นี่คือ Data ที่ 1");
    console.log(dataList1.data);

    if (typeof dataList1.data.dataset !== "undefined") {
      setGraph1((graph1) => ({
        ...graph1,
        ...{
          dataset: dataList1.data.dataset,
          label: dataList1.data.label,
          graphNo: dataList1.data.graphNo,
          developFactor: dataList1.data.developFactor,
        },
      }));
    }

    let data2 = {
      provinceId: null,
      graphNo: 1,
      developFactor: "houses",
    };

    let dataList2 = await KuPovertyRatioApi.getDataGraph(data2);
    ////console.log(dataList2.data)
    setGraph2((graph2) => ({
      ...graph2,
      ...{
        dataset: dataList2.data.dataset,
        label: dataList2.data.label,
        graphNo: dataList2.data.graphNo,
        developFactor: dataList2.data.developFactor,
      },
    }));

    let data3 = {
      provinceId: null,
      graphNo: 2,
      developFactor: "poorPeople",
    };

    let dataList3 = await KuPovertyRatioApi.getDataGraph(data3);
    //console.log(dataList3.data)

    setGraph3((graph3) => ({
      ...graph3,
      ...{
        dataset: dataList3.data.dataset,
        label: dataList3.data.label,
        graphNo: dataList3.data.graphNo,
        developFactor: dataList3.data.developFactor,
      },
    }));

    let data4 = {
      provinceId: null,
      graphNo: 2,
      developFactor: "gpp",
    };

    let dataList4 = await KuPovertyRatioApi.getDataGraph(data4);
    //console.log(dataList4.data)

    setGraph4((graph4) => ({
      ...graph4,
      ...{
        dataset: dataList4.data.dataset,
        label: dataList4.data.label,
        graphNo: dataList4.data.graphNo,
        developFactor: dataList4.data.developFactor,
      },
    }));

    setLoading(false);
  };

  useEffect(() => {
    ////console.log(pathname);
    fetchData().catch(console.error);
    console.log("fet la na");
  }, []);

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        {loading ? (
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loading}>
            <CircularProgress color="inherit" />
          </Backdrop>
        ) : (
          <>
            {pathname === "/static-data" ? (
              <>
                <AppBar
                  position="static"
                  sx={{
                    backgroundColor: "rgba(250,207,101,0.58)",
                    mb: "10px",
                    mt: 0,
                    width: "100%",
                    pr: "0px !important",
                    pl: "0px !important",
                  }}
                  elevation={1}>
                  <Toolbar
                    sx={{
                      width: "100%",
                      pr: "0px !important",
                      pl: "0px !important",
                    }}>
                    <Link href="/" sx={{ display: "contents" }}>
                      <Grid
                        sx={{
                          width: {
                            xs: "50px",
                            sm: "50px",
                            md: "100px",
                            lg: "100px",
                          },
                        }}>
                        <img
                          src={logo}
                          width={"100px"}
                          className="image"
                          style={{
                            width: "100%",
                            maxWidth: "100px",
                            height: "auto",
                          }}
                        />
                      </Grid>
                      <Typography
                        variant="h5"
                        component="div"
                        sx={{
                          flexGrow: { xs: 0.9, sm: 0.9, md: 0.5, lg: 0.9 },
                          color: "#011E56",
                          fontSize: {
                            xs: "14px",
                            sm: "16px",
                            md: "18px",
                            lg: "18px",
                          },
                        }}>
                        ระบบฐานข้อมูลเพื่อการเตือนภัยความยากจนบริเวณจังหวัดชายแดน
                      </Typography>
                    </Link>
                    <Box
                      variant="h5"
                      sx={{
                        justifyContent: "flex-end",
                        color: "#011E56",
                        display: { xs: "none", md: "block" },
                      }}>
                      <Link
                        href="/"
                        color="inherit"
                        sx={{
                          pl: "5px",
                          fontSize: {
                            xs: "12px",
                            sm: "12px",
                            md: "12px",
                            lg: "20px",
                          },
                          fontFamily: "Kanit",
                        }}>
                        Dashboard
                      </Link>
                      <Link
                        href="/static-data"
                        color="inherit"
                        sx={{
                          pl: "5px",
                          fontSize: {
                            xs: "12px",
                            sm: "12px",
                            md: "12px",
                            lg: "20px",
                          },
                          fontFamily: "Kanit",
                        }}>
                        ข้อมูลสถิติ
                      </Link>
                      <Link
                        href="/developing-index"
                        color="inherit"
                        sx={{
                          pl: "5px",
                          fontSize: {
                            xs: "12px",
                            sm: "12px",
                            md: "12px",
                            lg: "20px",
                          },
                          fontFamily: "Kanit",
                        }}>
                        ตัวชี้วัดการพัฒนา
                      </Link>
                      <Link
                        href="/analytic-data"
                        color="inherit"
                        sx={{
                          pl: "5px",
                          fontSize: {
                            xs: "12px",
                            sm: "12px",
                            md: "12px",
                            lg: "20px",
                          },
                          fontFamily: "Kanit",
                        }}>
                        ข้อมูลการวิเคราะห์
                      </Link>
                    </Box>
                    <IconButton
                      onClick={(e) => {
                        setMenu(e.currentTarget);
                      }}
                      sx={{ display: { xs: "block", md: "none" } }}>
                      <MoreVertRoundedIcon />
                    </IconButton>
                  </Toolbar>
                </AppBar>
              </>
            ) : (
              <></>
            )}
            <Box
              sx={{
                px: "10px",
                pt: "0px",
                overflow: "auto",
                backgroundColor: "#ffffff",
              }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <Typography variant="h5">ข้อมูลสถิติ</Typography>
                  <Grid
                    container
                    direction="row"
                    spacing={2}
                    sx={{ mt: "30px" }}>
                    <Grid
                      container
                      direction="row"
                      justifyContent="center"
                      justifyItems="center"
                      alignContent="center"
                      alignItems="center"
                      spacing={2}
                      sx={{ mt: "30px", ml: "10px" }}>
                      <Grid
                        item
                        alignContent="center"
                        alignItems="center"
                        xs={12}
                        sm={12}
                        md={6}
                        lg={6}>
                        <Typography variant="h6">จำนวนประชากร</Typography>
                        <LineChart
                          height={300}
                          series={graph1.dataset}
                          xAxis={[{ scaleType: "point", data: graph1.label }]}
                          sx={{
                            ".MuiLineElement-root, .MuiMarkElement-root": {
                              strokeWidth: 1,
                            },
                            ".MuiMarkElement-root:not(.MuiMarkElement-highlighted)":
                              {
                                fill: "#fff",
                              },
                            "& .MuiMarkElement-highlighted": {
                              stroke: "none",
                            },
                          }}
                          margin={{ top: 50, bottom: 50, left: 100, right: 50 }}
                        />
                        <Typography
                          variant="subtitle"
                          sx={{
                            mb: "30px",
                            display: "block",
                            color: "grey",
                            fontSize: "small",
                          }}>
                          ที่มา: สำนักบริหารการทะเบียน กรมการปกครอง, 2566
                          {/*<Link target={"_blank"} sx={{pl: "5px !important"}} href={"https://stat.bora.dopa.go.th/new_stat/webPage/statByYear.php"}>https://stat.bora.dopa.go.th/new_stat/webPage/statByYear.php</Link>*/}
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        alignContent="center"
                        alignItems="center"
                        xs={12}
                        sm={12}
                        md={6}
                        lg={6}>
                        <Typography variant="h6">จำนวนบ้านเรือน</Typography>
                        <LineChart
                          height={300}
                          series={graph2.dataset}
                          xAxis={[{ scaleType: "point", data: graph2.label }]}
                          sx={{
                            ".MuiLineElement-root, .MuiMarkElement-root": {
                              strokeWidth: 1,
                            },
                            ".MuiMarkElement-root:not(.MuiMarkElement-highlighted)":
                              {
                                fill: "#fff",
                              },
                            "& .MuiMarkElement-highlighted": {
                              stroke: "none",
                            },
                          }}
                          margin={{ top: 50, bottom: 50, left: 100, right: 50 }}
                        />
                        <Typography
                          variant="subtitle"
                          sx={{
                            mb: "30px",
                            display: "block",
                            color: "grey",
                            fontSize: "small",
                          }}>
                          ที่มา: สำนักบริหารการทะเบียน กรมการปกครอง, 2566
                          {/*<Link target={"_blank"} sx={{pl: "5px !important"}} href={"https://stat.bora.dopa.go.th/new_stat/webPage/statByYear.php"}>https://stat.bora.dopa.go.th/new_stat/webPage/statByYear.php</Link>*/}
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        alignContent="center"
                        alignItems="center"
                        xs={12}
                        sm={12}
                        md={6}
                        lg={6}>
                        <Typography variant="h6">จำนวนคนจน</Typography>
                        <LineChart
                          height={300}
                          series={graph3.dataset}
                          xAxis={[{ scaleType: "point", data: graph3.label }]}
                          sx={{
                            ".MuiLineElement-root, .MuiMarkElement-root": {
                              strokeWidth: 1,
                            },
                            ".MuiMarkElement-root:not(.MuiMarkElement-highlighted)":
                              {
                                fill: "#fff",
                              },
                            "& .MuiMarkElement-highlighted": {
                              stroke: "none",
                            },
                          }}
                          margin={{ top: 50, bottom: 50, left: 100, right: 50 }}
                        />
                        <Typography
                          variant="subtitle"
                          sx={{
                            mb: "30px",
                            display: "block",
                            color: "grey",
                            fontSize: "small",
                          }}>
                          ที่มา: สำนักงานสภาพัฒนาการเศรษฐกิจและสังคมแห่งชาติ,
                          2566
                          {/*    <Link   onClick={() => {*/}
                          {/*    console.info("I'm a button.");*/}
                          {/*}} sx={{pl: "5px !important"}}>???</Link>*/}
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        alignContent="center"
                        alignItems="center"
                        xs={12}
                        sm={12}
                        md={6}
                        lg={6}>
                        <Typography variant="h6">
                          ผลิตภัณฑ์มวลรวม (GPP) การค้าชายแดน
                        </Typography>
                        <LineChart
                          height={300}
                          series={graph4.dataset}
                          xAxis={[{ scaleType: "point", data: graph4.label }]}
                          sx={{
                            ".MuiLineElement-root, .MuiMarkElement-root": {
                              strokeWidth: 1,
                            },
                            ".MuiMarkElement-root:not(.MuiMarkElement-highlighted)":
                              {
                                fill: "#fff",
                              },
                            "& .MuiMarkElement-highlighted": {
                              stroke: "none",
                            },
                          }}
                          margin={{ top: 50, bottom: 50, left: 100, right: 50 }}
                        />
                        <Typography
                          variant="subtitle"
                          sx={{
                            mb: "30px",
                            display: "block",
                            color: "grey",
                            fontSize: "small",
                          }}>
                          ที่มา: สำนักงานสภาพัฒนาการเศรษฐกิจและสังคมแห่งชาติ,
                          2566
                          {/*<Link target={"_blank"} sx={{pl: "5px !important"}} href={"https://datastudio.google.com/u/0/reporting/704fe6c7-aecb-4362-9062-3dc971c75982/page/p_woqsppkotc"}>https://datastudio.google.com/u/0/reporting/704fe6c7-aecb-4362-9062-3dc971c75982/page/p_woqsppkotc</Link>*/}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
            <Menu
              anchorEl={menu}
              id="account-menu"
              open={openMenu}
              onClose={() => {
                setMenu(null);
              }}
              onClick={() => {
                setMenu(null);
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}>
              <MenuItem
                onClick={() => {
                  window.location.pathname = "/";
                }}>
                Dashboard
              </MenuItem>
              <MenuItem
                onClick={() => {
                  window.location.pathname = "/static-data";
                }}>
                ข้อมูลสถิติ
              </MenuItem>
              <MenuItem
                onClick={() => {
                  window.location.pathname = "/developing-index";
                }}>
                ตัวชี้วัดการพัฒนา
              </MenuItem>
              <MenuItem
                onClick={() => {
                  window.location.pathname = "/analytic-data";
                }}>
                ข้อมูลการวิเคราะห์
              </MenuItem>
            </Menu>
          </>
        )}
      </ThemeProvider>
    </React.Fragment>
  );
}
