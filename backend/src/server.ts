import app from "./app";
import dotenv from "dotenv";
import http from "http"
import { Server } from "socket.io";
import handleSocketConnection from "./lib/handleSocketConnection";

dotenv.config();

const PORT = 5000;

const server = http.createServer(app);

export const io = new Server(server,{
  cors:{
    origin:"*"
  }
})

handleSocketConnection(io);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
