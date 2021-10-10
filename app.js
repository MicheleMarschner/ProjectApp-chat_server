const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');
const { Server } = require('socket.io');
const { createServer } = require('http');
const formatMessage = require('./utils/formattingMessage.js');



dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:3334",
    /*methods: ["GET", "POST"],
    credentials: true,*/
  }
});
require('./router/chat.js')(io)

app.use(express.static(path.join(__dirname, 'public')));


/*
io.on("connection", (socket) => {
  console.log(`${socket.id} connected`);
  
  socket.on("joinRoom", (data) => {
    const { username } = data.payload;
    const text = `A wild ${username} appeared!`
    const event = "USER_JOIN_CHATROOM"
    const msgObj = formatMessage(event, text, username);
    socket.broadcast.emit("message", msgObj);
  })

  //anders wie joinRoom??
  socket.on("newUser", (data) => {
    const { username } = data.payload;
    const text = `A wild ${username} appeared!`
    const event = "NEW_USER";
    const msgObj = formatMessage(event, text, username);
    socket.broadcast.emit("message", msgObj);
  });

  // anders wie joinRoom??
  socket.on("createRoom", (data) => {
    const { username } = data.payload;
    const text = `New conversation created.`
    const event = "CREATE_CHATROOM"
    const msgObj = formatMessage(event, text, username);
    socket.broadcast.emit("message", msgObj);
  })

  socket.on("newMessage", (data) => {
    const { text, username } = data.payload;
    const event = "NEW_CHAT_MESSAGE"
    const msgObj = formatMessage(event, text, username);
    socket.broadcast.emit("message", msgObj);
  })

  socket.on("isTyping", (data) => {
    const { username } = data.payload;
    const text = `${username} is typing`;
    const event = "IS_TYPING"
    const msgObj = formatMessage(event, text, username);
    socket.broadcast.emit("message", msgObj);
  })

  socket.on("leaveRoom", (data) => {
    const { username } = data.payload;
    const text = `${username} left the conversation`
    const event = "USER_LEAVE_CHATROOM"
    const msgObj = formatMessage(event, text, username);
    socket.broadcast.emit("message", msgObj);
  })

  socket.on("deleteRoom", (data) => {
    const { username } = data.payload;
    const text = `Chatroom got deleted by ${username}.`
    const event = "DELETE_CHATROOM"
    const msgObj = formatMessage(event, text, username);
    socket.broadcast.emit("message", msgObj);
  })

  socket.on("disconnect", (data) => {
    console.log(`${socket.id} disconnected`)
    /*const { username } = data.payload;
    const text = `${username} disconnected.`
    const event = "USER_DISCONNECTED"
    const msgObj = formatMessage(event, text, username);
    socket.broadcast.emit("???", msgObj);*/
//   })

//});






// WARNING !!! app.listen(3000); will not work here, as it creates a new HTTP server
httpServer.listen(process.env.PORT, () =>  
  console.log(`app listening on port ${process.env.PORT}`)
);