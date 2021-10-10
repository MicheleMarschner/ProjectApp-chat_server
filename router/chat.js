import express from 'express';
const router = express.Router();


router.use('/', (req, res, next) => {
    console.log("server")

    const io = req.app.get('socketio');

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
}) 


export default router;