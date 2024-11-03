import * as mongoDB from "mongodb";
import "dotenv/config";

export const collections = {
  songs: {} as mongoDB.Collection,
};

export async function connectToDatabase() {
  const client: mongoDB.MongoClient = new mongoDB.MongoClient(
    process.env.DB_CONN_STRING || "",
  );

  await client.connect();

  const db: mongoDB.Db = client.db(process.env.DB_NAME);

  const songsCollection: mongoDB.Collection = db.collection("songs");

  collections.songs = songsCollection;

  console.log(
    `Successfully connected to database: ${db.databaseName} and collection: ${songsCollection.collectionName}`,
  );
}