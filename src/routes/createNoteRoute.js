import { noteDb, userDb } from "../db";
import { v4 as uuid } from "uuid";

const createNoteRoute = {
  path: "/users/:userId/notes",
  method: "post",
  handler: async (req, res) => {
    const { userId } = req.params;
    const { title } = req.body;
    const newNoteId = uuid();
    const newNote = {
      title,
      id: newNoteId,
      content: "",
      createdBy: userId,
    };
    const result = await noteDb.insertOne(newNote);
    await userDb.updateOne(
      { authID: userId },
      {
        $push: { notes: newNoteId },
      }
    );
    const mongoId = result.insertedId;

    res.json({
      ...newNote,
      _id: mongoId,
    });
  },
};

export { createNoteRoute };
