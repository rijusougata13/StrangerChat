import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Box from '@material-ui/core/Box';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';

import {socket} from '../../utils/socket';
import MyMessage from '../MessageType/MyMessage';
import Typography from '@material-ui/core/Typography';
import NotificationMessage from '../MessageType/NotificationMessage';
import OtherMessage from '../MessageType/OtherMessage';

const useStyles = makeStyles({
  root: {
    border:'none',
    boxShadow: 'none',
    width:'70%',
    background: 'white',
    height:'80%',
    display: 'flex',
    flexDirection: 'column',
},
    chatSection:{
        display: 'flex',
        flexDirection: 'column',
        padding: '0',
        margin: '0',
        border: '0',
        overflow: 'scroll',
        height: '80%',
        background: '#f2f2f2'
    },
    textField:{
        width: '100%',
    },
    button:{
        background: 'green',
    }
    
});

export default function ChatBox(props) {
  const classes = useStyles();
  const [initialLoad,setInitialLoad]=React.useState(true);
  const messageEndRef=React.useRef(null);
  const autoScrollOffset = 100;
  
  const {chatRoomData,currentUsername}=props;
  var roomId;
  React.useEffect(()=>{
    if(messageEndRef.current){
      scrollToBottom();
    }
   roomId=localStorage.getItem('roomId');

  },[messageEndRef.current,chatRoomData]);

  const sendMessage=()=>{
    let message=document.getElementById('message').value;
    socket.emit('SendMessage',{message,userName:currentUsername,roomId});
    document.getElementById('message').value='';
    shouldScrollToBottom();
  };

  const shouldScrollToBottom=()=>{
    //If user is near the bottom of the chat, automatically navigate them to bottom when new chat message/notification appears
		if (messageEndRef.current.scrollHeight - messageEndRef.current.scrollTop < messageEndRef.current.offsetHeight + autoScrollOffset){
			scrollToBottom()
		}

		//Navigate to end of chat when entering chat the first time
		if(initialLoad){
			scrollToBottom()
      setInitialLoad(false);
		}
	}

	const scrollToBottom=()=>{
		//Scrolls user to end of chat message window
    setTimeout(()=>{
		messageEndRef.current.scrollTop = messageEndRef.current.scrollHeight;
    },100);
	}

  return (
    <Card className={classes.root}>
      <Box className={classes.chatSection} ref={messageEndRef}>
      	{chatRoomData.map( (messageData, index) => {
            console.log(messageData.userName,currentUsername);
            if(messageData.userName == currentUsername) {
			    			return <MyMessage key={index} username={messageData.userName} message={messageData.message}/>
			    		} else if (messageData.userName == '') {
			    			return <NotificationMessage key={index} username={messageData.userName} message={messageData.message}/>
			    		} else {
			    			return <OtherMessage key={index} username={messageData.userName} message={messageData.message}/>
			    		}
            })}
      </Box>
      <CardActions>
      <TextField id="message" label="Send Message"  className={classes.textField} 
      // onKeyPress={e=>sendMessage}
      />
      <Button variant="contained" color="primary" className={classes.button}  onClick={sendMessage}>
        Send
      </Button>
      </CardActions>
    </Card>
  );
}
