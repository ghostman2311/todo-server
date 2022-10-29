import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dbo from "./db/connection";

const app = express();
const port = process.env.PORT || 5000;
dotenv.config({ path: "./config.env" });
app.use(cors());
app.use(express.json());
// app.use(require("./routes/record"));
// get driver connection

app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
  });
  console.log(`Server is running on port: ${port}`);
});
