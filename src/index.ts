import express, { Application, Request, Response } from "express";
import { Server } from "socket.io";
import http from "http";
import fs from "fs";
import fsPromise from "fs/promises";
import { promisify } from "util";
import cors from "cors";
import { loadMusicMetadata } from "music-metadata";
import { SongInterface } from "./models";
import { collections, connectToDatabase } from "./services/database.service";
import "dotenv/config";
import sharp from "sharp";
import Song from "./models/song";

const PORT = 5000;

const app: Application = express();
const server: http.Server = http.createServer(app);
const io: Server = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.use(cors());

app.get("/songs", async (req: Request, res: Response) => {
  const songs = await collections.songs.find<Song>({}).toArray();
  res.json(songs);
});

app.get("/songs/:songName", async (req: Request, res: Response) => {
  const { songName } = req.params;

  const song = await collections.songs.findOne<Song>({ filename: songName });
  res.json(song);
});

// TODO: switch from songName to id
// app.get("/song-metadata/:id", async (req: Request, res: Response) => {
//   const { id } = req.params;
//
//   const response = await axios.get<Song>(
//     `${process.env.API_URL}/api/songs/${id}`,
//   );
//   res.json(response.data);
// });

app.use("/uploads/songs", express.static("public/uploads/songs"));
app.use("/uploads/images", express.static("public/uploads/images"));

io.on("connection", (socket) => {
  io.emit("sockets", Array.from(io.sockets.sockets.keys()));

  socket.on("disconnect", () => {
    io.emit("sockets", Array.from(io.sockets.sockets.keys()));
  });

  socket.on("current-song", (currentSong: string) => {
    io.emit("new-song", currentSong);
  });

  socket.on("pause", () => io.emit("pause"));
  socket.on("play", () => io.emit("play"));

  socket.on("change-seek", (newSeek: number) => io.emit("new-seek", newSeek));
});

connectToDatabase().then(() => {
  const updateDatabase = async () => {
    const lastUpdated: number = 0;

    const readdir = promisify(fs.readdir);

    const songsPath: string[] = await readdir("./public/uploads/songs/");
    const filteredSongsPath: [string, number][] = [];

    for (const songPath of songsPath) {
      const songFullPath = `./public/uploads/songs/${songPath}`;
      const stats = await fsPromise.stat(songFullPath);
      const creationTime = stats.ctimeMs;

      if (creationTime > lastUpdated) {
        filteredSongsPath.push([songPath, creationTime]);
      }
    }

    const musicMetadata = await loadMusicMetadata();

    for (const [songPath, creationTime] of filteredSongsPath) {
      const songFullPath = `./public/uploads/songs/${songPath}`;
      const metadata = await musicMetadata.parseFile(songFullPath);

      let imagePath: string = "";
      let thumbnailPath: string = "";

      if (metadata.common.picture) {
        const songName: string =
          songPath.substring(0, songPath.lastIndexOf(".")) || songPath;

        const imageBuffer: Buffer = Buffer.from(
          metadata.common.picture[0].data,
        );
        const imageFormat: string =
          metadata.common.picture[0].format.split("/")[1];

        imagePath = `./public/uploads/images/${songName}.${imageFormat}`;
        thumbnailPath = `./public/uploads/images/${songName}_thumbnail.${imageFormat}`;

        sharp(imageBuffer).toFile(imagePath);
        sharp(imageBuffer).resize(32, 32).toFile(thumbnailPath);
      }

      const song: SongInterface = {
        filename: songPath,
        title: metadata.common.title ?? "Unknown",
        artist: metadata.common.artist ?? "Unknown",
        image: imagePath.replace("./public/uploads/images/", ""),
        thumbnail: thumbnailPath.replace("./public/uploads/images/", ""),
        duration: metadata.format.duration || 0,
        uploadedTime: creationTime,
      };

      await collections.songs.insertOne(song);
    }
  };

  // updateDatabase();
});

server.listen(PORT);
