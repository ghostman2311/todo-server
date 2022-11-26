import { noteDb } from "../db";

const readNoteRoute = {
  path: "/notes",
  method: "get",
  handler: async (req, res) => {
    const notes = await noteDb.find({}).toArray();
    res.json(notes);
  },
};

export { readNoteRoute };
