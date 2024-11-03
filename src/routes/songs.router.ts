import express, { Request, Response } from "express";
import { collections } from "../services/database.service";
import Song from "../models/song";
import { ObjectId } from "mongodb";

export const songsRouter = express.Router();

songsRouter.use(express.json());

songsRouter.get("/", async (_req: Request, res: Response) => {
  try {
    const songs = await collections.songs.find<Song>({}).toArray();

    res.status(200).send(songs);
  } catch (error) {
    res.status(500).send(error instanceof Error ? error.message : "Error");
  }
});

songsRouter.get("/:id", async (req: Request, res: Response) => {
  const id = req?.params?.id;

  try {
    const query = { _id: new ObjectId(id) };
    const song = await collections.songs.findOne<Song>(query);

    if (song) {
      res.status(200).send(song);
    }
  } catch (error) {
    res
      .status(404)
      .send(`Unable to find matching document with id: ${req.params.id}`);
  }
});

songsRouter.get("/filename/:filename", async (req: Request, res: Response) => {
  const filename = req?.params?.filename;

  try {
    const query = { filename };
    const song = await collections.songs.findOne<Song>(query);

    if (song) {
      res.status(200).send(song);
    }
  } catch (error) {
    res
      .status(404)
      .send(`Unable to find matching document with id: ${req.params.id}`);
  }
});

songsRouter.post("/", async (req: Request, res: Response) => {
  try {
    const newSong = req.body as Song;
    const result = await collections.songs.insertOne(newSong);

    result
      ? res
          .status(201)
          .send(`Successfully created a new song with id ${result.insertedId}`)
      : res.status(500).send("Failed to create a new song.");
  } catch (error) {
    res.status(400).send(error instanceof Error ? error.message : "Error");
  }
});

songsRouter.put("/:id", async (req: Request, res: Response) => {
  const id = req?.params?.id;

  try {
    const updatedSong: Song = req.body as Song;
    const query = { _id: new ObjectId(id) };

    const result = await collections.songs.updateOne(query, {
      $set: updatedSong,
    });

    result
      ? res.status(200).send(`Successfully updated song with id ${id}`)
      : res.status(304).send(`Song with id: ${id} not updated`);
  } catch (error) {
    res.status(400).send(error instanceof Error ? error.message : "Error");
  }
});

songsRouter.delete("/:id", async (req: Request, res: Response) => {
  const id = req?.params?.id;

  try {
    const query = { _id: new ObjectId(id) };
    const result = await collections.songs.deleteOne(query);

    if (result && result.deletedCount) {
      res.status(202).send(`Successfully removed song with id ${id}`);
    } else if (!result) {
      res.status(400).send(`Failed to remove song with id ${id}`);
    } else if (!result.deletedCount) {
      res.status(404).send(`Song with id ${id} does not exist`);
    }
  } catch (error) {
    res.status(400).send(error instanceof Error ? error.message : "Error");
  }
});
