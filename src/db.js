import { MongoClient } from "mongodb";
import dotenv from "dotenv";

let client = null;
let noteDb = null;
dotenv.config();

const initializeDbConnection = async () => {
  client = await MongoClient.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  noteDb = await client.db("note-app-db").collection("note");
};

export { noteDb, initializeDbConnection };
