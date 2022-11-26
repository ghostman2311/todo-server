import { noteDb } from "../db";
import { v4 as uuid } from "uuid";

const createNoteRoute = {
  path: "/notes",
  method: "post",
  handler: async (req, res) => {
    const { title } = req.body;
    await noteDb.insertOne({
      title,
      id: uuid(),
      content: "",
    });
    const notes = await noteDb.find({}).toArray();
    res.json(notes);
  },
};

export { createNoteRoute };
