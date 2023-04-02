import React, { useEffect, useState } from "react";

const Chat = () => {
  const [ws, setWs] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("rastanaute"); // votre pseudo IRC
  const [channel, setChannel] = useState("#ZionSounD"); // nom de la channel à laquelle vous voulez vous connecter

  const ircConnection = () => {
    if (!isConnected) {
      const newWs = new WebSocket("wss://irc.zionsound.net:9600");

      newWs.addEventListener("open", function (event) {
        console.log("WebSocket IRC connecté");
        setIsConnected(true);
        newWs.send(`NICK ${username + Math.floor(Math.random() * 100)}`);
        newWs.send(`USER ${username} 8 * :${username}`);
        newWs.send(`JOIN ${channel}`);
      });

      newWs.addEventListener("close", function (event) {
        console.log("WebSocket IRC fermé");
        setIsConnected(false);
      });

      newWs.addEventListener("error", function (event) {
        console.error("WebSocket IRC erreur:", event);
      });

      newWs.addEventListener("message", function (event) {
        console.log("Message reçu:", event.data);
        setMessages((prevMessages) => [...prevMessages, event.data]);
      });

      setWs(newWs);
    }
  };

  useEffect(() => {
    ircConnection();

    const interval = setInterval(() => {
      if (!isConnected) {
        console.log("Trying to reconnect...");
        ircConnection();
      }
    }, 10000);

    return () => {
      clearInterval(interval);
      if (ws) {
        ws.close();
        setIsConnected(false);
      }
    };
  }, [channel, username, isConnected]);

  const handleMessageSubmit = (event) => {
    event.preventDefault();
    const messageInput = event.target.elements.message;
    const message = messageInput.value.trim();
    if (message) {
      ws.send(`PRIVMSG ${channel} :${message}`);
      messageInput.value = "";
    }
  };

  return (
    <div>
      <h1>Web IRC Chat</h1>
      {isConnected ? (
        <>
          <p>Connecté en tant que {username}</p>
          <p>Connecté à la chaîne {channel}</p>
        </>
      ) : (
        "déconnecté"
      )}
      <form onSubmit={handleMessageSubmit}>
        <input type="text" name="message" placeholder="Envoyer un message" />
        <button type="submit">Envoyer</button>
      </form>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
    </div>
  );
};

export default Chat;
