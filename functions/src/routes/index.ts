import { Request, Response, Router as getRouter } from "express";
import { db } from "..";
// import { COLLECTIONS } from "../constants";

const router = getRouter();

export interface PaginationProps {
   ref: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>;
   limit: number;
   last?: string;
   first?: string;
}

const getInitPage = async ({ ref, limit }: PaginationProps) => {
   return await ref.orderBy("isoDate", "desc").limit(limit).get();
};

const getNextPage = async ({ ref, last, limit }: PaginationProps) => {
   return await ref
      .orderBy("isoDate", "desc")
      .startAfter(last)
      .limit(limit)
      .get();
};

const getPrevPage = async ({ ref, first, limit }: PaginationProps) => {
   return await ref
      .orderBy("isoDate", "desc")
      .endBefore(first)
      .limitToLast(limit)
      .get();
};

const getPage = async ({ ref, limit, first, last }: PaginationProps) => {
   if (last) return await getNextPage({ ref, last, limit });
   if (first) return await getPrevPage({ ref, first, limit });
   return await getInitPage({ ref, limit });
};

export const getPaginatedData = async ({
   ref,
   last,
   first,
   limit,
}: PaginationProps) => {
   const pageSnapshot = await getPage({ ref, limit, first, last });
   const items = await pageSnapshot.docs.map((item) => item.data());
   const count = (await ref.count().get()).data().count;
	
   // const pages = count / 10;
   return { items, count };
};

export const getPosts = async (req: Request, res: Response) => {
   const last = typeof req.query.last === "string" ? req.query.last : undefined;
   const first =
      typeof req.query.first === "string" ? req.query.first : undefined;
   const limit = typeof req.query.limit === "string" ? +req.query.limit : 10;
   console.log(req.route.path);
   const ref = db.collection(req.route.path);
   const data = await getPaginatedData({ ref, last, first, limit });
   res.json(data);
};

router.get("/posts", getPosts);

export default router;
