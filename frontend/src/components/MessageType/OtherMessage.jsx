import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import Box from '@material-ui/core/Box';


const useStyles = makeStyles({
  
    currentUserTextContainer: {
        marginBottom: 20,
        flex: 0,
        display: 'flex',
        textAlign:'left',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        width: '100%',
        flexDirection:'column'
    },
    textBubble: {
        display: 'flex',
        maxWidth:'60%',
        padding: 10,
        backgroundColor: '#6d9217',
        justifyContent: 'flex-start',

        marginTop:10,
        marginBottom:10,
        marginLeft:20,
        marginRight:20,
        borderRadius: 8,
        textAlign: 'left',
        color:'white',
    },
    usernameText:{
        fontSize:13,
        marginLeft:20,
    
      },
    wrapper:{
        display: 'flex',
        flexDirection: 'column',
    }
  });
  
  export default function OtherMessage(props) {
    const classes = useStyles();
    const {username,message}=props;
    return (
      <Box className={classes.currentUserTextContainer}>
            <Box className={classes.wrapper}>
          <Box className={classes.usernameText}>
            {username}
          </Box>
					<Box className={classes.textBubble}>
						{message}
					</Box>
            </Box>
      </Box>
    );
  }
  