const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  }
});

let waitingPlayer = null;

io.on("connection", (socket) => {
  if (waitingPlayer) {
    const room = `game-${waitingPlayer.id}-${socket.id}`;
    socket.join(room);
    waitingPlayer.join(room);
    io.to(room).emit("startGame", { room });
    waitingPlayer = null;
  } else {
    waitingPlayer = socket;
  }

  socket.on("play", ({ room, index, player }) => {
    io.to(room).emit("update", { index, player });
  });

  socket.on("disconnect", () => {
    if (waitingPlayer === socket) {
      waitingPlayer = null;
    }
  });
});
httpServer.listen(1337, () => console.log("port 1337"));
