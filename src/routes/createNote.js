import { notesDb, usersDb } from "../db";
import { v4 as uuid } from "uuid";
import { verifyIdToken } from "../middlewares/verifyAuthToken";

export const createNote = {
  path: "/user/:userId/notes",
  method: "post",
  middleware: [verifyIdToken],
  handler: async (req, res) => {
    const { title } = req.body;
    const { userId } = req.params;

    const authUser = req.user;
    if (authUser.uid !== userId) {
      return res.sendStatus(403);
    }
    const newNoteId = uuid();
    const newNote = {
      title,
      id: newNoteId,
      content: "",
      createdBy: userId,
    };
    const result = await notesDb.insertOne(newNote);
    await usersDb.updateOne({ id: userId }, { $push: { notes: newNoteId } });
    res.json({ _id: result.insertedID, ...newNote });
  },
};
