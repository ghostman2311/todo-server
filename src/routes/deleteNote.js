import { notesDb } from "../db";

export const deleteNote = {
  path: "/notes/:id",
  method: "delete",
  handler: async (req, res) => {
    const { id } = req.params;
    await notesDb.deleteOne({ id });
    res.sendStatus(200);
  },
};
