import React from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import AssessmentIcon from '@material-ui/icons/Assessment';
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Tasks from "components/Tasks/Tasks.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import TagFacesIcon from '@material-ui/icons/TagFaces';
import InputAdornment from '@material-ui/core/InputAdornment';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import javascriptImg from '../../assets/img/Unofficial_JavaScript_logo_2.svg'
import reactImg from '../../assets/img/React-icon.svg'
import angular from '../../assets/img/Node.js_logo.svg'

import { lighten, withStyles } from '@material-ui/core/styles';




import { bugs, website, server } from "variables/general.js";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import { ThemeProvider } from "@material-ui/styles";
import { green, grey } from "@material-ui/core/colors";
import { Slide } from "@material-ui/core";

import LinearProgress from '@material-ui/core/LinearProgress';


import { useCookies } from "react-cookie";
import { Redirect } from "react-router-dom";
import pulse from "../../assets/img/pulse.svg"
import { render } from "@testing-library/react";


const useStyles = makeStyles(styles);

const BorderLinearProgress = withStyles({
  root: {
    height: 10,
    backgroundColor: lighten('#4CAF50', 0.2),
  },
  bar: {
    borderRadius: 10,
    backgroundColor: "#fff",
  },
})(LinearProgress);

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#fff"
    }
  }
});

const greenTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#e8f5e9"
    }
  }
});

function Title(params) {
  if (params.skill === "") {
    return <h2 style={{ textAlign: 'center' }}>Let's find a mentor.</h2>
  }
  else {
    return <h2 style={{ textAlign: 'center' }}>Searching for your {params.skill} mentor.</h2>

  }
}

function Action(params) {
  if (params.skill === "") {
    return (<ThemeProvider theme={theme}>
      <TextField
        id="outlined-textarea"
        placeholder="Find a new mentor by searching a subject."
        style={{ width: "40%", minWidth: "230px", textAlign: "center" }}
        startAdornment={
          <InputAdornment position="start">
          </InputAdornment>
        }
        onChange={params.handleSearch}
        multiline
        variant="outlined"
      />
    </ThemeProvider>
    )
  }
  else {
    return <BorderLinearProgress
      className={params.look}
      style={{ width: "40%", minWidth: "230px", height: "20px", marginLeft: "50%", transform: "translateX(-50%)", borderRadius: '10px', border: "1px solid #fff" }}
      variant="determinate"
      color="secondary"
      value={params.progress}
    />

  }
}


export default function Dashboard() {



  const classes = useStyles();
  const axios = require("axios").default;

  const [chipData, setChipData] = React.useState([
    { key: 0, label: 'Angular' },
    { key: 1, label: 'jQuery' },
    { key: 2, label: 'Polymer' },
    { key: 3, label: 'React' },
    { key: 4, label: 'Vue.js' },
    { key: 5, label: 'Express' },
    { key: 6, label: 'Laravel' },
    { key: 7, label: 'NodeJS' },
    { key: 8, label: 'Python' },
    { key: 9, label: 'TensorFlow' },
    { key: 10, label: 'C' },
    { key: 11, label: 'C++' },
    { key: 12, label: 'Java' },
    { key: 13, label: 'PHP' },
    { key: 14, label: 'Javascript' },
    { key: 15, label: 'R' }
  ]);
  const [cookies, setCookie, removeCookie] = useCookies(['authToken']);
  const [search, setSearch] = React.useState("");
  const [searchSetup, setSearchSetup] = React.useState(false);
  const [skill, setSkill] = React.useState("");
  const [progress, setProgress] = React.useState(0);
  const [stopSearch, setStopSearch] = React.useState(false);
  var mentor = "";


  let reco = 0;

  const searchFunction = (e) => {
    return (
      (search !== "" && e.toUpperCase().indexOf(search.toUpperCase()) !== -1) ||
      search === ""
    );
  }

  const handleSearch = (e) => {
    setSearch(e.target.value);
    reco = 0;
  }
  const searchMentor = (data) => {
    setSearchSetup(true);
    setSkill(data.label);
    axios({
      method: 'post',
      url: "http://localhost:5000/api/mentee/newmentor",
      data: { skill: data.label, userId: cookies.userId },
      headers: { 'authToken': cookies.authToken }
    }).then(response => {
      console.log(response);
      if (response.success) {
        mentor = response.mentorId;
      }
    });


    var email;

    var progressBar = 10;
    var pro = setInterval(() => {
      progressBar++;
      setProgress(progressBar);
    }, 100);

    setTimeout(() => {
      clearInterval(pro);
      setProgress(100)
    }, 9 * 1000);
  }

  // const searchLoop = (data) => {
  //   return 
  // }




  if (!cookies.authToken) {
    return <Redirect to="/login" />
  }

  if (progress === 100) {
    return <Redirect to="/admin/table" />
  }

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card chart>
            <CardHeader color="success">
              <div style={{ textAlign: 'center', marginBottom: "20px" }} >
                <Title skill={skill} />
                <Action handleSearch={handleSearch} skill={skill} look={classes.margin} progress={progress} />
              </div>
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Recommended Subjects:</h4>
              {
                chipData.map(data => {
                  if (searchFunction(data.label)) {
                    reco++;
                    return (
                      <ThemeProvider theme={greenTheme}>
                        <Chip
                          key={data.key}
                          label={data.label}
                          size="small"
                          clickable
                          style={{ margin: '5px', padding: '3px' }}
                          color="primary"
                          onClick={() => searchMentor(data)}
                        />
                      </ThemeProvider>
                    );
                  }

                })
              }

            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AssessmentIcon /> {reco} subjects recommended.
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>

    </div >
  );
}
