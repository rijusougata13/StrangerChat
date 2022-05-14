import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import Box from '@material-ui/core/Box';


const useStyles = makeStyles({
  
    currentUserTextContainer: {
        marginBottom: 20,
        flex: 0,
        display: 'flex',
        textAlign:'center',
        alignItems: 'center',
        justifyContent: 'ceenter',
        width: '100%',
    },
    textBubble: {
        display: 'flex',
        maxWidth:'60%',
        padding: 10,
        backgroundColor: '#f2f2f2',
        justifyContent: 'ceenter',
        marginTop:10,
        marginBottom:10,
        marginLeft:'auto',
        marginRight:'auto',
        borderRadius: 8,
        fontSize: '.8rem',
        textAlign: 'center',
        color:'black',
    },
    usernameText:{
        fontSize:9
    }
  });
  
  export default function NotificationMessage(props) {
    const classes = useStyles();
    const {message}=props;
    return (
      <Box className={classes.currentUserTextContainer}>
            <Box className={classes.textBubble}>
               {message}
            </Box>
      </Box>
    );
  }
  