import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import ChatBox from '../ChatBox/ChatBox';
import Box from '@material-ui/core/Box';
import {Button, Typography} from '@material-ui/core';
import { socket } from '../../utils/socket';

const useStyles = makeStyles({
  
    root: {
        height: '95vh',
        width:'100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0',
        margin: '0',
        border: '0',
        overflow: 'hidden',
    },
    userDetails:{
      position: 'absolute',
      top: '10px',
      display: 'flex',
      alignItems: 'center',
      color:'white',
      justifyContent: 'space-between',
      right: '0',
      boxSizing: 'border-box',
      minWidth: '15%',
      padding: '0 20px',
    }
        
  });
  
  export default function Body() {
    const classes = useStyles();
    const [userName,setUserName]=React.useState('');
    const [userId,setUserId]=React.useState('');
    const [chatRoomdata,setChatRoomdata]=React.useState([]);
    let roomId=localStorage.getItem('roomId');

    React.useEffect(()=>{
      let ignore=false;
      if(!ignore){
      let userIdVal=localStorage.getItem('userId');
      let userNameVal=localStorage.getItem('userName');

      if(!userIdVal){
        socket.emit('CreateUserData');
        socket.on('setUserData',userData=>{
          localStorage.setItem('userId',userData.userId);
          localStorage.setItem('userName',userData.username);
          if(!ignore){
          setUserName(userData.username);
          setUserId(userData.userId); 
          }
          // socket.emit('userEnteredRoom',userData);
        });
      }
      else {
        //If user already has userid and username, notify server to allow them to join chat
        if(!ignore){
        setUserName(userNameVal);
        setUserId(userIdVal);
        }
        // socket.emit("UserEnteredRoom", {userID: userIdVal, username: userNameVal})
      
    }
   
  }
     //Retrieve game data (from Get Chat data socket call)
     return ()=>{
      ignore=true;
     }
    },[]);
   
    React.useEffect(()=>{
      socket.on("RetrieveChatRoomData", (chatRoomData) => {
        setChatRoomdata(chatRoomData);
      });

      socket.on("setRoomId",roomId=>{
        localStorage.setItem('roomId',roomId);
      });
      socket.on("removeRoomId",roomId=>{
        localStorage.removeItem('roomId');
      });
      
    },[])
   

    return (
      <Box className={classes.root}>
        {/* <Box> 
        <Button onClick={e=>socket.emit('createRoom',{user:{userName,userId}})}>Create Room</Button>
        <Button onClick={e=>socket.emit('joinRoom',{user:{userName,userId}})}>Join Room</Button>
        </Box> */}

         <Box className={classes.userDetails}>
            <Typography  variant="h5">
            CurrentUser: &nbsp;
            </Typography>
            <Typography variant="h5" className={classes.userName}>
              {userName}
            </Typography>
          </Box>
          <Typography variant="h5" style={{color:'black',margin:'10px'}}>Room: {roomId}</Typography>
            <ChatBox chatRoomData={chatRoomdata} currentUsername={userName}/>     
      </Box>
    );
  }
  