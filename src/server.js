import express from "express";
import { initializeDbConnection } from "./db";
import { routes } from "./routes";
import admin from "firebase-admin";
import credential from "../credentials.json";
import { verifyIdToken } from "./middlewares/verifyAuthToken";

admin.initializeApp({
  credential: admin.credential.cert(credential),
});
const app = express();
app.use(express.json());

const start = async () => {
  await initializeDbConnection();
  routes.forEach((route) => {
    app[route.method](route.path, ...route.middleware, route.handler);
  });

  app.listen(8080, () => console.log("Server is running "));
};

start();
