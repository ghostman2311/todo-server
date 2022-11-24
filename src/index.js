import express from "express";

const app = express();

const notes = [
  {
    id: "1",
    title: "My First note",
    content: "Hey there this is my first note",
  },
];

app.get("/notes", (req, res) => {
  res.json(notes);
});

app.listen(8080, () => {
  console.log("Server is running on 8080");
});
