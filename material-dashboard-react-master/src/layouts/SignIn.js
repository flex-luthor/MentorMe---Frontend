import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import { useCookies } from "react-cookie";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { Link as Links, Redirect } from "react-router-dom";
import { Slide } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";

import {
  makeStyles,
  createMuiTheme
} from "@material-ui/core/styles";


import {
  ThemeProvider
} from "@material-ui/styles";

import { blue } from "@material-ui/core/colors";
import Background from "../wall.jpg";
import google from "../google.svg";

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
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  redbtn: {
    margin: theme.spacing(4, 0, 0),
    // background: "linear-gradient(to right, #de5246, #ef473a); ",

    height: 40
  },
  links: {
    margin: theme.spacing(0, 0, 5)
  },
  nav: {
    display: "flex",
    paddingTop: "10px",
    paddingRight: "10px",
    marginBottom: "-40px"
  },
  theme: {
    marginLeft: "auto"
  },
  svg: {
    marginRight: "10px"
  }
}));

export default function SignInSide() {
  const classes = useStyles();
  const [cookies, setCookie] = useCookies(["theme", "authToken", "userId"]);

  const axios = require("axios").default;

  const [pass, setPass] = useState("");
  const [email, setEmail] = useState("");
  const [toDashboard, setToDashboard] = useState(false);
  const [openFail, setOpenFail] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenFail(false);
  };

  function onClick() {
    if (cookies.theme === "light") {
      setCookie("theme", "dark", { path: "/" });
    } else setCookie("theme", "light", { path: "/" });

  }

  function sendForm(e) {
    e.preventDefault();
    const logIn = {
      password: pass,
      email: email
    };
    // console.log(logIn);
    axios
      .post("http://localhost:5000/api/mentee/login", logIn)
      .then(response => {
        console.log(response);
        if (response.data.success === false) {
          setOpenFail(true);
          alert("Error : " + response.data.msg)
        } else {
          setToDashboard(true);
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
    //     if (response.data.success === false) {
    //       setOpenFail(true);
    //       document.getElementById("error").innerText =
    //         "Error : " + response.data.error;
    //     } else {
    //       setToDashboard(true);
    //     }
    //   })
  }

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  if (cookies.authToken) {
    return <Redirect to="/admin/dashboard" />;
  }



  return (
    <ThemeProvider theme={cookies.theme === "dark" ? darkTheme : lightTheme}>
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={5} md={8} className={classes.image} />
        <Grid item xs={12} sm={7} md={4} component={Paper} elevation={6} square>
          <Slide direction="bottom" in={true} mountOnEnter unmountOnExit>
            <div>
              <div className={classes.nav}>
                <IconButton
                  aria-label="theme"
                  className={classes.theme}
                  onClick={() => onClick()}
                >
                  <Brightness4Icon />
                </IconButton>
              </div>

              <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Log In
                </Typography>
                <form className={classes.form} onSubmit={sendForm}>
                  <TextField
                    shrink
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    onChange={event => setEmail(event.target.value)}
                    value={email}
                  />

                  <TextField
                    shrink
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={event => setPass(event.target.value)}
                    value={pass}
                  />
                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                  />
                  {/* <ButtonGroup
                    orientation="vertical"
                    fullWidth
                    aria-label="vertical outlined primary button group"
                  > */}
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    Log In
                  </Button>

                  {/* </ButtonGroup> */}
                  <Grid container className={classes.links}>
                    <Grid item xs>
                      <Link href="#" variant="body2">
                        Forgot password?
                      </Link>
                    </Grid>
                    <Grid item>
                      <Links to="/signup" variant="body2">
                        {"Don't have an account? Sign Up"}
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
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
