import { noteDb, userDb } from "../db";
import * as admin from "firebase-admin";
import { verifyToken } from "../middlewares/verifyToken";

const deleteNoteRoute = {
  path: "/notes/:noteID",
  method: "delete",
  middleware: [verifyToken],
  handler: async (req, res) => {
    try {
      const { noteID } = req.params;
      const { authtoken } = req.headers;
      const authUser = await admin.auth().verifyIdToken(authtoken);

      const note = await noteDb.findOne({ id: noteID });
      if (note.createdBy !== authUser.uid) {
        return res.sendStatus(401);
      }
      await noteDb.deleteOne({ id: noteID });
      await userDb.updateOne(
        { authID: note.createdBy },
        {
          $pull: { notes: note.id },
        }
      );
      res.sendStatus(200);
    } catch (e) {
      console.log(e);
      res.sendStatus(403);
    }
  },
};

export { deleteNoteRoute };
