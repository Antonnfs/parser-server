import { db } from "..";
import { FeedItem } from "../types/feed";
import { COLLECTIONS } from "../constants";
import { getPaginatedData } from "../utils/pagination";
import { PaginationProps } from "../types/pagination";

const getPosts = async ({ last, first, limit, page }: PaginationProps) => {
   const ref = db.collection(COLLECTIONS.POSTS);
   return await getPaginatedData({ ref, last, first, limit, page });
};

const getPost = async (id: string) => {
   return (await db.collection(COLLECTIONS.POSTS).doc(id).get()).data();
};

const createPost = async (data: FeedItem) => {
   const guid = (Math.random() * 10000000000).toFixed(0);
   return await db
      .collection(COLLECTIONS.POSTS)
      .doc(guid)
      .set({ ...data, guid });
};

const updatePost = async (data: FeedItem) => {
   return await db
      .collection(COLLECTIONS.POSTS)
      .doc(data.guid)
      .update({ ...data });
};

const deletePost = async (id: string) => {
   return await db.collection(COLLECTIONS.POSTS).doc(id).delete();
};

export default { getPosts, getPost, createPost, updatePost, deletePost };
