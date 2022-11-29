import { MongoClient } from "mongodb";
import dotenv from "dotenv";

let client = null;
let noteDb = null;
let userDb = null;
dotenv.config();

const initializeDbConnection = async () => {
  client = await MongoClient.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  noteDb = await client.db("note-app-db").collection("note");
  userDb = await client.db("note-app-db").collection("users");
};

export { noteDb, initializeDbConnection, userDb };
