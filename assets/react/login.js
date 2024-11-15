import React, {Component, useState,useContext, useEffect,useRef} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import LinearProgress from '@mui/material/LinearProgress';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import OutlinedInput from '@mui/material/OutlinedInput';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import logo from '/public/images/logo-sapa.jpg'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import DraftsOutlinedIcon from '@mui/icons-material/DraftsOutlined';
import Icon from '@mui/material/Icon';
import {Divider, Grid, IconButton, Stack} from "@mui/material";
import InputAdornment from '@mui/material/InputAdornment';
import AnnouncementApi from "./api/AnnouncementApi";
import LoginApi from "./api/LoginApi";

import '@fontsource/roboto/100.css';
import axios from "axios";
import CurriculumApi from "./api/CurriculumApi";
import FacultyApi from "./api/FacultyApi";
import {AuthContext} from '../react-app';

const theme = createTheme();
const styles = {
    testBackground: {
        backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5))',
        backgroundSize: "cover",
        backgroundPosition: "center",
    },
};
// const useStyles = makeStyles((theme) =>({
//     textField: {
//         border:'1px solid blue'
//     }
// }))

function Login() {
    const {auth, setAuth, identity, setIdentity, isLoading, setIsLoading} = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [announcement, setAnnouncement] = useState([]);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    // useEffect( () => {
    //     const fetchData = async () => {
    //         let announcementDB = await AnnouncementApi.getData();
    //         console.log(announcementDB.data)
    //         setAnnouncement(announcementDB.data)
    //         setLoading(false)
    //     }
    //     const result = fetchData()
    //         .catch(console.error);
    // }, []);
    // useEffect(()=>{
    //     async function getData(){
    //         const res = await axios.get('/getSurvey')
    //         console.log(res)
    //     }
    //     // getData();
    // },[]);

    const handleSubmit = async (e) => {
        setIsLoading(true)
        if (!username || !password) {
            alert('กรุณากรอกอีเมล และรหัสผ่านให้ครบถ้วน')
        } else {
            let login = await LoginApi.login({email: username, password: password})
            if (login.status === 200) {
                await localStorage.setItem('token', JSON.stringify(login.data.token));
                await setAuth(login.data.token)
                let identify = await LoginApi.getProfile();
                await localStorage.setItem('identity', JSON.stringify(identify.data));
                await setIdentity(identify.data);
            }
        }
        setIsLoading(false)
    };

    return(
        <>
            {isLoading && (<LinearProgress color="success"/>)}
            <Grid container component="main" sx={{ height: '100vh' }}>
                {/*{
                    loading === true
                        ?
                        <>
                            <Grid
                                item
                                xs={12}
                                sm={12}
                                md={12}
                                lg={8}

                                sx={{
                                    backgroundImage: `url(${"/images/bg_login.png"})`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundColor: (t) =>
                                        t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    height:'100%',
                                }}
                            >
                                <LinearProgress/>
                            </Grid>
                        </>
                        :
                        <>
                            <CssBaseline />
                            <Grid
                                item
                                xs={12}
                                sm={12}
                                md={12}
                                lg={8}

                                sx={{
                                    backgroundImage: `url(${"/images/bg_login.png"})`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundColor: (t) =>
                                        t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',

                                }}
                            >
                                <Paper  justify="center"
                                        direction="column"
                                        xs={12}
                                        sm={12}
                                        md={12}
                                        lg={8}
                                        sx={{ background:'transparent', boxShadow: 'none',position:'relative', m:'30px'}}

                                >
                                    <Grid container  sx={{mb: '10px'}} position="static"  style={styles.testBackground}>
                                        <Grid  direction="row" container alignItems="center" sx={{ mx:'30px'}}>
                                            <Avatar sx={{ backgroundImage: `url(${"/images/Ellipse.png"})`,backgroundPosition: 'bottom', backgroundSize: 'cover', backgroundRepeat: 'no-repeat',}}> <DraftsOutlinedIcon sx={{position:'static',color:'black'}}/> </Avatar>
                                            <Typography variant="h4" sx={{paddingLeft: '20px', paddingBottom: '10px', m:0, mt:'20px',fontSize:'24px',fontWeight: 'bold'  }}>
                                                ข่าวประชาสัมพันธ์ทั่วไป
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid container sx={{mb: '10px', height:'85vh'}} position="static"  style={{maxHeight:'800px',overflow:'auto',wordBreak: 'break-all',        backgroundImage:
                                            'linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5))',
                                        backgroundSize: "cover",
                                        backgroundPosition: "center" }}>
                                        <Grid item container direction="column"  sx={{pt:'10px', mx:'10px'}}>
                                            {announcement.map((e) => (
                                               <>
                                                       <Grid item direction="row">
                                                           <Typography sx={{pl:'30px',fontSize: '20px',fontWeight:'bold', lineHeight: 'normal', position:'static'}} variant="h6" gutterBottom>
                                                               <FiberManualRecordIcon fontSize={"small"} sx={{color:'#4677A0',}}/> {e.announcementHeader}
                                                           </Typography>
                                                       </Grid>
                                                       <Typography sx={{pl:'30px',fontSize: '18', lineHeight: 'normal', position:'static'}} variant="h6" gutterBottom>
                                                            {e.description}

                                                           {e.description.split(" ").map((word, index) => {
                                                                // ตรวจสอบว่าคำนี้เป็น URL (ลิงก์)
                                                                if (word.match(/^https?:\/\/\S+/)) {
                                                                    return null; // ไม่แสดง URL ในการแสดงผล
                                                                } else {
                                                                    return <span key={index}>{word} </span>;
                                                                }
                                                            })}
        
                                                           {e.description.split(" ").map((word, index) => {
                                                            // ตรวจสอบว่าคำนี้เป็น URL (ลิงก์)
                                                            if (word.match(/^https?:\/\/\S+/)) {
                                                                return (
                                                                    <a key={index} href={word} target="_blank" rel="noopener noreferrer">
                                                                        {word}
                                                                    </a>
                                                                );
                                                            } else {
                                                                return null; // ไม่แสดงข้อความที่ไม่ใช่ URL
                                                            }
                                                            })}

                                                       </Typography>
                                                       <Divider sx={{ backgroundColor:'black',my:'10px'}}/>
                                               </>
                                            ))}
                                            <br/>
                                            <br/>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>

                        </>
                }*/}
                <Grid item xs={12} sm={12} md={12} lg={12} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Grid sx={{pt:'50px'}}>
                            <img src={logo} className="image"
                                 style={{
                                     width: '100%', /* Default width */
                                     '@media (min-width: 576px)': {
                                         width: '300px', /* Set width for small screens */
                                     },
                                     '@media (min-width: 768px)': {
                                         width: '400px', /* Set width for medium screens */
                                     },
                                     '@media (min-width: 992px)': {
                                         width: '500px', /* Set width for large screens */
                                     },
                                     '@media (min-width: 1200px)': {
                                         width: '600px', /* Set width for extra large screens */
                                     },
                                 }}
                            />
                        </Grid>
                        <Grid sx={{alignItems: 'center',}}>
                        <Typography component="h1" variant="h1" sx={{ pt:'10px', pb:'20px', color:'#01696A', fontWeight: 'regular', fontSize:{xs: '14px', sm: '16px', md: '18px', lg: '20px'} }} gutterBottom>
                            ระบบฐานข้อมูลเพื่อการเตือนภัยความยากจนบริเวณจังหวัดชายแดน
                        </Typography>
                        </Grid>
                        <Box sx={{ mt: 2 ,maxWidth:'400px'}}>

                            <Typography component="h3" variant="subtitle1" sx={{ pt:'10px', color:'#01696A', fontWeight: 'regular' }} gutterBottom>
                                บัญชีผู้ใช้
                            </Typography>
                            <TextField
                                sx={{p:0,m:0,borderRadius:'10px', '& legend': { display: 'none' }, '& fieldset': { top: 0 },}}
                                disabled={isLoading}
                                margin="normal"
                                required
                                id="email"
                                name="บัญชีผู้ใช้"
                                autoComplete="email"
                                autoFocus
                                fullWidth
                                onChange={(e)=>{
                                    setUsername(e.target.value)
                                }}
                            />
                            <Typography component="h3" variant="subtitle1" sx={{ pt:'30px', color:'#01696A', fontWeight: 'regular' }} gutterBottom>
                                รหัสผ่าน
                            </Typography>
                            <TextField
                                sx={{p:0,m:0,backgroundColor:'#C2C8158',borderRadius:'10px', '& legend': { display: 'none' }, '& fieldset': { top: 0 },}}
                                disabled={isLoading}
                                margin="normal"
                                required
                                fullWidth
                                name="รหัสผ่าน"
                                type={showPassword == true ? 'text' : 'password'}
                                id="password"
                                autoComplete="current-password"
                                onChange={(e)=>{
                                    setPassword(e.target.value)
                                }}
                                onKeyDown={ async (e) => {
                                    if (e.key === 'Enter') {
                                        await handleSubmit();
                                    }
                                }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={()=>{
                                                    setShowPassword(!showPassword)
                                                }}
                                                // onMouseDown={(e)=>{
                                                //     e.preventDefault();
                                                // }}
                                                edge="end"
                                            >
                                                {showPassword == false ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}

                            />

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: '60px', mb: 2, backgroundColor:'#01696A' }}
                                onClick={ async (e)=>{
                                    e.preventDefault();
                                    await handleSubmit();
                                    // let dataLogin = {
                                    //     email: username,
                                    //     password: password
                                    // }
                                    // if (!username || !password){
                                    //     alert('กรุณากรอกอีเมล และรหัสผ่านให้ครบถ้วน')
                                    // } else {
                                    //     console.log(dataLogin)
                                        // let login = await LoginApi.login({email: username, password: password})
                                        // console.log(login)
                                        // await localStorage.setItem('token', JSON.stringify(login.data.token));
                                        // await setAuth(login.data.token)
                                        //
                                        // let identify = await LoginApi.getProfile();
                                        //
                                        // await localStorage.setItem('identity', JSON.stringify(identify.data));
                                        // await setIdentity(identify.data);
                                        //await window.location.reload(false);
                                        // if (login.data.status === 200){
                                        //     await localStorage.setItem('identity', JSON.stringify(login.data.token));
                                        //     await setAuth(login.data.token)
                                        // } else {
                                        //     alert(login.response.data.message)
                                        // }
                                        //
                                        //
                                        // if (login.response.status === 200){
                                        //     await localStorage.setItem('identity', JSON.stringify(login.data.token));
                                        //     await setAuth(login.data.token)
                                        // } else {
                                        //     alert(login.response.data.message)
                                        // }
                                        // window.location.pathname = '/page'
                                    // }
                                }}
                            >
                                เข้าสู่ระบบ
                            </Button>

                            <Grid  direction="row" container alignItems="center" justifyContent="center" sx={{ pt:'20px' }}>
                                <Link href="/reset-password" variant="body2" style={{ textDecoration: 'none' }}>
                                    ลืมรหัสผ่าน ?
                                </Link>
                                {/*<Typography sx={{color:'#4677A0'}}>/</Typography>*/}
                                {/*<Link href="#" variant="body2" style={{ textDecoration: 'none' }}>*/}
                                {/*    &nbsp;  ติดต่อเรา*/}
                                {/*</Link>*/}
                            </Grid>

                            {/*<Copyright sx={{ mt: 5 }} />*/}
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}
export default Login;
