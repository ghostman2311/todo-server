import express from "express";
import { initializeDbConnection } from "./db";
import { routes } from "./routes";

const app = express();

const start = async () => {
  await initializeDbConnection();
  app.use(express.json());
  routes.forEach((route) => {
    app[route.method](route.path, route.handler);
  });

  app.listen(8080, () => {
    console.log(`Server has been start on PORT:8080`);
  });
};

start();
