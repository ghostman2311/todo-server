import express from "express";
import { initializeDbConnection } from "./db";
import { routes } from "./routes";
import * as admin from "firebase-admin";
import credentials from "../credentials.json";

admin.initializeApp({ credential: admin.credential.cert(credentials) });

const app = express();

const start = async () => {
  await initializeDbConnection();
  app.use(express.json());
  routes.forEach((route) => {
    app[route.method](route.path, ...route.middleware, route.handler);
  });

  app.listen(8080, () => {
    console.log(`Server has been start on PORT:8080`);
  });
};

start();
