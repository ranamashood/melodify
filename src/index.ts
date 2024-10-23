import express, { Application, Request, Response } from "express";
import { Server } from "socket.io";
import http from "http";
import fs from "fs";
import cors from "cors";

const PORT = 5000;

const app: Application = express();
const server: http.Server = http.createServer(app);
const io: Server = new Server(server);

app.use(cors());

app.get("/get-all-songs", (req: Request, res: Response) => {
  fs.readdir("./public/uploads/", (err, songs) => res.json({ songs }));
});

app.use("/songs", express.static("public/uploads"));

io.on("connection", (socket) => {
  console.log("Socket connected.");
});

server.listen(PORT, () =>
  console.log(`Server running on port http://localhost:${PORT}`),
);
