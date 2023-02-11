import { notesDb } from "../db";

export const updatedNote = {
  path: "/notes/:id",
  method: "put",
  handler: async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    const result = await notesDb.findOneAndUpdate(
      { id },
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
