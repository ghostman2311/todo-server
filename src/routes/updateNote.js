import { notesDb } from "../db";
import { userOwnsNote } from "../middlewares/userOwnsNote";
import { verifyIdToken } from "../middlewares/verifyAuthToken";

export const updatedNote = {
  path: "/notes/:id",
  method: "put",
  middleware: [verifyIdToken, userOwnsNote],
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
