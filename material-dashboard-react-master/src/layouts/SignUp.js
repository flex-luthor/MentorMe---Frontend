import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Background from "../wall.jpg";
import IconButton from "@material-ui/core/IconButton";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import { useCookies } from "react-cookie";
import { Slide } from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { Link as Links, Redirect } from "react-router-dom";
import Divider from "@material-ui/core/Divider";
import google from "../google.svg";
import back from "../assets/img/back.jpg";
import tick from "../assets/img/tick.svg";
import CircularProgress from '@material-ui/core/CircularProgress';



import {
  makeStyles,
  createMuiTheme
} from "@material-ui/core/styles";

import { ThemeProvider } from '@material-ui/styles';

import { blue } from "@material-ui/core/colors";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="/">
        MentorMe
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
    primary: blue
  }
});

const lightTheme = createMuiTheme({
  palette: {
    type: "light",
    primary: blue
  }
});

const useStyles = makeStyles(theme => ({
  root: {
    height: "100vh",
    color: theme.palette.text.primary
  },
  image: {
    backgroundImage: "url(" + Background + ")",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "dark"
        ? theme.palette.grey[900]
        : theme.palette.grey[50],
    backgroundSize: "cover",
    backgroundPosition: "center"
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },

  avatar: {
    margin: theme.spacing(1),
    backgroundColor: darkTheme.palette.primary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  theme: {
    marginLeft: "auto"
  },
  nav: {
    display: "flex",
    paddingTop: "10px",
    paddingRight: "10px",
    marginBottom: "-40px"
  },
  redbtn: {
    margin: theme.spacing(4, 0, 0),
    // background: "linear-gradient(to right, #de5246, #ef473a); ",

    height: 40
  },
  links: {
    margin: theme.spacing(0, 0, 5)
  },
  svg: {
    marginRight: "10px"
  }
}));

export default function SignInSide() {
  const classes = useStyles();
  const [cookies, setCookie] = useCookies(["theme", "authToken", "userId"]);
  const axios = require("axios").default;

  const [fname, setFname] = useState("");
  const [pass, setPass] = useState("");
  const [email, setEmail] = useState("");
  const [reg, setReg] = useState(true);
  const [regSuccess, setRegSuccess] = useState(false);
  const [redirectDashboard, setRedirectDashboard] = useState(false);


  function onClick() {
    if (cookies.theme === "light") {
      setCookie("theme", "dark", { path: "/" });
    } else setCookie("theme", "light", { path: "/" });
  }

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  function sendForm(e) {
    e.preventDefault();
    const signUp = {
      name: fname,
      password: pass,
      email: email
    };
    console.log(signUp);

    axios
      .post("http://localhost:5000/api/mentee/register", signUp)
      .then(response => {
        console.log(response);
        if (response.data.success === false) {
          alert("Error: " + response.data.msg)
        } else {

          setRegSuccess(true);
          setReg(false);
          setTimeout(() => {
            setRedirectDashboard(true)
          }, 3000)
          setCookie("authToken", response.data.authToken, { path: "/" });
          setCookie("userId", response.data.userId, { path: "/" });
        }
      });
  }

  function googleLogin() {
    // axios
    //   .get("http://localhost:5000/user/login/google")
    //   .then(response => {
    //     console.log(response);
    //     // setToDashboard(true);
    //   })
    //   .catch(error => {
    //     console.log(error.response);
    //     setOpenFail(true);
    //     document.getElementById("error").innerText =
    //       "Error : " + error.response.data.error;
    //   });
  }
  if (redirectDashboard) {
    return <Redirect to={"/admin/dashboard"} />
  }


  return (

    <ThemeProvider theme={cookies.theme === "dark" ? darkTheme : lightTheme}>
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={5} md={8} className={classes.image} />
        <Grid item xs={12} sm={7} md={4} component={Paper} elevation={6} square>
          <Slide direction="bottom" in={reg} mountOnEnter unmountOnExit>
            <div>
              <div className={classes.nav}>
                <IconButton
                  aria-label="theme"
                  onClick={() => onClick()}
                  className={classes.theme}
                >
                  <Brightness4Icon />
                </IconButton>
              </div>

              <div className={classes.paper}>

                <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign Up
                </Typography>
                <form className={classes.form} onSubmit={sendForm}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={12}>
                      <TextField
                        autoComplete="name"
                        name="fullName"
                        variant="outlined"
                        required
                        fullWidth
                        id="Name"
                        label="Full Name"
                        onChange={event => setFname(event.target.value)}
                        autoFocus
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        onChange={event => setEmail(event.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={event => setPass(event.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}></Grid>
                  </Grid>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    type="submit"
                  >
                    Sign Up
                  </Button>
                  <Grid container justify="flex-end" className={classes.links}>
                    <Grid item>
                      <Links to="/LogIn" variant="body2">
                        Already have an account? Log In
                      </Links>
                    </Grid>
                  </Grid>
                  <Divider />
                  <Button
                    fullWidth
                    variant="outlined"
                    color="primary"
                    className={classes.redbtn}
                    onClick={googleLogin}
                  >
                    <img
                      src={google}
                      alt="google"
                      height="20px"
                      className={classes.svg}
                    />
                    sign in with google
                  </Button>
                  <Box mt={5}>
                    <Copyright />
                  </Box>
                </form>
              </div>
            </div>
          </Slide>
          <Slide direction="bottom" in={regSuccess} mountOnEnter unmountOnExit>
            <div className={classes.paper} style={{
              backgroundImage: "url(" + back + ")",
              backgroundSize: "cover",
              backgroundPosition: "center", height: "100%", margin: "0px"
            }}>
              <img src={tick} style={{ width: "80px", margin: "0 50%", marginTop: "50%" }}></img>
              <Typography component="h1" variant="h5" style={{ color: "white", marginTop: "20px", marginBottom: "20px" }}>
                Successfully Registered!
              </Typography>
              <CircularProgress color="primary" />
              <Typography component="h1" variant="h6" style={{ color: "white", marginTop: "20px" }}>
                Redirecting to <Links to="/admin/dashboard" style={{ textDecoration: "underline", color: "white" }}>Dashboard</Links>
              </Typography>
            </div>
          </Slide>
        </Grid>
      </Grid>
    </ThemeProvider >
  );
}
