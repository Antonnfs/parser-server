import { Request, Response, Router as getRouter } from "express";
import { db } from "..";
import { getPaginatedData } from "../utils/pagination";

const router = getRouter();

export const getPosts = async (req: Request, res: Response) => {
   try {
      const last =
         typeof req.query.last === "string" ? req.query.last : undefined;
      const first =
         typeof req.query.first === "string" ? req.query.first : undefined;
      const limit =
         typeof req.query.limit === "string" ? parseInt(req.query.limit) : 10;
      const page =
         typeof req.query.page === "string" ? parseInt(req.query.page) : 1;
      console.log(req.route.path);
      const ref = db.collection(req.route.path);
      const data = await getPaginatedData({ ref, last, first, limit, page });
      res.json(data);
   } catch (error) {
      res.status(400).json(error);
   }
};

router.get("/posts", getPosts);

export default router;
