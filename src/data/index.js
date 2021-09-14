import express from "express";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const postsRouter = express.Router();

const currentPostsPath = fileURLToPath(import.meta.url);
const currentDirPath = dirname(currentPostsPath);
const postsJSON = join(currentDirPath, "posts.json");

console.log(postsJSON);

postsRouter.post("/", (req, res) => {
  res.send("hello there POST");
});

postsRouter.get("/", (req, res) => {
  const posts = fs.readFileSync(postsJSON);
  res.send("hello there");
});

postsRouter.get("/:id", (req, res) => {
  res.send("hello there");
});

postsRouter.put("/:id", (req, res) => {
  res.send("hello there");
});

postsRouter.delete("/:id", (req, res) => {
  res.send("hello there");
});

export default postsRouter;
