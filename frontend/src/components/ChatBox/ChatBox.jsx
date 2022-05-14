import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Box from '@material-ui/core/Box';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';

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
        Height: '70%',
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
  const {chatRoomData,currentUsername}=props;

  return (
    <Card className={classes.root}>
      <Box className={classes.chatSection}>
      	{chatRoomData.map( (messageData, index) => {

						if(messageData.username == currentUsername) {
			    			return <MyMessage key={index} username={messageData.username} message={messageData.message}/>
			    		} else if (messageData.username == '') {
			    			return <NotificationMessage key={index} username={messageData.username} message={messageData.message}/>
			    		} else {
			    			return <OtherMessage key={index} username={messageData.username} message={messageData.message}/>
			    		}
            })}
      </Box>
      <CardActions>
      <TextField id="standard-basic" label="Send Message"  className={classes.textField}/>
      <Button variant="contained" color="primary" className={classes.button} href="#contained-buttons">
        Send
      </Button>
      </CardActions>
    </Card>
  );
}
