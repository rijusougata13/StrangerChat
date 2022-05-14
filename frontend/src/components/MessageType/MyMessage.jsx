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
  
  export default function MyMessage() {
    const classes = useStyles();
    return (
      <Box className={classes.currentUserTextContainer}>
					<Box className={classes.textBubble}>
						Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequatur, ipsum! Dolores tempora ut reiciendis soluta numquam iure commodi laborum, porro debitis consequatur natus voluptatem architecto quos! Vel natus totam fugiat?
					</Box>
      </Box>
    );
  }
  