import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({
  port: 8080,
});

console.log("WebSocket server running on ws://localhost:8080");

wss.on("connection", (socket) => {
  socket.on("message", (message) => {
    wss.clients.forEach((client) => {
      //(client !== socket) can't be used.
      // Broadcasting to all connected clients because the PatientPanel and StaffPanel,
      // currently share the same WebSocket connection in this application.
      if (client.readyState === WebSocket.OPEN) {
        client.send(message.toString());
      }
    });
  });
  console.log("A client connected");
});