const express=require('express');
const app=express();
const http = require('http');
const port=process.env.PORT || 5000;
const bodyParser=require('body-parser');
const cors=require('cors');
const uuid=require('uuid-random');

app.use(bodyParser.json());
app.use(
    cors({
      origin: ['https://americanairlines.com'],
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
    })
  );

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
    }
);

app.get('/',(req,res)=>{
    res.send('Server Running');
}
);

// const server=app.listen(port);

const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"]
    }
  });

httpServer.listen(5000, '0.0.0.0', () => console.log('Listening on port 5000'));

var chatRoom=[];
var chatRoomData=[];

io.on('connection',(socket)=>{
  var currentRoomId;
  var currentUserData;
    console.log('User connected');

    sendUpdatedChatRoomData(socket);  
    socket.on('disconnect',()=>{
        console.log('User disconnected');
      
    }
    );

    socket.on("createRoom",async(data)=>{
        var roomId=uuid();
        currentRoomId=roomId;
        var room={
            id:roomId,
            name:"",
            users:[data.user],
            messages:[],          
          }
        
        chatRoom.push(room);
        socket.join(roomId);
        const sendData={
            roomId:roomId,
            user:data.user,
        }
        currentUserData=data.user;
        const userData=data.user;
        var enteredRoomMessage = {message: `${userData.userName} has entered the chat`, userName: "", userID: 0, timeStamp: null}
        
        var room=undefined;
        for (let i = 0; i < chatRoom.length; i++) {
          if (chatRoom[i].id == roomId) {
              room=chatRoom[i];
            break;
          }
        }
        socket.emit("setRoomId",roomId);
        if(room){
            room.messages.push(enteredRoomMessage);
            socket.emit("RetrieveChatRoomData", room.messages);
          }


      });

    socket.on("joinRoom",data=>{
        var room=undefined;
        for (let i = 0; i < chatRoom.length; i++) {
          if (chatRoom[i].users.length < 2) {
            chatRoom[i].users.push(data.user);
            room=chatRoom[i];
            break;
          }
        }
        if(room){
            const roomId=room.id;
          socket.emit("setRoomId",roomId);
        console.log("connected",room);

            currentRoomId=roomId;
            currentUserData=data.user;
            socket.join(roomId);
            
          var enteredRoomMessage = {message: `${data.user.userName} has entered the chat`, userName: "", userID: 0, timeStamp: null}
          room.messages.push(enteredRoomMessage);
          socket.emit("RetrieveChatRoomData", room.messages);
          socket.broadcast.emit("RetrieveChatRoomData", room.messages);
        }
        else{
          socket.emit('noRoomFound');
        }
     }); 
    

    socket.on("SendMessage",(data)=>{
        var roomId=data.roomId;
        var room=undefined;
        for (let i = 0; i < chatRoom.length; i++) {
          if (chatRoom[i].id===roomId) {
            room=chatRoom[i];
            break;
          }
        }
        if(room){
            var roomMessage = {message: data.message, userName: data.userName, userID: 0, timeStamp: null}
            room.messages.push(roomMessage);
            console.log("room",room);
            socket.emit("RetrieveChatRoomData", room.messages);
            socket.broadcast.emit("RetrieveChatRoomData", room.messages);
        }
      });

    socket.on("userEnteredRoom",(data)=>{
        const userData=data.user;
        var enteredRoomMessage = {message: `${userData.userName} has entered the chat`, userName: "", userID: 0, timeStamp: null}
        
        var room=undefined;
        for (let i = 0; i < chatRoom.length; i++) {
          if (chatRoom[i].id===roomId) {
            room=chatRoom[i];
            break;
          }
        }

        if(room){
            room.messages.push(data.message);
            socket.to(roomId).emit("RetrieveChatRoomData", room.messages);
            sendUpdatedChatRoomData(socket,roomId);

          }
        


    });

    socket.on("CreateUserData",()=>{
        console.log("User created");
        let userId=uuid();
        let username="user"+(Math.floor(Math.random() * 1000)).toString();
        let userData={userId,username};
        socket.emit("setUserData",userData);
    })

    socket.on('disconnecting', (data) => {
        console.log("Client disconnecting...");
        if(currentUserData){
          var leaveRoomMessage = {message: `${currentUserData.userName} has left the chat`, userName: "", userID: 0, timeStamp: null}
          
          var room=undefined;
          for (let i = 0; i < chatRoom.length; i++) {
            if (chatRoom[i].id===currentRoomId) {
              room=chatRoom[i];
              break;
            }
          }
          
          if(room){
              room.users.splice(room.users.indexOf(currentUserData),1);
              if(room.users.length===0){
                  chatRoom.splice(chatRoom.indexOf(room),1);
              }
              console.log("room",chatRoom);
              room.messages.push(leaveRoomMessage);
              socket.broadcast.emit("RetrieveChatRoomData", room.messages);
              
            }
          }
    
      });
    
      socket.on('ClearChat', () => {
        chatRoomData=[]
        sendUpdatedChatRoomData(socket);

      })
   
    socket.on('typing',(data)=>{
        socket.broadcast.emit('typing',data);
    }
    );
}
);

function sendUpdatedChatRoomData(client,roomId,message){
    client.to(roomId).emit("RetrieveChatRoomData", message)
    // client.to(roomId).broadcast.emit("RetrieveChatRoomData", message)
  }



