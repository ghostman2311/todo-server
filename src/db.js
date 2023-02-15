import { MongoClient } from "mongodb";

export let client = null;
export let notesDb;
export let usersDb;
const initializeDbConnection = async () => {
  client = new MongoClient(
    "mongodb+srv://mongodb:admin@project.3usro.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
    }
  );

  try {
    await client.connect();
    notesDb = client.db("notesdb").collection("notes");
    usersDb = client.db("notesdb").collection("users");
    console.log("database connected successfully");
  } catch (err) {
    console.log(err);
  }
};

export { initializeDbConnection };
