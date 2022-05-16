import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { socket } from '../../utils/socket';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'space-between',
  },
  menuButton: {
    marginRight: theme.spacing(2),
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
}));

export default function Header() {
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
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar variant="dense" style={{display:"flex",justifyContent:"space-between"}}>
          
          <Typography variant="h6" color="inherit">
            Stranger Chat
          </Typography>
          <Box className={classes.userDetails}>
         <Typography  variant="h5">
            CurrentUser: &nbsp;
            </Typography>
            <Typography variant="h5" className={classes.userName}>
              {userName}
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
}
