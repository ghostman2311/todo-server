import { noteDb } from "../db";
import * as admin from "firebase-admin";
import { verifyToken } from "../middlewares/verifyToken";

const updateNoteRoute = {
  path: "/notes/:noteID",
  method: "put",
  middleware: [verifyToken],
  handler: async (req, res) => {
    try {
      const { noteID } = req.params;
      const note = await noteDb.findOne({ id: noteID });
      if (note.createdBy !== authUser.uid) {
        return res.sendStatus(403);
      }
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
    } catch (e) {
      console.log(e);
      res.sendStatus(401);
    }
  },
};

export { updateNoteRoute };
