import { noteDb } from "../db";

const deleteNoteRoute = {
  path: "/notes/:noteID",
  method: "delete",
  handler: async (req, res) => {
    const { noteID } = req.params;
    await noteDb.deleteOne({ id: noteID });
    const udpdatedNotes = await noteDb.find({}).toArray();
    res.json(udpdatedNotes);
  },
};

export { deleteNoteRoute };
