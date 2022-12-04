import { noteDb, userDb } from "../db";
import * as admin from "firebase-admin";

const readNoteRoute = {
  path: "/users/:userId/notes",
  method: "get",
  handler: async (req, res) => {
    try {
      const { authtoken } = req.headers;
      const authUser = await admin.auth().verifyIdToken(authtoken);
      const { userId } = req.params;
      if (authUser.uid !== userId) {
        res.sendStatus(403);
      }
      const user = await userDb.findOne({ authID: userId });
      const notes = await Promise.all(
        user.notes.map((id) => noteDb.findOne({ id }))
      );
      res.json(notes);
    } catch (e) {
      console.log(e);
      res.sendStatus(401);
    }
  },
};

export { readNoteRoute };
