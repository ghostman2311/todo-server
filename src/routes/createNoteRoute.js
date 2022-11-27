import { noteDb } from "../db";
import { v4 as uuid } from "uuid";

const createNoteRoute = {
  path: "/notes",
  method: "post",
  handler: async (req, res) => {
    const { title } = req.body;
    const newNote = {
      title,
      id: uuid(),
      content: "",
    };
    const result = await noteDb.insertOne(newNote);
    const mongoId = result.insertedId;

    res.json({
      ...newNote,
      _id: mongoId,
    });
  },
};

export { createNoteRoute };
