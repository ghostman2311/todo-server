import { noteDb } from "../db";

const updateNoteRoute = {
  path: "/notes/:noteID",
  method: "put",
  handler: async (req, res) => {
    const { noteID } = req.params;
    const { title, content } = req.body;
    const result = await noteDb.findOneAndUpdate(
      { id: noteID },
      {
        $set: { title, content },
      },
      {
        returnDocument: "after",
      }
    );

    res.json(result.value);
  },
};

export { updateNoteRoute };
