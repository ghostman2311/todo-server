import { notesDb } from "../db";
import { v4 as uuid } from "uuid";

export const createNote = {
  path: "/notes",
  method: "post",
  handler: async (req, res) => {
    const { title } = req.body;
    const newNote = {
      title,
      id: uuid(),
      content: "",
    };
    const result = await notesDb.insertOne(newNote);
    res.json({ _id: result.insertedID, ...newNote });
  },
};
