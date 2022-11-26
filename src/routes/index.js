import { createNoteRoute } from "./createNoteRoute";
import { readNoteRoute } from "./readNoteRoute";
import { updateNoteRoute } from "./updateNoteRoute";
import { deleteNoteRoute } from "./deleteNoteRoute";

const routes = [
  createNoteRoute,
  deleteNoteRoute,
  readNoteRoute,
  updateNoteRoute,
];

export { routes };
