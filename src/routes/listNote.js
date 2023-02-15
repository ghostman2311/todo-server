import { notesDb, usersDb } from "../db";
import { verifyIdToken } from "../middlewares/verifyAuthToken";

export const listNote = {
  path: "/user/:userId/notes",
  method: "get",
  middleware: [verifyIdToken],
  handler: async (req, res) => {
    const { userId } = req.params;
    const authUser = req.user;
    if (authUser.uid !== userId) {
      return res.sendStatus(403);
    }
    const user = await usersDb.findOne({ id: userId });
    const notes = await Promise.all(
      user.notes.map((note) => notesDb.findOne({ id: note }))
    );
    res.json(notes);
  },
};
