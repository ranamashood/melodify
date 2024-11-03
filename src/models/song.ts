import { ObjectId } from "mongodb";

export default class Song {
  constructor(
    public filename: string,
    public title: string,
    public artist: string,
    public image: string,
    public thumbnail: string,
    public uploadedTime: number,
    public id?: ObjectId,
  ) {}
}
