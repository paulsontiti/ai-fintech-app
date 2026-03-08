export default function handleSocketConnection(io:any) {
  io.on("connection", (socket: any) => {
    console.log("User connected:", socket.id);

    socket.on("join-room", (userId: string) => {
      socket.join(userId);
      console.log(`User joined room: ${userId}`);
    });
    socket.on("disconnect", () => {
    
      console.log(`User disconnected: ${socket.id}`);
    });
  });
}
