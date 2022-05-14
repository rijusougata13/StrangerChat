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

const server1=http.createServer(app);

const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"]
    }
  });

httpServer.listen(5000);

var chatRoomData=[];
var connectedClients={};

io.on('connection',(socket)=>{
    console.log('User connected');
    sendUpdatedChatRoomData(socket);  
    socket.on('disconnect',()=>{
        console.log('User disconnected');
    }
    );


    socket.on("SendMessage",(data)=>{
        console.log("data",data);
        chatRoomData.push(data);
        sendUpdatedChatRoomData(socket);
    }
    );

    socket.on("userEnteredRoom",(userData)=>{
        console.log(userData);
        var enteredRoomMessage = {message: `${userData.username} has entered the chat`, username: "", userID: 0, timeStamp: null}
        console.log(enteredRoomMessage);
        chatRoomData.push(enteredRoomMessage);
        sendUpdatedChatRoomData(socket);

    })

    socket.on("CreateUserData",()=>{
        console.log("User created");
        let userId=uuid();
        let username="user"+(Math.floor(Math.random() * 1000)).toString();
        let userData={userId,username};
        socket.emit("setUserData",userData);
    })

    socket.on('disconnecting', (data) => {
        console.log("Client disconnecting...");
    
        if(connectedClients[socket.id]){
          var leftRoomMessage = {message: `${connectedClients[socket.id].username} has left the chat`, username: "", userID: 0, timeStamp: null}
          chatRoomData.push(leftRoomMessage)
          sendUpdatedChatRoomData(socket)
          delete connectedClients[socket.id]
        }
    
      });
    
      socket.on('ClearChat', () => {
        chatRoomData=[]
        console.log(chatRoomData)
        sendUpdatedChatRoomData(socket);

      })
    socket.on('chat',(data)=>{
        console.log("hi")
        io.emit('chat',data);
    }
    );
    socket.on('typing',(data)=>{
        socket.broadcast.emit('typing',data);
    }
    );
}
);

function sendUpdatedChatRoomData(client){
    client.emit("RetrieveChatRoomData", chatRoomData)
    client.broadcast.emit("RetrieveChatRoomData", chatRoomData)
  }



