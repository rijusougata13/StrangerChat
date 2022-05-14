import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import Box from '@material-ui/core/Box';


const useStyles = makeStyles({
  
    currentUserTextContainer: {
        marginBottom: 20,
        flex: 0,
        display: 'flex',
        textAlign:'right',
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: '100%',
    },
    textBubble: {
        display: 'flex',
        maxWidth:'60%',
        padding: 10,
        backgroundColor: '#0071BC',
        justifyContent: 'flex-end',

        marginTop:10,
        marginBottom:10,
        marginLeft:20,
        marginRight:20,
        borderRadius: 8,
        textAlign: 'right',
        color:'white',
    },
    usernameText:{
        fontSize:9
    }
  });
  
  export default function MyMessage(props) {
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
  