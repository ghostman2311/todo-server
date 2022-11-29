import { noteDb, userDb } from "../db";

const readNoteRoute = {
  path: "/users/:userId/notes",
  method: "get",
  handler: async (req, res) => {
    const { userId } = req.params;
    const user = await userDb.findOne({ authID: userId });
    const notes = await Promise.all(
      user.notes.map((id) => noteDb.findOne({ id }))
    );
    res.json(notes);
  },
};

export { readNoteRoute };
