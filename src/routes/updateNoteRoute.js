import { noteDb } from "../db";

const updateNoteRoute = {
  path: "/notes/:noteID",
  method: "put",
  handler: async (req, res) => {
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
  },
};

export { updateNoteRoute };
