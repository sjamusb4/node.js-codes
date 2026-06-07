const express = require("express");
const fs = require("fs").promises;
const http = require("http"); // 1. Import the native HTTP module
const { WebSocketServer } = require("ws");

const app = express();
const server = http.createServer(app); // 2. Wrap the Express app in an HTTP server

app.get("/", (req, res) => {
  fs.readFile("./index.html")
    .then((data) => {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      res.end();
    })
    .catch((err) => {
      console.log("Error : ", err);
      res.status(500).send("Internal Server Error");
    });
});

// 3. Pass the raw HTTP server to the WebSocket server
const wsServer = new WebSocketServer({ server: server });

wsServer.on("connection", (websocket) => {
  console.log("WebSocket Connection....");

  websocket.on("message", (data) => {
    console.log("Client : ", data.toString());
    //websocket.send(data.toString()); // Echo back a message to the client

    // will do broadcasting to all clients
    wsServer.clients.forEach((client) => {
      client.send(data.toString());
    });
  });
});

// 4. Important: Listen on the HTTP server, NOT the app instance
server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
