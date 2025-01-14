import * as mongoDB from "mongodb";
import "dotenv/config";
import Song from "../models/song";

export const collections = {
  songs: {} as mongoDB.Collection<Song>,
};

export async function connectToDatabase() {
  const client: mongoDB.MongoClient = new mongoDB.MongoClient(
    process.env.DB_CONN_STRING || "",
  );

  await client.connect();

  const db: mongoDB.Db = client.db(process.env.DB_NAME);

  const songsCollection: mongoDB.Collection<Song> = db.collection("songs");

  collections.songs = songsCollection;

  console.log(`Successfully connected to database: ${db.databaseName}`);
}
