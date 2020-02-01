import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import io from "socket.io-client";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

import { useCookies } from "react-cookie";
import { Redirect } from "react-router-dom";
import { ChatFeed, Message } from 'react-chat-ui'

import javascriptImg from '../../assets/img/Unofficial_JavaScript_logo_2.svg'
import reactImg from '../../assets/img/React-icon.svg'
import angular from '../../assets/img/Node.js_logo.svg'
import Avatar from '@material-ui/core/Avatar';
import fire from "../../fire.js";
import firebase from 'firebase'
import { TextField } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';



const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

const useStyles = makeStyles(styles);

export default function TableList() {
  const axios = require("axios").default;
  const classes = useStyles();
  const [cookies, setCookie, removeCookie] = useCookies(['authToken']);
  const [messages, setMessages] = React.useState([new Message({
    id: 1,
    message: "The first thing about web development is to Learn HTML and CSS",
  }), // Gray bubble
  new Message({ id: 0, message: "Hmm..I am working on it!" }), new Message({
    id: 1,
    message: "After that you can learn Bootstrap. That will give you enough tools to build powerful stuff.",
  }),]);
  const [mentorList, setMentorList] = React.useState([{ id: 1, name: 'Abraham Obroi', skill: 'Angular' },
  { id: 2, name: 'Meenal K.', skill: 'JavaScript' },
  { id: 3, name: 'Arpit B.', skill: 'React' },
  { id: 4, name: 'Yatik', skill: 'Express' },
  { id: 5, name: 'Lorem Ipsum', skill: 'C' },
  { id: 6, name: 'Abraham Obraham', skill: 'R' }])
  const [mentorId, setMentorId] = React.useState("");
  const [is_typing, setIs_typing] = React.useState(false);
  const [mentors, setMentors] = React.useState([]);
  const [msg, setMsg] = React.useState("");
  const [active, setActive] = React.useState(1);
  var email;

  useEffect(async () => {
    // axios({
    //   method: 'post',
    //   url: 'http://localhost:5000/api/mentee/fetchemail',
    //   data: { "menteeId": cookies.userId },
    //   headers: { "authToken": cookies.authToken }
    // }).then(response => {
    //   email = response.email;
    //   console.log(response);
    // });
    // axios({
    //   method: 'post',
    //   url: "http://localhost:5000/api/mentee/getallmentors",
    //   data: { "menteeId": cookies.userId },
    //   headers: { "authToken": cookies.authToken }
    // }).then(response => {
    //   setMentorList(response.data);
    //   console.log(response);
    // })
    // Example POST method implementation:
    async function postData(url = '', data = {}) {
      // Default options are marked with *
      const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        // credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json',
          'authToken': cookies.authToken
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *client
        body: JSON.stringify(data) // body data type must match "Content-Type" header
      });
      return await response.json(); // parses JSON response into native JavaScript objects
    }

    postData('http://localhost:5000/api/mentee/getallmentors', { userId: cookies.userId })
      .then((data) => {
        console.log(data); // JSON data parsed by `response.json()` call
      });

  }, []);
  // React.useEffect(() => {
  //   /* Create reference to messages in Firebase Database */
  //   let messagesRef = fire.database().ref('mentorme-efa7c/chats/menteeIdmentorId/timestamp/menteeId').orderByKey().limitToLast(100);

  //   messagesRef.on('value', snapshot => {
  //     const message = snapshot.val();
  //     console.log(message);
  //   })
  // })

  // const socket = io.connect("http://localhost:7000");

  const onMessageSubmit = () => {
    // socket.emit("chat message", msg);
    setMsg("");
  };

  const handleMsg = (e) => {
    setMsg(e.target.value);
  }

  if (!cookies.authToken) {
    return <Redirect to="/login" />
  }
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={5}>
        <Card style={{ height: '100%' }}>
          <CardHeader color='primary'>
            <h4 className={classes.cardTitleWhite}>Mentors</h4>
            <p className={classes.cardCategoryWhite}>
              {mentorList.length} active mentors.
            </p>
          </CardHeader>
          <CardBody style={{ height: '450px', overflow: "auto" }}>
            {mentorList.map(data => {
              return (<div style={{ paddingTop: "10px", paddingLeft: "20px", margin: "10px", border: data.id === active ? "1.5px solid #8BC34A" : "0.5px solid #ddd", borderRadius: "10px", cursor: "pointer" }} onClick={() => setActive(data.id)}>
                <GridContainer>
                  <GridItem xs={1} sm={1} md={1}>
                    <Avatar alt="" src={javascriptImg} style={{ width: "50px", height: "50px", marginTop: "25px" }} />
                  </GridItem>
                  <GridItem xs={8} sm={8} md={8} style={{ margin: "20px" }}>
                    <h4 style={{ fontWeight: "400", margin: "5px" }}>{data.name}</h4>
                    <p style={{ margin: "0px 5px 20px 5px" }} >{data.skill}</p>
                  </GridItem>
                </GridContainer>
              </div>)
            })}
          </CardBody>
        </Card>
      </GridItem>
      <GridItem xs={12} sm={12} md={7}>
        <Card style={{ height: '100%' }}>
          <CardBody style={{ height: '100%' }}>
            <div style={{ borderBottom: '1px solid #aaa' }}>
              <GridContainer>
                <GridItem xs={1} sm={1} md={1}>
                  <Avatar alt="Arpit Bhardwaj" src={javascriptImg} style={{ width: "50px", height: "50px", marginTop: "5px" }} />
                </GridItem>
                <GridItem xs={11} sm={11} md={11}>
                  <h4 style={{ fontWeight: "400", margin: "5px 5px 0px 5px" }}>{mentorList[active - 1].name}</h4>
                  <p style={{ margin: "0px 5px 20px 5px" }} > Last message {Math.floor(Math.random() * 10)} hrs ago</p>

                </GridItem>

              </GridContainer>
            </div>
            <div style={{ height: "450px" }}>
              <ChatFeed
                style={{ overflow: "auto" }}
                messages={messages} // Boolean: list of message objects
                isTyping={is_typing} // Boolean: is the recipient typing
                hasInputField={false} // Boolean: use our input, or use your own
                showSenderName // show the name of the user who sent the message
                bubblesCentered={false} //Boolean should the bubbles be centered in the feed?
                // JSON: Custom bubble styles
                bubbleStyles={
                  {
                    text: {
                      fontSize: 15
                    },
                    chatbubble: {
                      borderRadius: 20,
                      padding: 10
                    }
                  }
                }
              />
            </div>
            <form onSubmit={() => onMessageSubmit()}>
              <TextField id="outlined-basic" placeholder="Send a message" variant="outlined" onChange={(e) => handleMsg(e)} value={msg} style={{ height: "55px", width: "75%", margin: "0 20px", borderRadius: "50px" }} />
              <Button variant="contained" color="primary" type="submit" style={{ height: "55px", width: "55px", margin: "0 20px" }}>
                <SendIcon />
              </Button>
            </form>
          </CardBody>
        </Card>

      </GridItem>
    </GridContainer >
  );
}
