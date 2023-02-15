import { notesDb, usersDb } from "../db";
import { userOwnsNote } from "../middlewares/userOwnsNote";
import { verifyIdToken } from "../middlewares/verifyAuthToken";

export const deleteNote = {
  path: "/notes/:id",
  method: "delete",
  middleware: [verifyIdToken, userOwnsNote],
  handler: async (req, res) => {
    const { id } = req.params;
    const { note } = req;
    await notesDb.deleteOne({ id });
    await usersDb.updateOne(
      { id: note.createdBy },
      {
        $pull: { notes: note.id },
      }
    );
    res.sendStatus(200);
  },
};
