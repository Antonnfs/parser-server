import { Request, Response, Router as getRouter } from "express";
import { db } from "..";
import { COLLECTIONS } from "../constants";

const router = getRouter();

export const getPosts = async (req: Request, res: Response) => {
   const postsSnap = db.collection(COLLECTIONS.POSTS);
   const posts = await postsSnap.orderBy("isoDate", "desc").get();
   const data = posts.docs.map((post) => post.data());
   res.json(data);
};

router.get("/posts", getPosts);

export default router;
