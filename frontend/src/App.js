import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import Header from './components/Header/Header';
import Body from './components/Body/Body';
import { Button,Box } from '@material-ui/core';
import { socket } from './utils/socket';
import ChatImg from './assets/chat.svg';
import ChatImg2 from './assets/chat2.svg';


const useStyles = makeStyles({
  dashboard: {
    height:'100vh',
    width:'100%',
    alignItems:'center',
    flexDirection:'column',
    justifyContent:'center',
    display: 'flex',
  },
  backgroundImg1:{
    width:'40%',
    height:'40%',
    position:'absolute',
    zIndex:'-1',
    opacity:'.2',
    top:"10%",
    left:"0%"
  },
  backgroundImg2: {
    width: '40%',
    height: '40%',
    position: 'absolute',
    zIndex: '-1',
    opacity: '0.2',
    bottom: "10%",
    right: "0%"
  },
introText:{
  fontSize:'1.5rem',
  fontWeight:'bold',
  color:'black',
  textAlign:'center',
  marginBottom:'1rem'

},
buttonGroup:{
  display:'flex',
  width: '100%',
  justifyContent:'center',
}
    
});
function App() {
  
  const [enableChat, setEnableChat] = React.useState(false);
  const [showError, setShowError] = React.useState(false);
  const userName=localStorage.getItem('userName');
  const userId=localStorage.getItem('userId');

  React.useEffect(()=>{
    socket.on("noRoomFound",()=>{
      setShowError(true);
       setEnableChat(false);
    })
  },[])

  const classes = useStyles();

  const createRoom=()=>{
    socket.emit('createRoom',{user:{userName,userId}});
    setEnableChat(true);
    
  }
  const joinRoom=()=>{
    socket.emit('joinRoom',{user:{userName,userId}});

    // setTimeout(()=>{
    //   if(!enableChat){
    //     setShowError(true);
    //   }
    //   else{
    //     setShowError(false);
    //   }
        if(!showError){
        setEnableChat(true);
        }
        else setEnableChat(false);
    //   }
    // },3000);
  }

  return (
    <>
   
      <Header/>
         {!enableChat &&
          <Box className={classes.dashboard} >
            <img src={ChatImg} className={classes.backgroundImg1} />
          <img src={ChatImg2} className={classes.backgroundImg2} />

            <Box>
              <Typography className={classes.introText}>Stranger Chat is great way to meet new people while keeping your privacy safe!!</Typography>
            </Box>
            {!enableChat && 
            <Box className={classes.buttonGroup}>
      
            
              <Button style={{background:"#58D1D1",margin:"0 2rem"}} onClick={e=>createRoom()}>Create Room</Button>
              <Button style={{background:"#58D1D1",margin:"0 2rem"}} onClick={e=> joinRoom()}>Join Room</Button>
        
            </Box>
            }
            {showError && <Typography style={{color:"red"}}>No room available, please try to create a room</Typography>}
          </Box>
        }
        {enableChat && <Body/>}
    </>
  );
}

export default App;
