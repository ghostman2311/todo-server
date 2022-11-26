import express from "express";
import { v4 as uuid } from "uuid";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
// mongodb+srv://mongodb:<password>@project.3usro.mongodb.net/?retryWrites=true&w=majority
const app = express();
dotenv.config();

const start = async () => {
  const client = await MongoClient.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const noteDb = await client.db("note-app-db").collection("notes");

  app.use(express.json());

  app.get("/notes", async (req, res) => {
    const notes = await noteDb.find({}).toArray();
    res.json(notes);
  });

  app.post("/notes", async (req, res) => {
    const { title } = req.body;
    await noteDb.insertOne({
      title,
      id: uuid(),
      content: "",
    });
    const notes = await noteDb.find({}).toArray();
    res.json(notes);
  });

  app.put("/notes/:noteID", async (req, res) => {
    const { noteID } = req.params;
    const { title, content } = req.body;
    await noteDb.updateOne(
      { id: noteID },
      {
        $set: { title, content },
      }
    );

    const updatedNotes = await noteDb.find({}).toArray();
    res.json(updatedNotes);
  });

  app.delete("/notes/:noteID", async (req, res) => {
    const { noteID } = req.params;
    await noteDb.deleteOne({ id: noteID });
    const udpdatedNotes = await noteDb.find({}).toArray();
    res.json(udpdatedNotes);
  });

  app.listen(8080, () => {
    console.log("Server is running on 8080");
  });
};

start();
