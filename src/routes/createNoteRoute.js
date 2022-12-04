import { noteDb, userDb } from "../db";
import { v4 as uuid } from "uuid";
import * as admin from "firebase-admin";
import { verifyToken } from "../middlewares/verifyToken";

const createNoteRoute = {
  path: "/users/:userId/notes",
  method: "post",
  middleware: [verifyToken],
  handler: async (req, res) => {
    try {
      const { authtoken } = req.headers;
      const authUser = await admin.auth().verifyIdToken(authtoken);
      const { userId } = req.params;

      if (authUser.uid !== userId) {
        return res.sendStatus(403);
      }
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
    } catch (e) {
      console.log(e);
      res.sendStatus(401);
    }
  },
};

export { createNoteRoute };
