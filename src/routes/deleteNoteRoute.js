import { noteDb, userDb } from "../db";

const deleteNoteRoute = {
  path: "/notes/:noteID",
  method: "delete",
  handler: async (req, res) => {
    const { noteID } = req.params;
    const result = await noteDb.findOneAndDelete({ id: noteID });
    const deletedNote = result.value;
    await userDb.updateOne(
      { id: deletedNote.createdBy },
      {
        $pull: { notes: deletedNote.id },
      }
    );
    res.sendStatus(200);
  },
};

export { deleteNoteRoute };
