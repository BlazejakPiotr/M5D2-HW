import express from "express";
import postsRouter from "./data/index.js";

const server = express();
const port = 3001;

server.use("/data", postsRouter);

server.listen(port, () => {
  console.log("Server running on port " + port);
});
