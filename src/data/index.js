import express from "express";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import uniqid from "uniqid";

const postsRouter = express.Router();

const currentPostsPath = fileURLToPath(import.meta.url);
const currentDirPath = dirname(currentPostsPath);
const postsJSON = join(currentDirPath, "posts.json");

console.log(postsJSON);

postsRouter.post("/", (req, res) => {
  const newPost = { ...req.body, _id: uniqid() };
  const posts = JSON.parse(fs.readFileSync(postsJSON));
  posts.push(newPost);
  fs.writeFileSync(postsJSON, JSON.stringify(posts));
  res.send({ id: newPost._id });
});

postsRouter.get("/", (req, res) => {
  const posts = fs.readFileSync(postsJSON);
  res.send(JSON.parse(posts));
});

postsRouter.get("/:id", (req, res) => {
  const posts = JSON.parse(fs.readFileSync(postsJSON));
  const post = posts.find((p) => p._id === req.params.id);
  res.send(post);
});

postsRouter.put("/:id", (req, res) => {
  res.send("hello there");
});

postsRouter.delete("/:id", (req, res) => {
  const posts = JSON.parse(fs.readFileSync(postsJSON));
  const filteredPosts = posts.filter((p) => p._id !== req.params.id);
  fs.writeFileSync(postsJSON, JSON.stringify(filteredPosts));
  res.send();
});

export default postsRouter;
