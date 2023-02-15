import { notesDb } from "../db";

export const userOwnsNote = async (req, res, next) => {
  const authUser = req.user;
  const note = await notesDb.findOne({ id });
  if (note.createdBy !== authUser.uid) {
    return res.sendStatus(403);
  }

  req.note = note;

  next();
};
