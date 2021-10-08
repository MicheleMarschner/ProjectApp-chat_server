import express from 'express'
import dotenv from 'dotenv'
import { Server } from 'socket.io'
import { createServer } from "http"


dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

io.on("connection", (socket) => {
  console.log(socket.id);
  console.log("socket server connected")

  socket.on("newUser", (data) => {
    const time = new Date().toLocaleString();
    data.payload.time = time;
    socket.broadcast.emit("message", data);
  });

  socket.on("message", (data) => {
    socket.broadcast.emit("message", data);
  })

});




app.use(express.static('./public'));

// WARNING !!! app.listen(3000); will not work here, as it creates a new HTTP server
httpServer.listen(process.env.PORT, () =>  
  console.log(`app listening on port ${process.env.PORT}`)
);