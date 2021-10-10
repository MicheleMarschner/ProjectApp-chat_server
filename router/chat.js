




module.exports = (io) => {
  console.log('IO: ', io);
    /*const io = req.app.get('socketio');*/

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
}


