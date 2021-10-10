import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { Server } from 'socket.io'
import { createServer } from 'http'



dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000" || "http://localhost:3334",
    /*methods: ["GET", "POST"],
    credentials: true,*/
  }
});

io.on("connection", (socket) => {
  console.log(`${socket.id} connected`);
  
  
  socket.on("newUser", (data) => {
    data.payload.time = new Date();
    socket.broadcast.emit("message", data);
  });

  socket.on("message", (data) => {
   console.log(data.payload)
    socket.broadcast.emit("message", data);
  })

});




app.use(express.static('./public'));

// WARNING !!! app.listen(3000); will not work here, as it creates a new HTTP server
httpServer.listen(process.env.PORT, () =>  
  console.log(`app listening on port ${process.env.PORT}`)
);