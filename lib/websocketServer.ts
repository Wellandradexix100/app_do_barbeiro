// lib/websocketServer.ts
import WebSocket from "ws";

const wss = new WebSocket.Server({ port: 8080 });

wss.on("connection", (ws) => {
  console.log("New client connected");

  ws.on("message", (message) => {
    console.log(`Received message => ${message}`);
  });

  // Function to broadcast messages to all connected clients
  const broadcast = (data: any) => {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(data));
      }
    });
  };

  // Example: broadcasting a message every 5 seconds
  setInterval(() => {
    const message = { type: "update", data: "New appointment!" };
    broadcast(message);
  }, 5000);
});

console.log("WebSocket server is running on ws://localhost:8080");
