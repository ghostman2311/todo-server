import { MongoClient } from "mongodb";

const client = new MongoClient(
  "mongodb+srv://mongodb:admin@project.3usro.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

let _db;

export default {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      if (db) {
        _db = db.db("myFirstDatabse");
        console.log("successfully connected to mongoDb");
      }

      return callback(err);
    });
  },
  getDb: function () {
    return _db;
  },
};
