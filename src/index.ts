import express, { Application, Request, Response } from "express";
import { Server } from "socket.io";
import http from "http";
import fs from "fs";
import { promisify } from "util";
import cors from "cors";
import { loadMusicMetadata } from "music-metadata";
import { SongInterface } from "./models";

const PORT = 5000;

const app: Application = express();
const server: http.Server = http.createServer(app);
const io: Server = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.use(cors());

app.get("/get-all-songs", async (req: Request, res: Response) => {
  const songs: SongInterface[] = [];

  const readdir = promisify(fs.readdir);

  const songsPath: string[] = await readdir("./public/uploads/");

  const musicMetadata = await loadMusicMetadata();

  for (const songPath of songsPath) {
    const songFullPath = `./public/uploads/${songPath}`;
    const metadata = await musicMetadata.parseFile(songFullPath);
    let creationTime: number = 0;

    fs.stat(songFullPath, (_, stats) => {
      creationTime = stats.ctimeMs;

      const song: SongInterface = {
        filename: songPath,
        title: metadata.common.title ?? "Unknown",
        artist: metadata.common.artist ?? "Unknown",
        image: metadata.common.picture
          ? `data:${metadata.common.picture[0].format};base64,${Buffer.from(metadata.common.picture[0].data).toString("base64")}`
          : "",
        uploadedTime: creationTime,
      };
      songs.push(song);
    });
  }

  res.json({ songs });
});

app.get("/song-metadata/:songName", async (req: Request, res: Response) => {
  const { songName } = req.params;
  const songPath = `./public/uploads/${songName}`;
  const musicMetadata = await loadMusicMetadata();
  const metadata = await musicMetadata.parseFile(songPath);
  let creationTime: number = 0;

  fs.stat(songPath, (_, stats) => {
    creationTime = stats.ctimeMs;

    const song: SongInterface = {
      filename: songName,
      title: metadata.common.title ?? "Unknown",
      artist: metadata.common.artist ?? "Unknown",
      image: metadata.common.picture
        ? `data:${metadata.common.picture[0].format};base64,${Buffer.from(metadata.common.picture[0].data).toString("base64")}`
        : "",
      uploadedTime: creationTime,
    };

    res.json(song);
  });
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
