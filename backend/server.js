const http = require("http");
const app = require("./app");
const https = require("https");
const path = require("path");
const fs = require("fs");
const WebSocket = require("ws");
const NodeMediaServer = require("node-media-server");
const ffmpeg = require("ffmpeg");

const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
const port = normalizePort(process.env.PORT || "8084");
app.set("port", port);

const errorHandler = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === "string" ? "pipe " + address : "port: " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges.");
      process.exit(1);
    case "EADDRINUSE":
      console.error(bind + " is already in use.");
      process.exit(1);
    default:
      throw error;
  }
};

//HTTP Server

const HttpServer = http.createServer(app);

HttpServer.on("error", errorHandler);
HttpServer.on("listening", () => {
  const address = HttpServer.address();
  const bind = typeof address === "string" ? "pipe " + address : "port " + port;
  console.log("Listening on " + bind);
});

HttpServer.listen(port);

//HTTPS Server

const keyPath = "/etc/letsencrypt/archive/zionsound.fr/privkey1.pem";
const certPath = "/etc/letsencrypt/archive/zionsound.fr/cert1.pem";

const sslServer = https.createServer({ key: fs.readFileSync(keyPath), cert: fs.readFileSync(certPath) }, app);

sslServer.listen(8086, () => console.log("Ssl server listening 8086"));

//Node Media Server

const config = {
  logType: 3,
  logFile: "./media",
  rtmp: {
    port: 8080,
    chunk_size: 60000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60,

    ssl: {
      port: 8082,
      key: "/etc/letsencrypt/archive/zionsound.fr/privkey1.pem",
      cert: "/etc/letsencrypt/archive/zionsound.fr/cert1.pem",
    },
  },
  http: {
    port: 8081,
    mediaroot: "./media",
    webroot: "./www",
    allow_origin: "*",
    api: true,
  },
  https: {
    port: 8443,
    key: "/etc/letsencrypt/archive/zionsound.fr/privkey1.pem",
    cert: "/etc/letsencrypt/archive/zionsound.fr/cert1.pem",
  },
  /*auth: {
    api: true,
    api_user: "admin",
    api_pass: "admin",
    play: false,
    publish: false,
    secret: "nodemedia2017privatekey",
  },*/
  trans: {
    ffmpeg: "/usr/bin/ffmpeg",
    tasks: [
      {
        app: "live",
        vc: "copy",
        ac: "copy",
        hls: true,
        hlsFlags: "[hls_time=2:hls_list_size=3:hls_flags=delete_segments]",
      },
    ],
  },
  fission: {
    ffmpeg: "/usr/bin/ffmpeg",
    tasks: [
      {
        rule: "live/*",
        model: [
          {
            ab: "96k",
            vb: "600k",
            vs: "640x360",
            vf: "30",
          },
        ],
      },
    ],
  },
};

let nms = new NodeMediaServer(config);
nms.run();

// Méthode postPublish
nms.on("postPublish", (id, StreamPath, args) => {
  console.log("Un flux a été publié !");
  // Le flux en direct est actif
  liveStreamIsActive = true;
  // Envoyer le message de statut de flux en direct aux clients connectés
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ isLiveStreamActive: liveStreamIsActive }));
    }
  });
});

// Méthode donePublish
nms.on("donePublish", (id, StreamPath, args) => {
  console.log("Le flux en direct a été arrêté !");
  // Le flux en direct est inactif
  liveStreamIsActive = false;
  // Envoyer le message de statut de flux en direct aux clients connectés
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ isLiveStreamActive: liveStreamIsActive }));
    }
  });
});

//Websocket Server

const server = https.createServer({ key: fs.readFileSync(keyPath), cert: fs.readFileSync(certPath) }, app);
const wss = new WebSocket.Server({ server: server });
server.listen(8085, () => console.log("WSHTTPSserver is running on port 8085"));

let liveStreamIsActive = false;

app.get("/live-stream-status", (req, res) => {
  res.send({ isLiveStreamActive: liveStreamIsActive });
});

// Gérer les connexions WebSocket entrantes
wss.on("connection", (ws) => {
  console.log("Client connecté !");
  // Envoyer le message de statut de flux en direct au client nouvellement connecté
  ws.send(JSON.stringify({ isLiveStreamActive: liveStreamIsActive }));
});

//shoutcast proxy server https
//web.zionsound.fr

const keyPath2 = "/etc/letsencrypt/archive/web.zionsound.fr/privkey1.pem";
const certPath2 = "/etc/letsencrypt/archive/web.zionsound.fr/cert1.pem";

const proxy = https.createServer({ key: fs.readFileSync(keyPath2), cert: fs.readFileSync(certPath2) }, app);

proxy.listen(8090, () => console.log("proxy https server listening 8090"));
