import React, { Component, useState, useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { render } from "react-dom";

import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import MenuIcon from "@mui/icons-material/Menu";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Logout from "@mui/icons-material/Logout";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import logo from "/public/images/logo-sapa.jpg";
import MainListItems from "./react/page/template/listItems";
import "./css/app.css";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";

import Login from "../assets/react/login";

import PageLoading from "./pageLoading";
import SurveyComponent from "./react/page/Survey/SurveyComponent";
import PovertyRatio from "./react/page/master-data/PovertyRatio";
import Coefficient from "./react/page/master-data/Coefficient";
import User from "./react/page/master-data/User";
import Population from "./react/page/master-data/Population";
import Houses from "./react/page/master-data/Houses";

import StaticDataComponent from "./react/page/Survey/StaticDataComponent";
import AnalyticDataComponent from "./react/page/Survey/AnalyticDataComponent";
import DevelopingIndexComponent from "./react/page/Survey/DevelopingIndexComponent";
import PoorPeople from "./react/page/master-data/PoorPeople";
import Environment from "./react/page/master-data/Environment";
import HumanDevelopment from "./react/page/master-data/HumanDevelopment";
import Economic from "./react/page/master-data/Economic";
import Peace from "./react/page/master-data/Peace";
import Partnership from "./react/page/master-data/Partnership";
import Stability from "./react/page/master-data/Stability";
import Escape from "./react/page/master-data/Escape";

const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: "Kanit",
      textTransform: "none",
      fontSize: 16,
    },
  },
});

const rootElement = document.getElementById("react-app");
const root = createRoot(rootElement);
root.render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </StrictMode>
);

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
      style={{ textAlign: "right" }}>
      {"ระบบฐานข้อมูลเพื่อการเตือนภัยความยากจนบริเวณจังหวัดชายแดน © 2024"}
    </Typography>
  );
}

const drawerWidth = 260;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

// const mdTheme = createTheme();
export const AuthContext = React.createContext();

function App() {
  const [open, setOpen] = useState(true);
  const [menu, setMenu] = useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [auth, setAuth] = useState(() => {
    const saved = localStorage.getItem("token");
    const initialValue = JSON.parse(saved);
    return initialValue || null;
  });
  const [identity, setIdentity] = useState(() => {
    const saved = localStorage.getItem("identity");
    const initialValue = JSON.parse(saved);
    return initialValue || null;
  });

  const [yearReport, setYearReport] = useState(
    (parseInt(new Date().getFullYear()) + 543).toString()
  );
  const [curriculumReport, setCurriculumReport] = useState(() => {
    if (identity && identity.roles && identity.roles[0] === "ROLE_USER") {
      console.log(identity);
      return {
        id: identity.curriculumId,
        faculty: null,
        value: identity.curriculumName,
        option: [],
      };
    } else {
      const saved = localStorage.getItem("selectCurriculum");
      const initialValue = JSON.parse(saved);
      return (
        initialValue || {
          id: null,
          curriculum: null,
          value: "",
          option: [],
        }
      );
    }
  });
  const [facultyReport, setFacultyReport] = useState(() => {
    if (identity && identity.roles && identity.roles[0] === "ROLE_USER") {
      console.log(identity);
      return {
        id: identity.facultyId,
        faculty: null,
        value: identity.facultyName,
        option: [],
      };
    } else {
      const saved = localStorage.getItem("selectFaculty");
      const initialValue = JSON.parse(saved);
      return (
        initialValue || {
          id: null,
          faculty: null,
          value: "",
          option: [],
        }
      );
    }
  });

  const isAdminCheck =
    identity && identity.roles && identity.roles[0] === "ROLE_ADMIN";

  const [questionNairId, setQuestionNairId] = useState("");

  const [tmp, setTmp] = useState(1);
  const isHrCheck =
    identity && identity.roles && identity.roles[0] === "ROLE_HR";
  const isRegisterCheck =
    identity && identity.roles && identity.roles[0] === "ROLE_Register";

  const openMenu = Boolean(menu);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  useEffect(() => {
    document.title = "ผู้ดูแลระบบฐานข้อมูลเพื่อการเตือนภัยความยากจน";
    if (questionNairId > 0) {
      console.log("hello world");
    }
    let session = sessionStorage.getItem("register");
    if (session == null) {
      localStorage.setItem("token", null);
      localStorage.setItem("identity", null);
      location.reload();
    }
    sessionStorage.setItem("register", 1);
  }, []);

  if (auth === null || identity === null) {
    return (
      <>
        <AuthContext.Provider
          value={{
            auth,
            setAuth,
            identity,
            setIdentity,
            isLoading,
            setIsLoading,
          }}>
          <Login />
        </AuthContext.Provider>
      </>
    );
  }

  return (
    <>
      <AuthContext.Provider
        value={{
          open,
          setOpen,
          auth,
          setAuth,
          identity,
          setIdentity,
          isLoading,
          setIsLoading,
          yearReport,
          setYearReport,
          curriculumReport,
          setCurriculumReport,
          facultyReport,
          setFacultyReport,
          tmp,
          setTmp,
          questionNairId,
          setQuestionNairId,
        }}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <Box sx={{ display: "flex" }}>
              <CssBaseline />
              <AppBar
                position="absolute"
                open={isHrCheck || isRegisterCheck ? false : open}
                sx={{ backgroundColor: "#BFCA17" }}>
                <Toolbar sx={{ pr: "24px" }}>
                  <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={toggleDrawer}
                    sx={{
                      color: "black",
                      marginRight: "36px",
                      ...(open && { display: "none" }),
                    }}>
                    <MenuIcon />
                  </IconButton>
                  <Typography
                    variant="h6"
                    color="black"
                    noWrap
                    sx={{ fontSize: "20px" }}>
                    ระบบฐานข้อมูลเพื่อการเตือนภัยความยากจนบริเวณจังหวัดชายแดน
                  </Typography>
                  <Box sx={{ flexGrow: 1 }} />
                  <Typography color="black" noWrap>
                    {identity.username}
                  </Typography>
                  <IconButton
                    onClick={(e) => {
                      setMenu(e.currentTarget);
                    }}
                    color="inherit">
                    <PowerSettingsNewIcon sx={{ color: "black" }} />
                  </IconButton>
                </Toolbar>
              </AppBar>

              <Drawer
                variant="permanent"
                open={isHrCheck || isRegisterCheck ? false : open}>
                <Toolbar
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "#01696A",
                    px: [1],
                  }}>
                  <img src={logo} width={"200px"} className="image" />
                  <Grid justifyContent="flex-end" container>
                    <IconButton onClick={toggleDrawer}>
                      <ChevronLeftIcon sx={{ color: "white" }} />
                    </IconButton>
                  </Grid>
                </Toolbar>
                {/*<Divider sx={{ backgroundColor:'#BFCA17', }}/>*/}
                {/*<List component="nav" sx={{backgroundColor:'#01696A', height:'100%', p:0}}>*/}
                <MainListItems />
                {/*<Divider sx={{ my: 1, backgroundColor:'#BFCA17', }} />*/}
                {/*{secondaryListItems}*/}
                {/*</List>*/}
              </Drawer>

              <Box
                component="main"
                sx={{
                  backgroundColor: (theme) =>
                    theme.palette.mode === "light"
                      ? theme.palette.grey[100]
                      : theme.palette.grey[900],
                  flexGrow: 1,
                  height: "100vh",
                  overflow: "auto",
                }}>
                <Paper sx={{ px: 1, py: 2 }}>
                  <Toolbar />
                  <Routes>
                    {/* check hr and register */}

                    <Route exact path="/page" element={<SurveyComponent />} />
                    <Route
                      path="/page/dashboard/"
                      element={<SurveyComponent />}
                    />
                    <Route
                      path="/page/static-data/"
                      element={<StaticDataComponent />}
                    />
                    <Route
                      path="/page/developing-index/"
                      element={<DevelopingIndexComponent />}
                    />
                    <Route
                      path="/page/analytic-data/"
                      element={<AnalyticDataComponent />}
                    />
                    <Route
                      path="/page/poverty-ratio/"
                      element={<PovertyRatio />}
                    />
                    <Route
                      path="/page/coefficient/"
                      element={<Coefficient />}
                    />
                    <Route path="/page/population/" element={<Population />} />
                    <Route path="/page/houses/" element={<Houses />} />
                    <Route path="/page/poor-people/" element={<PoorPeople />} />
                    <Route
                      path="/page/human-development/"
                      element={<HumanDevelopment />}
                    />
                    <Route path="/page/economic/" element={<Economic />} />
                    <Route
                      path="/page/environment/"
                      element={<Environment />}
                    />
                    <Route path="/page/peace/" element={<Peace />} />
                    <Route
                      path="/page/partnership/"
                      element={<Partnership />}
                    />
                    <Route path="/page/stability/" element={<Stability />} />
                    <Route path="/page/escape/" element={<Escape />} />
                    <Route path="/page/user/" element={<User />} />
                  </Routes>
                  <Copyright sx={{ pt: 4 }} />
                </Paper>
              </Box>
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
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}>
              {/*<MenuItem>*/}
              {/*    <ListItemIcon>*/}
              {/*        <PersonOutlineIcon fontSize="small"/>*/}
              {/*    </ListItemIcon>*/}
              {/*    My account*/}
              {/*</MenuItem>*/}
              {/*<MenuItem>*/}
              {/*    <Avatar /> My account*/}
              {/*</MenuItem>*/}
              {/*<Divider />*/}
              {/*<MenuItem>*/}
              {/*    <ListItemIcon>*/}
              {/*        <PersonAdd fontSize="small" />*/}
              {/*    </ListItemIcon>*/}
              {/*    Add another account*/}
              {/*</MenuItem>*/}
              {/*<MenuItem>*/}
              {/*    <ListItemIcon>*/}
              {/*        <Settings fontSize="small" />*/}
              {/*    </ListItemIcon>*/}
              {/*    Settings*/}
              {/*</MenuItem>*/}
              <MenuItem
                onClick={() => {
                  localStorage.setItem("token", JSON.stringify(null));
                  localStorage.setItem("identity", JSON.stringify(null));
                  setAuth(null);
                  window.location.reload();
                }}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
            <PageLoading isLoading={isLoading} />
          </ThemeProvider>
        </BrowserRouter>
      </AuthContext.Provider>
    </>
  );
}
