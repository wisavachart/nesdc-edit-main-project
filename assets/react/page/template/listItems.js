import React, {Component, useState, useEffect, useRef, useContext} from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from "@mui/material/Collapse";
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import AssignmentIcon from '@mui/icons-material/Assignment';
import FileOpenOutlinedIcon from '@mui/icons-material/FileOpenOutlined';
import ContactPageOutlinedIcon from '@mui/icons-material/ContactPageOutlined';
import BookmarkAddedOutlinedIcon from '@mui/icons-material/BookmarkAddedOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import FolderSharedOutlinedIcon from '@mui/icons-material/FolderSharedOutlined';
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import Grid from "@mui/material/Grid";
import OutputIcon from '@mui/icons-material/Output';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import HouseIcon from '@mui/icons-material/House';

import {AuthContext} from "/assets/react-app";
import {ThemeProvider, createTheme} from '@mui/material/styles';

const theme = createTheme({
    typography: {
        allVariants: {
            fontFamily: 'Kanit',
            // textTransform: 'none',
        },
    },
});


const styles = {
    black: {},
    subIcon: {
        color: '#01696A',
    },
    list: {
        backgroundColor: '#BFCA17',
        // width:'400px'

    },
    icon: {
        color: 'white'
    },
};

export default function MainListItems() {
    const {open, setOpen, identity} = useContext(AuthContext);
    // const [, set] = useState(false);

    const [questionnaire, setQuestionnaire] = useState(location.pathname.includes('questionnaire'));
    const [registrationAndHr, setRegistrationAndHr] = useState(location.pathname === '/page/hr-page/' || location.pathname === '/page/registration-page/' );
    const [indicator, setIndicator] = useState(location.pathname === '/page/setIndicators' ||
        location.pathname === '/page/indicators' || location.pathname === '/page/dataIndicators'
    );
    const [report, setReport] = useState(location.pathname === '/page/report/survey' ||
        location.pathname === '/page/report/analyze-opinion' ||
        location.pathname === '/page/report/student-have-job' ||
        location.pathname === '/page/report/skill' ||
        location.pathname === '/page/report/student-innovation' ||
        location.pathname === '/page/report/teacher-innovation' ||
        location.pathname === '/page/report/organization' ||
        location.pathname === '/page/report/community-innovation' ||
        location.pathname === '/page/report/public-research' ||
        location.pathname === '/page/report/speaker' ||
        location.pathname === '/page/report/short-training' ||
        location.pathname === '/page/report/institution-measurement' ||
        location.pathname === '/page/report/institution-measurement-analyze'
    );
    const [database, setDatabase] = useState(location.pathname === '/page/faculty' || location.pathname === '/page/user' ||
        location.pathname === '/page/announcement' || location.pathname === '/page/curriculum' || location.pathname === '/page/education-year'|| location.pathname === '/page/questionnaire-type' || location.pathname === '/page/hr-page/' || location.pathname === '/page/registration-page/');

    const handleListItemClick = (link, event) => {
        event.preventDefault()
        if (event.ctrlKey) window.open(`${link}`);
        else window.location.pathname = link;

    };

    // const [initialized, setInitialized] = useState(false);

    // useEffect(() => {
    //     const handleUnload = (event) => {
    //         if (!initialized) {
    //             localStorage.setItem('token', null);
    //             localStorage.setItem('identity', null);
    //             setInitialized(true);
    //         }
    //     };

    //     window.addEventListener('unload', handleUnload);

    //     return () => {
    //         window.removeEventListener('unload', handleUnload);
    //     };

    // }, [initialized]);

    if (identity.roles && (identity.roles[0] === 'ROLE_HR')) {
        if (window.location.pathname !== '/page/hr-page') {
          window.location.href = '/page/hr-page/';
        }
      } else if (identity.roles && (identity.roles[0] === 'ROLE_Register')) {
        if (window.location.pathname !== '/page/registration-page') {
          window.location.href = '/page/registration-page/';
        }
      }
      

    return (
        <React.Fragment>
            <List component="nav" sx={{backgroundColor: '#01696A', height: '100%', p: 0}}>
                {/*<ListItemButton style={styles.list} sx={{pr:'8px',py:'16px'}}>*/}
                {/*    <ListItemIcon style={styles.black}>*/}
                {/*        <FileOpenOutlinedIcon />*/}
                {/*        {open === true ? <Typography>ข้อมูล EdPex</Typography> : <></>}*/}
                {/*    </ListItemIcon>*/}
                {/*</ListItemButton>*/}

                {identity.roles && (identity.roles[0] === 'ROLE_ADMIN' || identity.roles[0] === 'ROLE_USER') ? 
                <>
                <ListItemButton sx={{pr: '8px', py: '16px'}}
                                style={location.pathname === '/page/dashboard' || location.pathname === '/page' ? styles.list : styles.black}
                                onClick={(event) => handleListItemClick('/page/dashboard', event)}>
                    <ListItemIcon
                        style={location.pathname === '/page/dashboard' || location.pathname === '/page' ? styles.black : styles.icon}>
                        <FileOpenOutlinedIcon/>
                        {open === true ? <Typography>Dashboard</Typography> : <></>}
                    </ListItemIcon>
                </ListItemButton>

                {/*<ListItemButton
                    style={styles.black}
                    sx={{pr: '8px', py: '16px'}}
                    onClick={() => {
                        setQuestionnaire(!questionnaire)
                    }}
                >
                    <ListItemIcon style={styles.icon}>
                        <ContactPageOutlinedIcon/>
                        {open === true ? <Typography>แบบสอบถาม</Typography> : <></>}
                    </ListItemIcon>
                    <Grid justifyContent="flex-end" container>
                        {
                            questionnaire === false ? <ExpandMore sx={{color: 'white'}}/> :
                                <ExpandLess sx={{color: 'white'}}/>
                        }
                    </Grid>
                </ListItemButton>
                <Collapse in={questionnaire} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {identity.roles && identity.roles[0] === 'ROLE_ADMIN' ?
                        <ListItemButton sx={{pr: '8px', py: '10px'}}  style={location.pathname.includes('page/questionnaire/questionnaireTemplate') || location.pathname.includes('page/add-questionnaire-template') ? styles.list : styles.black} onClick={(event) => handleListItemClick('/page/questionnaire/questionnaireTemplate', event)}>
                            <ListItemIcon style={location.pathname.includes('page/questionnaire/questionnaireTemplate') || location.pathname.includes('page/add-questionnaire-template') ? styles.black : styles.icon}>
                                style={location.pathname.includes('/page/add-questionnaire-template') ? styles.black : styles.icon}
                                <MoreHorizOutlinedIcon style={open === true ? styles.subIcon : styles.icon}/>
                                {open === true ? <></> : <MoreHorizOutlinedIcon
                                    style={open === true ? styles.subIcon : styles.icon}/>}
                                {open === true ? <Typography sx={{pl: '5px'}}>เทมเพลตแบบสอบถาม</Typography> : <></>}
                            </ListItemIcon>
                        </ListItemButton>:<></>}
                        <ListItemButton sx={{pr: '8px', py: '10px'}} style={location.pathname === '/page/questionnaire/variousQuestionnaires' ? styles.list : styles.black} onClick={(event) => handleListItemClick('/page/questionnaire/variousQuestionnaires', event)}>
                            <ListItemIcon style={location.pathname === '/page/questionnaire/variousQuestionnaires' ? styles.black : styles.icon}>
                                <MoreHorizOutlinedIcon style={open === true ? styles.subIcon : styles.icon}/>
                                {open === true ? <></> : <MoreHorizOutlinedIcon
                                    style={open === true ? styles.subIcon : styles.icon}/>}
                                {open === true ? <Typography sx={{pl: '5px'}}>แบบสอบถามต่าง ๆ</Typography> : <></>}
                            </ListItemIcon>
                        </ListItemButton>
                    </List>
                </Collapse>*/}

                {/* ------------------------- */}

                {/*<ListItemButton
                    style={styles.black}
                    sx={{pr: '8px', py: '16px'}}
                    onClick={() => {
                        setRegistrationAndHr(!registrationAndHr)
                    }}
                >
                    <ListItemIcon style={styles.icon}>
                        <OutputIcon/>
                        {open === true ? <Typography>ข้อมูลจากบุคคล/ทะเบียน</Typography> : <></>}
                    </ListItemIcon>
                    <Grid justifyContent="flex-end" container>
                        {
                            questionnaire === false ? <ExpandMore sx={{color: 'white'}}/> :
                                <ExpandLess sx={{color: 'white'}}/>
                        }
                    </Grid>
                </ListItemButton>
                <Collapse in={registrationAndHr} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>

                                <ListItemButton sx={{pr: '8px', py: '10px'}}
                                                style={location.pathname === '/page/hr-page/' ? styles.list : styles.black}
                                                onClick={(event) => handleListItemClick('/page/hr-page/', event)}>
                                    <ListItemIcon
                                        style={location.pathname === '/page/hr-page/' ? styles.black : styles.icon}>
                                        {open === true ? <></> : <MoreHorizOutlinedIcon
                                            style={open === true ? styles.subIcon : styles.icon}/>}
                                        {open === true ? <Typography>ข้อมูลจากบุคคล</Typography> : <></>}
                                    </ListItemIcon>

                                </ListItemButton>

                                <ListItemButton sx={{pr: '8px', py: '10px'}}
                                                style={location.pathname === '/page/registration-page/' ? styles.list : styles.black}
                                                onClick={(event) => handleListItemClick('/page/registration-page/', event)}>
                                    <ListItemIcon
                                        style={location.pathname === '/page/registration-page/' ? styles.black : styles.icon}>
                                        {open === true ? <></> : <MoreHorizOutlinedIcon
                                            style={open === true ? styles.subIcon : styles.icon}/>}
                                        {open === true ? <Typography>ข้อมูลจากทะเบียน</Typography> : <></>}
                                    </ListItemIcon>

                                </ListItemButton>

                    </List>
                </Collapse>*/}
                </>:<></>}

                {identity.roles && identity.roles[0] === 'ROLE_ADMIN' ?
                <>
                    {/*<ListItemButton
                    style={styles.black}
                    sx={{pr: '8px', py: '16px'}}
                    onClick={() => {
                        setIndicator(!indicator)
                    }}
                    >
                    <ListItemIcon style={styles.icon}>
                        <BookmarkAddedOutlinedIcon/>
                        {open === true ? <Typography>ตัวชี้วัดระดับสถาบัน</Typography> : <></>}
                    </ListItemIcon>
                    <Grid justifyContent="flex-end" container>
                        {
                            indicator === false ? <ExpandMore sx={{color: 'white'}}/> :
                                <ExpandLess sx={{color: 'white'}}/>
                        }
                    </Grid>
                    </ListItemButton>
                    <Collapse in={indicator} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItemButton sx={{pr: '8px', py: '10px'}}
                                        style={location.pathname === '/page/setIndicators' ? styles.list : styles.black}
                                        onClick={(event) => handleListItemClick('/page/setIndicators', event)}
                        >
                            <ListItemIcon
                                style={location.pathname === '/page/setIndicators' ? styles.black : styles.icon}>
                                {open === true ? <></> : <MoreHorizOutlinedIcon
                                    style={open === true ? styles.subIcon : styles.icon}/>}
                                {open === true ?
                                    <Typography >กำหนดตัวชี้วัดและสูตรคำนวณ</Typography> : <></>}
                            </ListItemIcon>
                        </ListItemButton>
                        <ListItemButton sx={{pr: '8px', py: '10px'}}
                                        style={location.pathname === '/page/indicators' || location.pathname === '/page/dataIndicators' ? styles.list : styles.black}
                                        onClick={(event) => handleListItemClick('/page/indicators', event)}
                        >
                            <ListItemIcon
                                style={location.pathname === '/page/indicators' || location.pathname === '/page/dataIndicators' ? styles.black : styles.icon}>
                                {open === true ? <></> : <MoreHorizOutlinedIcon
                                    style={open === true ? styles.subIcon : styles.icon}/>}
                                {open === true ? <Typography>บันทึกข้อมูลตัวชี้วัด</Typography> : <></>}
                            </ListItemIcon>
                        </ListItemButton>

                    </List>
                </Collapse>*/}
                </>:<></>}


                {identity.roles && (identity.roles[0] === 'ROLE_ADMIN' || identity.roles[0] === 'ROLE_USER') ? 
                <>
                {/*<ListItemButton
                    style={styles.black}
                    sx={{pr: '8px', py: '16px'}}
                    onClick={() => {
                        setReport(!report)
                    }}
                >
                    <ListItemIcon style={styles.icon}>
                        <AssignmentOutlinedIcon/>
                        {open === true ? <Typography>รายงาน</Typography> : <></>}
                    </ListItemIcon>
                    <Grid justifyContent="flex-end" container>
                        {
                            report === false ? <ExpandMore sx={{color: 'white'}}/> :
                                <ExpandLess sx={{color: 'white'}}/>
                        }
                    </Grid>
                </ListItemButton>
                <Collapse in={report} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItemButton sx={{pr: '8px', py: '10px'}}
                                        style={location.pathname === '/page/report/survey' ? styles.list : styles.black}
                                        onClick={(event) => handleListItemClick('/page/report/survey', event)}>
                            <ListItemIcon
                                style={location.pathname === '/page/report/survey' ? styles.black : styles.icon}>
                                {open === true ? <></> : <MoreHorizOutlinedIcon
                                    style={open === true ? styles.subIcon : styles.icon}/>}
                                {open === true ? <Typography>การสำรวจความคิดเห็น</Typography> : <></>}
                            </ListItemIcon>
                        </ListItemButton>

                        <ListItemButton sx={{pr: '8px', py: '10px'}}
                                        style={location.pathname === '/page/report/analyze-opinion' ? styles.list : styles.black}
                                        onClick={(event) => handleListItemClick('/page/report/analyze-opinion', event)}>
                            <ListItemIcon
                                style={location.pathname === '/page/report/analyze-opinion' ? styles.black : styles.icon}>
                                {open === true ? <></> : <MoreHorizOutlinedIcon
                                    style={open === true ? styles.subIcon : styles.icon}/>}
                                {open === true ? <Typography>การวิเคราะห์ความคิดเห็น</Typography> : <></>}
                            </ListItemIcon>
                        </ListItemButton>

                        <ListItemButton sx={{pr: '8px', py: '10px'}}
                                        style={location.pathname === '/page/report/student-have-job' ? styles.list : styles.black}
                                        onClick={(event) => handleListItemClick('/page/report/student-have-job', event)}>
                            <ListItemIcon
                                style={location.pathname === '/page/report/student-have-job' ? styles.black : styles.icon}>
                                {open === true ? <></> : <MoreHorizOutlinedIcon
                                    style={open === true ? styles.subIcon : styles.icon}/>}
                                {open === true ? <Typography>ภาวะการมีงานทำของบัณฑิต</Typography> : <></>}
                            </ListItemIcon>
                        </ListItemButton>

                        <ListItemButton sx={{pr: '8px', py: '10px'}}
                                        style={location.pathname === '/page/report/skill' ? styles.list : styles.black}
                                        onClick={(event) => handleListItemClick('/page/report/skill', event)}>
                            <ListItemIcon
                                style={location.pathname === '/page/report/skill' ? styles.black : styles.icon}>
                                {open === true ? <></> : <MoreHorizOutlinedIcon
                                    style={open === true ? styles.subIcon : styles.icon}/>}
                                {open === true ? <Typography>รางวัลทักษะวิชาชีพ</Typography> : <></>}
                            </ListItemIcon>
                        </ListItemButton>

                        <ListItemButton sx={{pr: '8px', py: '10px'}}
                                        style={location.pathname === '/page/report/student-innovation' ? styles.list : styles.black}
                                        onClick={(event) => handleListItemClick('/page/report/student-innovation', event)}>
                            <ListItemIcon
                                style={location.pathname === '/page/report/student-innovation' ? styles.black : styles.icon}>
                                {open === true ? <></> : <MoreHorizOutlinedIcon
                                    style={open === true ? styles.subIcon : styles.icon}/>}
                                {open === true ? <Typography>รางวัลนวัตกรรมของนักเรียน</Typography> : <></>}
                            </ListItemIcon>
                        </ListItemButton>

                        <ListItemButton sx={{pr: '8px', py: '10px'}}
                                        style={location.pathname === '/page/report/teacher-innovation' ? styles.list : styles.black}
                                        onClick={(event) => handleListItemClick('/page/report/teacher-innovation', event)}>
                            <ListItemIcon
                                style={location.pathname === '/page/report/teacher-innovation' ? styles.black : styles.icon}>
                                {open === true ? <></> : <MoreHorizOutlinedIcon
                                    style={open === true ? styles.subIcon : styles.icon}/>}
                                {open === true ? <Typography>รางวัลนวัตกรรมของครู/อาจารย์</Typography> : <></>}
                            </ListItemIcon>
                        </ListItemButton>

                        <ListItemButton sx={{pr: '8px', py: '10px'}}
                                        style={location.pathname === '/page/report/organization' ? styles.list : styles.black}
                                        onClick={(event) => handleListItemClick('/page/report/organization', event)}>
                            <ListItemIcon
                                style={location.pathname === '/page/report/organization' ? styles.black : styles.icon}>
                                {open === true ? <></> : <MoreHorizOutlinedIcon
                                    style={open === true ? styles.subIcon : styles.icon}/>}
                                {open === true ? <Typography>โครงงานร่วมกับสถานประกอบการ</Typography> : <></>}
                            </ListItemIcon>
                        </ListItemButton>

                        <ListItemButton sx={{pr: '8px', py: '10px'}}
                                        style={location.pathname === '/page/report/community-innovation' ? styles.list : styles.black}
                                        onClick={(event) => handleListItemClick('/page/report/community-innovation', event)}>
                            <ListItemIcon
                                style={location.pathname === '/page/report/community-innovation' ? styles.black : styles.icon}>
                                {open === true ? <></> : <MoreHorizOutlinedIcon
                                    style={open === true ? styles.subIcon : styles.icon}/>}
                                {open === true ? <Typography>โครงการวิจัยที่เป็นประโยชน์</Typography> : <></>}
                            </ListItemIcon>
                        </ListItemButton>

                        <ListItemButton sx={{pr: '8px', py: '10px'}}
                                        style={location.pathname === '/page/report/public-research' ? styles.list : styles.black}
                                        onClick={(event) => handleListItemClick('/page/report/public-research', event)}>
                            <ListItemIcon
                                style={location.pathname === '/page/report/public-research' ? styles.black : styles.icon}>
                                {open === true ? <></> : <MoreHorizOutlinedIcon
                                    style={open === true ? styles.subIcon : styles.icon}/>}
                                {open === true ? <Typography>ผลงานวิจัย</Typography> : <></>}
                            </ListItemIcon>
                        </ListItemButton>

                        <ListItemButton sx={{pr: '8px', py: '10px'}}
                                        style={location.pathname === '/page/report/speaker' ? styles.list : styles.black}
                                        onClick={(event) => handleListItemClick('/page/report/speaker', event)}>
                            <ListItemIcon
                                style={location.pathname === '/page/report/speaker' ? styles.black : styles.icon}>
                                {open === true ? <></> : <MoreHorizOutlinedIcon
                                    style={open === true ? styles.subIcon : styles.icon}/>}
                                {open === true ? <Typography>การเป็นวิทยากร</Typography> : <></>}
                            </ListItemIcon>
                        </ListItemButton>

                        <ListItemButton sx={{pr: '8px', py: '10px'}}
                                        style={location.pathname === '/page/report/short-training' ? styles.list : styles.black}
                                        onClick={(event) => handleListItemClick('/page/report/short-training', event)}>
                            <ListItemIcon
                                style={location.pathname === '/page/report/short-training' ? styles.black : styles.icon}>
                                {open === true ? <></> : <MoreHorizOutlinedIcon
                                    style={open === true ? styles.subIcon : styles.icon}/>}
                                {open === true ? <Typography>การอบรมระยะสั้น</Typography> : <></>}
                            </ListItemIcon>
                        </ListItemButton>
                        { identity.roles && identity.roles[0] === 'ROLE_ADMIN' ? (
                            <>
                            <ListItemButton sx={{pr: '8px', py: '10px'}}
                                        style={location.pathname === '/page/report/institution-measurement' ? styles.list : styles.black}
                                        onClick={(event) => handleListItemClick('/page/report/institution-measurement', event)}>
                            <ListItemIcon
                                style={location.pathname === '/page/report/institution-measurement' ? styles.black : styles.icon}>
                                {open === true ? <></> : <MoreHorizOutlinedIcon
                                    style={open === true ? styles.subIcon : styles.icon}/>}
                                {open === true ? <Typography>ตัวชี้วัดระดับสถาบัน</Typography> : <></>}
                            </ListItemIcon>
                            </ListItemButton>

                            <ListItemButton sx={{pr: '8px', py: '10px'}}
                                            style={location.pathname === '/page/report/institution-measurement-analyze' ? styles.list : styles.black}
                                            onClick={(event) => handleListItemClick('/page/report/institution-measurement-analyze', event)}>
                            <ListItemIcon
                                style={location.pathname === '/page/report/institution-measurement-analyze' ? styles.black : styles.icon}>
                                {open === true ? <></> : <MoreHorizOutlinedIcon
                                    style={open === true ? styles.subIcon : styles.icon}/>}
                                {open === true ?
                                    <Typography>การวิเคราะห์ตัวชี้วัดระดับสถาบัน</Typography> : <></>}
                            </ListItemIcon>
                            </ListItemButton>
                            </>
                            ) : (<></>) }
                    </List>
                    </Collapse>*/}
                </>:<></>}

                {identity.roles && identity.roles[0] === 'ROLE_ADMIN' ?
                    <>
                        <ListItemButton
                            sx={{pr: '8px', py: '16px'}}
                            style={location.pathname === '/page/poverty-ratio' ? styles.list : styles.black}
                            onClick={(event) => handleListItemClick('/page/poverty-ratio', event)}
                        >
                            <ListItemIcon
                                style={location.pathname === '/page/poverty-ratio'? styles.black : styles.icon}
                            >
                                <FolderSharedOutlinedIcon/>
                                {open === true ? <Typography>สัดส่วนความยากจนและตัวแปร</Typography> : <></>}
                            </ListItemIcon>
                        </ListItemButton>

                        <ListItemButton
                            sx={{pr: '8px', py: '16px'}}
                            style={location.pathname === '/page/coefficient' ? styles.list : styles.black}
                            onClick={(event) => handleListItemClick('/page/coefficient', event)}
                        >
                            <ListItemIcon
                                style={location.pathname === '/page/coefficient'? styles.black : styles.icon}
                            >
                                <FolderSharedOutlinedIcon/>
                                {open === true ? <Typography>สัมประสิทธิ์</Typography> : <></>}
                            </ListItemIcon>
                        </ListItemButton>

                        <ListItemButton
                            sx={{pr: '8px', py: '16px'}}
                            style={location.pathname === '/page/population' ? styles.list : styles.black}
                            onClick={(event) => handleListItemClick('/page/population', event)}
                        >
                            <ListItemIcon
                                style={location.pathname === '/page/population'? styles.black : styles.icon}
                            >
                                <FolderSharedOutlinedIcon/>
                                {open === true ? <Typography>จำนวนประชากร</Typography> : <></>}
                            </ListItemIcon>
                        </ListItemButton>

                        <ListItemButton
                            sx={{pr: '8px', py: '16px'}}
                            style={location.pathname === '/page/houses' ? styles.list : styles.black}
                            onClick={(event) => handleListItemClick('/page/houses', event)}
                        >
                            <ListItemIcon
                                style={location.pathname === '/page/houses'? styles.black : styles.icon}
                            >
                                <FolderSharedOutlinedIcon/>
                                {open === true ? <Typography>จำนวนบ้านเรือน</Typography> : <></>}
                            </ListItemIcon>
                        </ListItemButton>

                        <ListItemButton
                            sx={{pr: '8px', py: '16px'}}
                            style={location.pathname === '/page/poor-people' ? styles.list : styles.black}
                            onClick={(event) => handleListItemClick('/page/poor-people', event)}
                        >
                            <ListItemIcon
                                style={location.pathname === '/page/poor-people'? styles.black : styles.icon}
                            >
                                <FolderSharedOutlinedIcon/>
                                {open === true ? <Typography>จำนวนคนจน</Typography> : <></>}
                            </ListItemIcon>
                        </ListItemButton>

                        <ListItemButton
                            sx={{pr: '8px', py: '16px'}}
                            style={location.pathname === '/page/human-development' ? styles.list : styles.black}
                            onClick={(event) => handleListItemClick('/page/human-development', event)}
                        >
                            <ListItemIcon
                                style={location.pathname === '/page/human-development'? styles.black : styles.icon}
                            >
                                <FolderSharedOutlinedIcon/>
                                {open === true ? <Typography>ตัวชี้วัดการพัฒนาคน</Typography> : <></>}
                            </ListItemIcon>
                        </ListItemButton>

                        <ListItemButton
                            sx={{pr: '8px', py: '16px'}}
                            style={location.pathname === '/page/economic' ? styles.list : styles.black}
                            onClick={(event) => handleListItemClick('/page/economic', event)}
                        >
                            <ListItemIcon
                                style={location.pathname === '/page/economic'? styles.black : styles.icon}
                            >
                                <FolderSharedOutlinedIcon/>
                                {open === true ? <Typography >ตัวชี้วัดการพัฒนาเศรษฐกิจและ ความมั่นคง</Typography> : <></>}
                            </ListItemIcon>
                        </ListItemButton>

                        <ListItemButton
                            sx={{pr: '8px', py: '16px'}}
                            style={location.pathname === '/page/environment' ? styles.list : styles.black}
                            onClick={(event) => handleListItemClick('/page/environment', event)}
                        >
                            <ListItemIcon
                                style={location.pathname === '/page/environment'? styles.black : styles.icon}
                            >
                                <FolderSharedOutlinedIcon/>
                                {open === true ? <Typography>ตัวชี้วัดการพัฒนาสิ่งแวดล้อม</Typography> : <></>}
                            </ListItemIcon>
                        </ListItemButton>

                        <ListItemButton
                            sx={{pr: '8px', py: '16px'}}
                            style={location.pathname === '/page/peace' ? styles.list : styles.black}
                            onClick={(event) => handleListItemClick('/page/peace', event)}
                        >
                            <ListItemIcon
                                style={location.pathname === '/page/peace'? styles.black : styles.icon}
                            >
                                <FolderSharedOutlinedIcon/>
                                {open === true ? <Typography>ตัวชี้วัดสันติและความยุติธรรม</Typography> : <></>}
                            </ListItemIcon>
                        </ListItemButton>

                        <ListItemButton
                            sx={{pr: '8px', py: '16px'}}
                            style={location.pathname === '/page/partnership' ? styles.list : styles.black}
                            onClick={(event) => handleListItemClick('/page/partnership', event)}
                        >
                            <ListItemIcon
                                style={location.pathname === '/page/partnership'? styles.black : styles.icon}
                            >
                                <FolderSharedOutlinedIcon/>
                                {open === true ? <Typography>ตัวชี้วัดความเป็นหุ้นส่วนการพัฒนา</Typography> : <></>}
                            </ListItemIcon>
                        </ListItemButton>

                        <ListItemButton
                            sx={{pr: '8px', py: '16px'}}
                            style={location.pathname === '/page/stability' ? styles.list : styles.black}
                            onClick={(event) => handleListItemClick('/page/stability', event)}
                        >
                            <ListItemIcon
                                style={location.pathname === '/page/stability'? styles.black : styles.icon}
                            >
                                <FolderSharedOutlinedIcon/>
                                {open === true ? <Typography>ตัวชี้วัดด้านความมั่นคง</Typography> : <></>}
                            </ListItemIcon>
                        </ListItemButton>

                        <ListItemButton
                            sx={{pr: '8px', py: '16px'}}
                            style={location.pathname === '/page/escape' ? styles.list : styles.black}
                            onClick={(event) => handleListItemClick('/page/escape', event)}
                        >
                            <ListItemIcon
                                style={location.pathname === '/page/escape'? styles.black : styles.icon}
                            >
                                <FolderSharedOutlinedIcon/>
                                {open === true ? <Typography>ตัวชี้วัดการหลุดพ้นความยากจน</Typography> : <></>}
                            </ListItemIcon>
                        </ListItemButton>

                        <ListItemButton
                            sx={{pr: '8px', py: '16px'}}
                            style={location.pathname === '/page/user' ? styles.list : styles.black}
                            onClick={(event) => handleListItemClick('/page/user', event)}
                        >
                            <ListItemIcon
                                style={location.pathname === '/page/user'? styles.black : styles.icon}
                            >
                                <FolderSharedOutlinedIcon/>
                                {open === true ? <Typography>ข้อมูลผู้ใช้</Typography> : <></>}
                            </ListItemIcon>
                            {/*<Grid justifyContent="flex-end" container>
                                {
                                    database === false ? <ExpandMore sx={{color: 'white'}}/> :
                                        <ExpandLess sx={{color: 'white'}}/>
                                }
                            </Grid>*/}
                        </ListItemButton>
                        {/*<ListItemButton
                            style={styles.black}
                            sx={{pr: '8px', py: '16px'}}
                            onClick={() => {
                                setDatabase(!database)
                            }}
                        >
                            <ListItemIcon style={styles.icon}>
                                <FolderSharedOutlinedIcon/>
                                {open === true ? <Typography>ข้อมูลหลักและข้อมูลผู้ใช้</Typography> : <></>}
                            </ListItemIcon>
                            <Grid justifyContent="flex-end" container>
                                {
                                    database === false ? <ExpandMore sx={{color: 'white'}}/> :
                                        <ExpandLess sx={{color: 'white'}}/>
                                }
                            </Grid>
                        </ListItemButton>*/}

                        {/*<Collapse in={database} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <ListItemButton sx={{pr: '8px', py: '10px'}}
                                                style={location.pathname === '/page/faculty' ? styles.list : styles.black}
                                                onClick={(event) => handleListItemClick('/page/faculty', event)}>
                                    <ListItemIcon
                                        style={location.pathname === '/page/faculty' ? styles.black : styles.icon}>
                                        {open === true ? <></> : <MoreHorizOutlinedIcon
                                            style={open === true ? styles.subIcon : styles.icon}/>}
                                        {open === true ? <Typography>คณะ/หน่วยงาน</Typography> : <></>}
                                    </ListItemIcon>
                                </ListItemButton>
                                <ListItemButton sx={{pr: '8px', py: '10px'}}
                                                style={location.pathname === '/page/curriculum' ? styles.list : styles.black}
                                                onClick={(event) => handleListItemClick('/page/curriculum', event)}>
                                    <ListItemIcon
                                        style={location.pathname === '/page/curriculum' ? styles.black : styles.icon}>
                                        {open === true ? <></> : <MoreHorizOutlinedIcon
                                            style={open === true ? styles.subIcon : styles.icon}/>}
                                        {open === true ? <Typography>หลักสูตร</Typography> : <></>}
                                    </ListItemIcon>
                                </ListItemButton>
                                <ListItemButton sx={{pr: '8px', py: '10px'}}
                                                style={location.pathname === '/page/user' ? styles.list : styles.black}
                                                onClick={(event) => handleListItemClick('/page/user', event)}>
                                    <ListItemIcon
                                        style={location.pathname === '/page/user' ? styles.black : styles.icon}>
                                        {open === true ? <></> : <MoreHorizOutlinedIcon
                                            style={open === true ? styles.subIcon : styles.icon}/>}
                                        {open === true ? <Typography>ผู้ใช้</Typography> : <></>}
                                    </ListItemIcon>
                                </ListItemButton>
                                <ListItemButton sx={{pr: '8px', py: '10px'}}
                                                style={location.pathname === '/page/announcement' ? styles.list : styles.black}
                                                onClick={(event) => handleListItemClick('/page/announcement', event)}>
                                    <ListItemIcon
                                        style={location.pathname === '/page/announcement' ? styles.black : styles.icon}>
                                        {open === true ? <></> : <MoreHorizOutlinedIcon
                                            style={open === true ? styles.subIcon : styles.icon}/>}
                                        {open === true ? <Typography>ข่าวประชาสัมพันธ์</Typography> : <></>}
                                    </ListItemIcon>

                                </ListItemButton>
                                <ListItemButton sx={{pr: '8px', py: '10px'}}
                                                style={location.pathname === '/page/education-year' ? styles.list : styles.black}
                                                onClick={(event) => handleListItemClick('/page/education-year', event)}>
                                    <ListItemIcon
                                        style={location.pathname === '/page/education-year' ? styles.black : styles.icon}>
                                        {open === true ? <></> : <MoreHorizOutlinedIcon
                                            style={open === true ? styles.subIcon : styles.icon}/>}
                                        {open === true ? <Typography>ปีการศึกษา/เปิดปิดระบบ</Typography> : <></>}
                                    </ListItemIcon>

                                </ListItemButton>
                                <ListItemButton sx={{pr: '8px', py: '10px'}}
                                                style={location.pathname === '/page/questionnaire-type' ? styles.list : styles.black}
                                                onClick={(event) => handleListItemClick('/page/questionnaire-type', event)}>
                                    <ListItemIcon
                                        style={location.pathname === '/page/questionnaire-type' ? styles.black : styles.icon}>
                                        {open === true ? <></> : <MoreHorizOutlinedIcon
                                            style={open === true ? styles.subIcon : styles.icon}/>}
                                        {open === true ? <Typography>ประเภทแบบสอบถาม</Typography> : <></>}
                                    </ListItemIcon>

                                </ListItemButton>

                            </List>
                        </Collapse>*/}
                    </> : <></>}


                                {/* {identity.roles && identity.roles[0] === 'ROLE_HR'  ?
                                <>
                                <ListItemButton sx={{pr: '8px', py: '10px'}}
                                                style={location.pathname === '/page/hr-page/' ? styles.list : styles.black}
                                                onClick={(event) => handleListItemClick('/page/hr-page/', event)}>
                                    <ListItemIcon
                                        style={location.pathname === '/page/hr-page/' ? styles.black : styles.icon}>
                                        {open === true ? <></> : <MoreHorizOutlinedIcon
                                            style={open === true ? styles.subIcon : styles.icon}/>}
                                        {open === true ? <Typography>ข้อมูลจากบุคคล</Typography> : <></>}
                                    </ListItemIcon>

                                </ListItemButton>
                                 </> : <></>}


                                {identity.roles && identity.roles[0] === 'ROLE_Register' ?
                                <>
                                <ListItemButton sx={{pr: '8px', py: '10px'}}
                                                style={location.pathname === '/page/registration-page/' ? styles.list : styles.black}
                                                onClick={(event) => handleListItemClick('/page/registration-page/', event)}>
                                    <ListItemIcon
                                        style={location.pathname === '/page/registration-page/' ? styles.black : styles.icon}>
                                        {open === true ? <></> : <MoreHorizOutlinedIcon
                                            style={open === true ? styles.subIcon : styles.icon}/>}
                                        {open === true ? <Typography>ข้อมูลจากทะเบียน</Typography> : <></>}
                                    </ListItemIcon>

                                </ListItemButton>
                                </> : <></>} */}

            </List>
        </React.Fragment>
    );
}


export const secondaryListItems = (
    <React.Fragment>
        {/*<ListSubheader component="div" inset>*/}
        {/*    Saved reports*/}
        {/*</ListSubheader>*/}
        <ListItemButton>
            <ListItemIcon>
                <AssignmentIcon/>
            </ListItemIcon>
            <ListItemText primary="Current month"/>
        </ListItemButton>
        <ListItemButton>
            <ListItemIcon>
                <AssignmentIcon/>
            </ListItemIcon>
            <ListItemText primary="Last quarter"/>
        </ListItemButton>
        <ListItemButton>
            <ListItemIcon>
                <AssignmentIcon/>
            </ListItemIcon>
            <ListItemText primary="Year-end sale"/>
        </ListItemButton>
    </React.Fragment>
);
