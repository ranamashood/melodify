import express, { Application, Request, Response } from "express";
import { Server } from "socket.io";
import http from "http";
import fs from "fs";
import cors from "cors";

const PORT = 5000;

const app: Application = express();
const server: http.Server = http.createServer(app);
const io: Server = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.use(cors());

app.get("/get-all-songs", (req: Request, res: Response) => {
  fs.readdir("./public/uploads/", (err, songs) => res.json({ songs }));
});

app.use("/songs", express.static("public/uploads"));

io.on("connection", (socket) => {
  io.emit("sockets", Array.from(io.sockets.sockets.keys()));

  socket.on("disconnect", () => {
    io.emit("sockets", Array.from(io.sockets.sockets.keys()));
  });

  socket.on("current-song", (currentSong: string) => {
    io.emit("new-song", currentSong);
  });
});

server.listen(PORT);
