const socketConnection = (server) => {
  const { Server } = require("socket.io");
  const io = new Server(server);

  io.on("connection", (socket) => {
    console.log("user conected");
    socket.on("chat message", (msg) => {
      io.emit("chat message", msg);
    });
  });
};

module.exports = socketConnection;
