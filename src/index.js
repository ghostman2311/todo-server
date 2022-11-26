import express from "express";
import { v4 as uuid } from "uuid";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
// mongodb+srv://mongodb:<password>@project.3usro.mongodb.net/?retryWrites=true&w=majority
const app = express();
dotenv.config();

let notes = [
  {
    id: "1",
    title: "My First note",
    content: "Hey there this is my first note",
  },
];

const start = async () => {
  const client = await MongoClient.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const noteDb = await client.db("note-app-db").collections("notes");
  console.log(noteDb);
  app.use(express.json());

  app.get("/notes", (req, res) => {
    res.json(notes);
  });

  app.post("/notes", (req, res) => {
    const { title } = req.body;
    notes.push({
      title,
      id: uuid(),
      content: "",
    });

    res.json(notes);
  });

  app.put("/notes/:noteID", (req, res) => {
    const { noteID } = req.params;
    const { title, content } = req.body;
    notes = notes.map((note) =>
      note.id === noteID ? { id: noteID, title, content } : note
    );

    res.json(notes);
  });

  app.delete("/notes/:noteID", (req, res) => {
    const { noteID } = req.params;
    notes = notes.filter((note) => note.id !== noteID);
    res.json(notes);
  });

  app.listen(8080, () => {
    console.log("Server is running on 8080");
  });
};

start();
