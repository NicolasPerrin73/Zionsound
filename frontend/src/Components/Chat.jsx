import React from "react";

const Chat = () => {
  const socket = new WebSocket("ws://localhost:8084");
  // Lorsque la connexion est établie
  socket.addEventListener("open", function (event) {
    console.log("Connected to WebSocket server");
  });

  // Lorsque le client reçoit un message du serveur
  socket.addEventListener("message", function (event) {
    console.log("Received message from server:", event.data);
  });

  // Lorsque la connexion est fermée
  socket.addEventListener("close", function (event) {
    console.log("Disconnected from WebSocket server");
  });
  socket.onmessage = function (event) {
    const message = JSON.parse(event.data);
    console.log("Received message:", message);
  };
  return <div></div>;
};

export default Chat;
