import { Router as expressRouter } from "express";
import {
   createPost,
   deletePost,
   getPost,
   getPosts,
   updatePost,
} from "../controllers/index.js";

const router = expressRouter();

router.get("/posts/:id", getPost);
router.get("/posts", getPosts);
router.post("/posts/new", createPost);
router.put("/posts/:id", updatePost);
router.delete("/posts/:id", deletePost);

export default router;
